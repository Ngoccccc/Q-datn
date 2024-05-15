// // function splitTextByKeywords(text) {
// //     // text = text.replace(/\s+/g, ' ') 
// //     // const keywords = ['chi tiêu', 'thu nhập', 'lập kế hoạch'];
// //     // const pattern = new RegExp(`(\\b(?:${keywords.join('|')})\\b)`, 'gi');
// //     // const segments = text.split(pattern);
// //     const segments = text.split(/ ?: ?/);


// //     return segments;
// //   }

// //   const text = "chi tiêu            1212 :jldjsk";

// //   const output = splitTextByKeywords(text);
// //   console.log(output);

// // Tạo một đối tượng Date mới
// var date = new Date();

// // Lấy giờ và phút hiện tại
// var hour = date.getHours();
// var minute = date.getMinutes();

// // Định dạng giờ và phút thành chuỗi "hh:mm"
// var formattedHour = hour < 10 ? "0" + hour : hour;
// var formattedMinute = minute < 10 ? "0" + minute : minute;

// // Kết hợp giờ và phút thành chuỗi "hh:mm"
// var formattedTime = formattedHour + ":" + formattedMinute;

// // Hiển thị giờ theo định dạng "hh:mm"
// console.log("Giờ: " + formattedTime);



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

const getTime = () => {
  // Tạo một đối tượng Date mới
  var date = new Date();

  // Lấy giờ và phút hiện tại
  var hour = date.getHours();
  var minute = date.getMinutes();

  // Định dạng giờ và phút thành chuỗi "hh:mm"
  var formattedHour = hour < 10 ? "0" + hour : hour;
  var formattedMinute = minute < 10 ? "0" + minute : minute;

  // Kết hợp giờ và phút thành chuỗi "hh:mm"
  var time = formattedHour + ":" + formattedMinute;

  // Lấy ngày, tháng và năm hiện tại
  var day = date.getDate();
  var month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng 1
  var year = date.getFullYear();

  return { time, day, month, year }
}

const file = new GoogleSpreadsheet('1Zqvtd0Usx6bqkEOOsZb26h-bDMMhpqxuwJjwMUKIFf0', jwt);
await file.loadInfo();
console.log(file.title)
const sheet = file.sheetsByIndex[2];
console.log(sheet.title)

const timeDayMonthYear = getTime();



const item = "quần áo"
const money = "20000000"

console.log(timeDayMonthYear.day)

var date = new Date();

// Lấy ngày, tháng và năm hiện tại
var day = date.getDate();
var month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng 1
var year = date.getFullYear();

// Định dạng ngày, tháng và năm thành chuỗi "dd/mm/yyyy"
var formattedDay = day < 10 ? "0" + day : day;
var formattedMonth = month < 10 ? "0" + month : month;
var formattedYear = year;
// Tạo một đối tượng Date đại diện cho thời gian hiện tại
var currentTime = new Date();

// Lấy giờ, phút và giây từ đối tượng Date
var hours = currentTime.getHours();
var minutes = currentTime.getMinutes();
var seconds = currentTime.getSeconds();

// Định dạng lại chuỗi giờ, phút và giây thành "hh:mm:ss"
var formattedTime = hours.toString().padStart(2, '0') + ':' +
                    minutes.toString().padStart(2, '0') + ':' +
                    seconds.toString().padStart(2, '0');

// Hiển thị chuỗi giờ, phút và giây
// console.log(formattedTime);

// Kết hợp ngày, tháng và năm thành chuỗi "dd/mm/yyyy"
var formattedDate = formattedMonth + "/" + formattedDay + "/" + formattedYear + " " + formattedTime;

await sheet.addRow({
  "Thời gian": formattedDate,
  // "Ngày": timeDayMonthYear.day,
  // "Tháng": timeDayMonthYear.month,
  // "Năm": timeDayMonthYear.year,
  "Loại thu nhập": item,
  "Số tiền": money,
  // "Ghi chú": ""
});

// await sheet.addRow({
//   "name": "1212",
//   "mail":"dsd"
// })