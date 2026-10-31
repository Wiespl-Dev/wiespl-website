<?php
/**
 * WIESPL contact form → email.
 *
 * Receives the website's contact form (JSON POST) and emails it to the sales inbox
 * through Google Workspace SMTP, so messages arrive reliably and not in spam.
 *
 * Settings (mailbox, app password, recipient) live in wiespl-mail-config.php, which is kept
 * in the home folder ABOVE public_html so it can never be opened from the web.
 * See hosting/mail-config.example.php in the project for the template.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond($code, $message) {
    http_response_code($code);
    echo json_encode(['ok' => $code === 200, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed');
}

// Look in the hosting account's home folder (the folder that contains public_html),
// e.g. /home2/serve5jz/wiespl-mail-config.php — wherever this script sits inside public_html.
$home = preg_replace('#/public_html(/.*)?$#', '', str_replace('\\', '/', __DIR__));
$configFile = $home . '/wiespl-mail-config.php';
if (!is_file($configFile)) {
    respond(503, 'Our contact form is being set up. Please email us at sales@wiespl.com or call +91 84848 21469.');
}
$config = require $configFile;

// ── Read and validate the form ────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    respond(400, 'Invalid request.');
}

// Hidden "website" field: real visitors never see or fill it, spam bots usually do.
if (!empty($input['website'])) {
    respond(200, 'Thank you.');
}

// Strip line breaks from single-line fields so nobody can inject extra email headers.
$clean = function ($key, $max) use ($input) {
    $value = isset($input[$key]) ? trim((string) $input[$key]) : '';
    return mb_substr(preg_replace('/[\r\n\t]+/', ' ', $value), 0, $max);
};

$firstName = $clean('firstName', 80);
$lastName  = $clean('lastName', 80);
$email     = $clean('email', 160);
$phone     = $clean('phone', 40);
$subject   = $clean('subject', 80);
$message   = isset($input['message']) ? mb_substr(trim((string) $input['message']), 0, 5000) : '';

if ($firstName === '' || $lastName === '' || $subject === '' || $message === '') {
    respond(422, 'Please fill in all required fields.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Please enter a valid email address.');
}

// ── Simple rate limit: max 5 messages per hour from one IP ────────────────
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/wiespl_mail_' . md5($ip);
$recent = [];
if (is_file($rateFile)) {
    $recent = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($rateFile))),
        function ($t) { return $t > time() - 3600; }
    );
}
if (count($recent) >= 5) {
    respond(429, 'Too many messages. Please try again later or email us directly.');
}

// ── Build the email ───────────────────────────────────────────────────────
$name = "$firstName $lastName";
$mailSubject = "Website enquiry: $subject — $name";
$body = "New message from the wiespl.com contact form\n\n"
      . "Name:    $name\n"
      . "Email:   $email\n"
      . "Phone:   " . ($phone !== '' ? $phone : '-') . "\n"
      . "Subject: $subject\n\n"
      . "Message:\n$message\n\n"
      . "—\nSent " . date('d M Y, H:i') . " from IP $ip\n";

$encodeHeader = function ($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
};

$headers = [
    'Date: ' . date('r'),
    'From: ' . $encodeHeader($config['from_name'] ?? 'WIESPL Website') . ' <' . $config['smtp_user'] . '>',
    'To: <' . $config['to'] . '>',
    'Reply-To: ' . $encodeHeader($name) . " <$email>",
    'Subject: ' . $encodeHeader($mailSubject),
    'Message-ID: <' . bin2hex(random_bytes(12)) . '@wiespl.com>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
];
$data = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n");

// ── Send through Google Workspace SMTP (smtp.gmail.com:465, SSL) ──────────
function smtp_send($config, $data) {
    $socket = @stream_socket_client('ssl://smtp.gmail.com:465', $errno, $errstr, 20);
    if (!$socket) {
        return "connect failed: $errstr";
    }
    stream_set_timeout($socket, 20);

    $read = function () use ($socket) {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break; // last line of a multi-line reply
        }
        return $response;
    };
    $cmd = function ($command, $expect) use ($socket, $read) {
        if ($command !== null) fwrite($socket, $command . "\r\n");
        $reply = $read();
        if (strpos($reply, (string) $expect) !== 0) {
            throw new Exception(trim($reply));
        }
    };

    try {
        $cmd(null, 220);
        $cmd('EHLO wiespl.com', 250);
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode($config['smtp_user']), 334);
        $cmd(base64_encode($config['smtp_pass']), 235);
        $cmd('MAIL FROM:<' . $config['smtp_user'] . '>', 250);
        $cmd('RCPT TO:<' . $config['to'] . '>', 250);
        $cmd('DATA', 354);
        $cmd($data . "\r\n.", 250); // body is base64, so no line can start with a dot
        $cmd('QUIT', 221);
    } catch (Exception $e) {
        fclose($socket);
        return $e->getMessage();
    }
    fclose($socket);
    return true;
}

$result = smtp_send($config, $data);
if ($result !== true) {
    error_log('WIESPL contact form: SMTP error: ' . $result);
    respond(502, 'Sorry, the message could not be sent. Please email us directly at ' . $config['to'] . '.');
}

$recent[] = time();
@file_put_contents($rateFile, implode(',', $recent));

respond(200, 'Thank you! Your message has been sent.');
