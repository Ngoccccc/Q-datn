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

// sheet template 
const template = new GoogleSpreadsheet('1Zqvtd0Usx6bqkEOOsZb26h-bDMMhpqxuwJjwMUKIFf0', jwt);
await template.loadInfo();

const templateSheetsAmount = template.sheetCount

export const createNewSheet = async (userMail) => {
  // tạo file mới
  const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(jwt, { title: 'Quan ly chi tieu' });
  newDoc.loadInfo();

  // copy template sheets vào file mới 
  for (let i = 0; i < templateSheetsAmount; i++) {
    await template.sheetsByIndex[i].copyToSpreadsheet(newDoc.spreadsheetId)
  }

  // rename sheet từ "bản sao của ..." -> "..."
  const duplicatedDoc = new GoogleSpreadsheet(newDoc.spreadsheetId, jwt);
  await duplicatedDoc.loadInfo()
  for (let i = 1; i < templateSheetsAmount + 1; i++) {
    const name = duplicatedDoc.sheetsByIndex[i].title.replace("Copy of ", "")
    duplicatedDoc.sheetsByIndex[i].updateProperties({ title: name })
  }

  //xoa sheet dau tien
  const sheet1 = duplicatedDoc.sheetsByIndex[0]
  await sheet1.delete()

  // share quyền cho user
  await newDoc.share(userMail)
  return newDoc.spreadsheetId
}





