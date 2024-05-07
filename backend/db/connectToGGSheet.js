import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from './quan-ly-chi-tieu-421003-ed917161454e.json' assert { type: "json" }; 
; // the file saved above

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file', // note that sharing-related calls require the google drive scope
];

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});
// const doc = new GoogleSpreadsheet('1ZcDa9uXA5MoAf3xrNn4aWCgrE9IXSXwyoqSo-yb_--0', jwt);

export const createNewSheet = async (userMail) => {
  const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(jwt, { title: 'Quan ly chi tieu' });
  await newDoc.share(userMail)
  return newDoc.spreadsheetId
}