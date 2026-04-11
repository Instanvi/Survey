/**
 * Google Apps Script — deploy as Web app (Execute as: Me, Who has access: Anyone).
 * Set GOOGLE_SHEETS_WEB_APP_URL in .env.local to the deployment URL.
 *
 * Expects JSON from this app including:
 *   sheetHeaders — array of column titles (row 1, written once on empty sheet)
 *   sheetRow     — one data row matching sheetHeaders length
 *
 * Legacy payloads without sheetRow still append 8 columns (see LEGACY_APPEND).
 * Prefer redeploying this script and using a fresh sheet when columns change.
 */
function ensureSheetHeaderRow(sheet, headers) {
  if (!headers || headers.length === 0) {
    return;
  }
  if (sheet.getLastRow() > 0) {
    return;
  }
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (data.sheetRow && data.sheetHeaders) {
      ensureSheetHeaderRow(sheet, data.sheetHeaders);
      sheet.appendRow(data.sheetRow);
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Legacy: 8 columns (no per-answer columns)
    var LEGACY_HEADERS = [
      "Submitted at (ISO)",
      "Locale",
      "Full name",
      "Email",
      "Phone",
      "Total score (0–100)",
      "Score breakdown (JSON)",
      "Answers (JSON)",
    ];
    ensureSheetHeaderRow(sheet, LEGACY_HEADERS);

    var p = data.participant || {};
    var answersJson = JSON.stringify(data.answers || {});
    var breakdownJson = JSON.stringify(data.breakdown || {});
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.locale || "",
      p.fullName || "",
      p.email || "",
      p.phone || "",
      data.totalScore ?? "",
      breakdownJson,
      answersJson,
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
