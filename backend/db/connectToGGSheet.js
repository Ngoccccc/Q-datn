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

const getTime = () => {
  var currentTime = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng 1
  var year = date.getFullYear();

  // Định dạng ngày, tháng và năm thành chuỗi "dd/mm/yyyy"
  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;
  var formattedYear = year;

  // Lấy giờ, phút và giây từ đối tượng Date
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Định dạng lại chuỗi giờ, phút và giây thành "hh:mm:ss"
  var formattedTime = hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');

  var formattedDate = formattedMonth + "/" + formattedDay + "/" + formattedYear + " " + formattedTime;
  return formattedDate
}


export const handleGGSheet = async (message, sheetID) => {
  const keywords = ['chi tiêu', 'thu nhập', 'lập kế hoạch'];
  const messageHandledSpace = message.replace(/\s+/g, ' ') // loại bỏ khoảng trống thừa
  const pattern = new RegExp(`(\\b(?:${keywords.join('|')})\\b)`, 'gi');
  // pattern = pattern.filter(element => element !== ''); // loại bỏ ''
  const segments = messageHandledSpace.split(pattern);

  // trường hợp chỉ nhập 1 type
  const type = segments[1]
  const [item, money] = segments[2].split(/ ?: ?/);

  // mở file sheet
  const file = new GoogleSpreadsheet(sheetID, jwt);
  await file.loadInfo();
  const sheet = file.sheetsByIndex[2];

  const timeDayMonthYear = getTime();

  await sheet.addRow({
    "Thời gian": timeDayMonthYear,
    "Loại thu nhập": item,
    "Số tiền": money,
  });


}




