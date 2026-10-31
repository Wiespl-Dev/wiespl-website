# Putting the new site on wiespl.com (HostGator)

**How wiespl.com is set up**

| What | Where |
|---|---|
| Domain registration | BigRock — nothing to change there |
| Website | HostGator (`sns413/414.hostgator.in`, server `119.18.54.171`) |
| Email (@wiespl.com) | Google Workspace — **not touched by any of these steps** |

Only the website files on HostGator change. Email keeps working as it is.

---

## 1. Back up the old site (do this first)

1. Log in to HostGator → **cPanel** → **File Manager**.
2. Open `public_html`.
3. Select everything → **Compress** → zip → name it `old-site-backup.zip` → download it to your computer.

## 2. Upload the new site

1. In `public_html`, delete the old site files (keep `old-site-backup.zip` until the new site is confirmed working,
   and don't delete `cgi-bin` or `.well-known` if they are there).
2. Click **Upload** → choose `wiespl-website-upload.zip` (made by `npm run build`, then zipping `dist/`).
3. Right-click the zip → **Extract** into `public_html`.
4. Check that `public_html` now directly contains `index.html`, `.htaccess`, `send-mail.php`, `assets/` and `images/`.
   (Turn on **Settings → Show Hidden Files** in File Manager to see `.htaccess`.)
5. Open https://wiespl.com — the new site should load. Old links like `wiespl.com/about.html` redirect to the new pages.

## 3. Turn on contact-form email

The form sends through a Google Workspace mailbox using an **App Password**.

1. Choose the sending mailbox (best: create `website@wiespl.com` in Google Workspace Admin; any existing one works).
2. Sign in as that mailbox at https://myaccount.google.com → **Security**:
   - turn on **2-Step Verification**
   - open **App passwords** → create one called `wiespl website` → copy the 16 letters.
   - If "App passwords" doesn't appear, the Workspace admin must allow it (Admin console → Security → 2-Step Verification / Less secure apps & app passwords).
3. In cPanel **File Manager**, go to your **home folder** (one level *above* `public_html`).
4. Upload `hosting/mail-config.example.php`, rename it to **`wiespl-mail-config.php`**, edit it and fill in
   `smtp_user`, `smtp_pass` (the App Password) and `to`.
   It must stay **outside** `public_html` so nobody can open it from the web.
5. Test: send a message from https://wiespl.com/contact — it should arrive in the `to` inbox within a minute.

If it fails, the form shows the reason. The full error is written to `public_html/error_log` in File Manager.

## Updating the site later

```bash
npm run build
```

Zip the contents of `dist/` (forward-slash paths) and repeat step 2, uploading over the old files.
You don't need to redo step 3 — the mail config file stays in the home folder.

The GitHub Pages preview (https://wiespl-dev.github.io/wiespl-website/) still updates automatically on every push.
