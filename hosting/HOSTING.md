# Putting the new site on wiespl.com

**How the hosting is set up**

| What | Where |
|---|---|
| Domain + hosting | BigRock account: orders `wiespl.com` (domain) and `server.wiespl.com` (hosting → **Go To cPanel**) |
| Hosting server | HostGator infrastructure, server `119.18.54.171`, home folder `/home2/serve5jz` |
| `wiespl.com` **and** `server.wiespl.com` | Both use the **same folder**: `public_html` (an old Laravel CMS) |
| Subdomains (plcapp, dcp, dicom, jabalpur, scp, system, website) | Each has its **own folder** — never touched |
| Email (@wiespl.com) | Google Workspace — never touched |

**Rule: server.wiespl.com must keep working exactly as it is.** So nothing in `public_html` is deleted.
The new site goes in its own folder, and a few lines at the top of `public_html/.htaccess` send
**only wiespl.com / www.wiespl.com** visitors there. These rules were tested on Apache:
wiespl.com → new site on every page; server.wiespl.com → old CMS on every page.

---

## 1. Back up `.htaccess` (your undo button)
cPanel → **File Manager** → **Settings** → tick **Show Hidden Files** → open `public_html` →
right-click `.htaccess` → **Download**. Keep this file.

## 2. Upload the new site
1. In `public_html`: **+ Folder** → name `wiespl-new`.
2. Open `wiespl-new` → **Upload** → `wiespl-website-upload.zip` → right-click it → **Extract** → delete the zip.
3. `wiespl-new` should now contain `index.html`, `.htaccess`, `send-mail.php`, `assets/`, `images/`.

Visitors see no change yet.

## 3. Switch wiespl.com to the new site
1. `public_html` → right-click `.htaccess` → **Edit**.
2. Paste the whole contents of `public_html-htaccess-rules.txt` at the **very top** (line 1), above everything already there.
3. **Save**.

## 4. Test
- https://wiespl.com and https://wiespl.com/about → **new** site
- https://server.wiespl.com → **same as before**
- https://plcapp.wiespl.com and the other subdomains → same as before

**Undo** if anything is wrong: edit `.htaccess` and delete the block between
`NEW wiespl.com WEBSITE — START` and `— END` (or upload the backup from step 1).

## 5. Contact-form email
1. Pick the sending Google Workspace mailbox (best: a new `website@wiespl.com`).
2. Sign in as it at https://myaccount.google.com → **Security** → turn on **2-Step Verification** →
   **App passwords** → create `wiespl website` → copy the 16 letters.
   (If "App passwords" is missing, the Workspace admin must allow it in the Admin console.)
3. cPanel File Manager → home folder **`/home2/serve5jz`** (NOT inside public_html) →
   upload `mail-config.example.php` → rename to **`wiespl-mail-config.php`** → **Edit** →
   fill in `smtp_user`, `smtp_pass` (the 16 letters) and `to` → Save.
4. Send a test from https://wiespl.com/contact. If it fails, the reason is in `public_html/error_log`.

## Updating the site later
```bash
npm run build
```
Zip the contents of `dist/` with forward-slash paths and upload/extract it into `public_html/wiespl-new`,
replacing the old files. Steps 1, 3 and 5 don't need repeating.

The GitHub Pages preview (https://wiespl-dev.github.io/wiespl-website/) updates automatically on every push.
