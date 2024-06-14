function extractSheetId(url) {
  const regex = /\/d\/([a-zA-Z0-9-_]+)(?:\/|$)/;
  const matches = url.match(regex);
  if (matches && matches[1]) {
    return matches[1];
  } else {
    return null;
  }
}

// Example usage:
const sheetUrl =
  "https://docs.google.com/spreadsheets/d/1wiaELFK7AWaLIUtQsBx-wNxTQAk9HgCEAE47lok7DDk";
const sheetId = extractSheetId(sheetUrl);
console.log(sheetId); // Outputs: 1wiaELFK7AWaLIUtQsBx-wNxTQAk9HgCEAE47lok7DDk
