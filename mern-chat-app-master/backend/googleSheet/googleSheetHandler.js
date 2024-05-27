const { JWT } = require('google-auth-library')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./quan-ly-chi-tieu-421003-ed917161454e.json')

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
// template.loadInfo()
const info = async () => {
    await template.loadInfo()
}

var templateSheetsAmount = 0

info()
    .then(() => {
        templateSheetsAmount = template.sheetCount;
        console.log('Số lượng sheet:', templateSheetsAmount);
    })
    .catch(error => {
        console.log('Đã xảy ra lỗi:', error);
    });

const createNewSheet = async (userMail) => {
    // tạo file mới
    const newDoc = await GoogleSpreadsheet.createNewSpreadsheetDocument(jwt, { title: 'Quan ly chi tieu' });
    newDoc.loadInfo();

    // copy template sheets vào file mới 
    for (let i = 0; i < templateSheetsAmount; i++) {
        const z = await template.sheetsByIndex[i].copyToSpreadsheet(newDoc.spreadsheetId)
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

    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng 1
    var year = currentTime.getFullYear();

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

const convertStringToNumber = (input) => {
    // Sử dụng regex để kiểm tra và bắt nhóm số và chữ cái cuối cùng
    const regex = /^(\d+(\.\d+)?)([kK]|[tT][rR])?$/;
    const segments = input.match(regex);

    if (segments) {
        let numberPart = parseFloat(segments[1]);
        let suffix = segments[3];

        if (suffix) {
            if (suffix.toLowerCase() === 'k') {
                return numberPart * 1000;
            } else if (suffix.toLowerCase() === 'tr') {
                return numberPart * 1000000;
            }
        }

        return numberPart;
    } else {
        throw new Error('Invalid input format');
    }
}



const handleGGSheet = async (message, sheetID) => {
    message.map(async (message) => {
        const keywords = ['chi tiêu', 'thu nhập', 'lập kế hoạch'];
        const messageHandledSpace = message.replace(/\s+/g, ' ') // loại bỏ khoảng trống thừa
        const pattern = new RegExp(`(\\b(?:${keywords.join('|')})\\b)`, 'gi');
        // pattern = pattern.filter(element => element !== ''); // loại bỏ ''
        const segments = messageHandledSpace.split(pattern);

        var message = ""
        var format = "@chi tiêu/Lập kế hoạch/Thu nhập [tên chi tiêu/kế hoạch/thu nhập]:[số tiền]"

        const type = segments[1]
        var [item, money] = segments[2].split(/ ?: ?/);

        if (item == "" || money == "" || !item || !money) {
            message = "Cú pháp không đúng định dạng. "
        }


        money = convertStringToNumber(money)

        // mở file sheet
        const file = new GoogleSpreadsheet("1Zqvtd0Usx6bqkEOOsZb26h-bDMMhpqxuwJjwMUKIFf0", jwt);
        await file.loadInfo();
        var sheet = file.sheetsByIndex[2];
        if (type == "Chi tiêu") {
            sheet = file.sheetsByIndex[2];
        }
        else if (type == "Lập kế hoạch") {
            sheet = file.sheetsByIndex[3];
        }
        else if (type == "Thu nhập") {
            sheet = file.sheetsByIndex[4];
        }
        else {
            sheet = file.sheetsByIndex[5];
        }

        const timeDayMonthYear = getTime();

        await sheet.addRow({
            "Thời gian": timeDayMonthYear,
            "Loại thu nhập": item,
            "Số tiền": money,
        });

    })



}

module.exports = { createNewSheet, handleGGSheet }



