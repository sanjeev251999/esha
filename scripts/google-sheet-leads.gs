/**
 * Esha Aesthetic Centre – enquiry register (Google Apps Script).
 *
 * Saves every website enquiry as a new row in this Google Sheet and emails a
 * notification to the Google account that owns the Sheet.
 *
 * SETUP (one time, about 3 minutes):
 *  1. Create a new Google Sheet (e.g. "Esha Enquiries").
 *  2. Extensions → Apps Script. Delete the sample code and paste this whole file. Save.
 *  3. Deploy → New deployment → Select type: "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy, allow the permissions, and copy the Web app URL (ends with /exec).
 *  4. Put that URL in src/app/config/business.config.ts → leadCaptureUrl.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit (pencil) →
 * Version: New version, so the URL stays the same.
 */

const SHEET_NAME = 'Enquiries';
const SEND_EMAIL = true; // set to false to stop email notifications
const HEADERS = ['Received', 'Name', 'Mobile', 'Service', 'Preferred date', 'Message', 'Source', 'Page', 'Status'];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam trap: real visitors never fill this hidden field.
    if (data.website) return json({ ok: true });

    const clean = (v, max) => String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);
    const row = {
      name: clean(data.name, 60),
      mobile: clean(data.mobile, 20),
      service: clean(data.service, 60),
      date: clean(data.preferredDate, 20),
      message: clean(data.message, 500),
      source: clean(data.source, 40),
      page: clean(data.page, 200),
    };
    if (!row.name || !row.mobile || !row.service) return json({ ok: false, error: 'missing-fields' });

    // Prevent spreadsheet formula injection (values starting with = + - @).
    const safe = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet().appendRow([
        new Date(),
        safe(row.name),
        "'" + row.mobile, // keep leading + / 0 as text
        safe(row.service),
        row.date,
        safe(row.message),
        row.source,
        row.page,
        'New',
      ]);
    } finally {
      lock.releaseLock();
    }

    if (SEND_EMAIL) {
      const owner = Session.getEffectiveUser().getEmail();
      if (owner) {
        MailApp.sendEmail({
          to: owner,
          subject: 'New enquiry: ' + row.service + ' – ' + row.name,
          body:
            'New enquiry from the Esha Aesthetic Centre website\n\n' +
            'Name: ' + row.name + '\n' +
            'Mobile: ' + row.mobile + '\n' +
            'Service: ' + row.service + '\n' +
            'Preferred date: ' + (row.date || '-') + '\n' +
            'Message: ' + (row.message || '-') + '\n' +
            'Source: ' + (row.source || 'website') + '\n\n' +
            'Call: tel:' + row.mobile.replace(/[^\d+]/g, '') + '\n' +
            'WhatsApp: https://wa.me/' + toWhatsApp(row.mobile) + '\n\n' +
            'All enquiries: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
        });
      }
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'server-error' });
  }
}

/** Opening the URL in a browser just confirms it is running. */
function doGet() {
  return json({ ok: true, service: 'esha-enquiries' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#7d1f2c').setFontColor('#ffffff');
    sheet.setColumnWidths(1, HEADERS.length, 150);
  }
  return sheet;
}

/** Indian 10-digit mobile → 91XXXXXXXXXX for a wa.me link. */
function toWhatsApp(mobile) {
  const d = String(mobile).replace(/\D/g, '');
  return d.length === 10 ? '91' + d : d.replace(/^0/, '91');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
