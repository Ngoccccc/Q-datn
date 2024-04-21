import { JWT } from 'google-auth-library'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from './quan-ly-chi-tieu-421003-ed917161454e.json' assert { type: "json" };; // the file saved above

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});
const doc = new GoogleSpreadsheet('1ZcDa9uXA5MoAf3xrNn4aWCgrE9IXSXwyoqSo-yb_--0', jwt);

const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(jwt, { title: 'nhu quynhtran' });

// share with specific users, domains, or make public
await newDoc.share('tran.thi.nhu.quynh@sun-asterisk.com');
await newDoc.loadInfo(); // loads document properties and worksheets
console.log(newDoc.title);
