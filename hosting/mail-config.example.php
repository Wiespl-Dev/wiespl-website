<?php
/**
 * Contact-form mail settings for wiespl.com.
 *
 * 1. Copy this file to the HostGator home folder (ONE LEVEL ABOVE public_html)
 *    and name it:  wiespl-mail-config.php
 *    It must NOT be inside public_html, so it can never be opened in a browser.
 * 2. Fill in the three values below.
 *
 * smtp_pass is a Google "App Password", not the normal Gmail password:
 *   - Sign in to the mailbox below at myaccount.google.com
 *   - Security → turn on 2-Step Verification (required)
 *   - Security → App passwords → create one named "wiespl website" → copy the 16 letters
 *   (If "App passwords" is missing, the Google Workspace admin must allow it in the Admin console.)
 *
 * Never commit the real file to git.
 */
return [
    // Google Workspace mailbox that sends the form emails (a dedicated one like website@wiespl.com is best)
    'smtp_user' => 'website@wiespl.com',

    // 16-letter App Password for that mailbox
    'smtp_pass' => 'xxxx xxxx xxxx xxxx',

    // Where form messages should arrive
    'to' => 'sales@wiespl.com',

    // Sender name shown in the inbox
    'from_name' => 'WIESPL Website',
];
