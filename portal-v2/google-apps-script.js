
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = "Respuestas";
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) sheet = spreadsheet.insertSheet(sheetName);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["session_id","fecha","paciente","modulo","actividad_numero","actividad_titulo","campo","respuesta","score","max_score","metadata"]);
    }

    const data = JSON.parse(e.postData.contents);
    const rows = data.rows || [];

    rows.forEach((row) => {
      sheet.appendRow([
        row.session_id || "",
        row.fecha || "",
        row.paciente || "",
        row.modulo || "",
        row.actividad_numero || "",
        row.actividad_titulo || "",
        row.campo || "",
        row.respuesta || "",
        row.score ?? "",
        row.max_score ?? "",
        row.metadata ? JSON.stringify(row.metadata) : ""
      ]);
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true, inserted: rows.length })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}
