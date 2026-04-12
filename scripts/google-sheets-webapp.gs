/**
 * Google Apps Script — deploy as Web app (Execute as: Me, Who has access: Anyone).
 * Set GOOGLE_SHEETS_WEB_APP_URL in .env.local to the deployment URL.
 *
 * This version uses dynamic headers based on the columns sent from the frontend.
 * Prefer creating a fresh sheet if questionnaire columns change.
 */
function ensureHeaders(sheet, headers) {
  if (!headers || headers.length === 0) return;
  
  // If sheet is fresh, set headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setFontWeight("bold");
    range.setBackground("#0056b3"); // Match our professional blue
    range.setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    Logger.log("Initialized new sheet with headers");
  } else {
    // Optional: detect if headers mismatch? 
    // For now, we assume the user maintains sheet consistency.
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait for up to 30 seconds for a lock
    lock.waitLock(30000);
    
    var contents = e.postData.contents;
    var data = JSON.parse(contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];

    if (data.sheetRow && data.sheetHeaders) {
      ensureHeaders(sheet, data.sheetHeaders);
      sheet.appendRow(data.sheetRow);
      
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error("Missing sheetRow or sheetHeaders in submission");

  } catch (err) {
    Logger.log("Error in doPost: " + err.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: err.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
