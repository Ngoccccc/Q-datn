function convertStringToNumber(input) {
  // Sử dụng regex để kiểm tra và bắt nhóm số và chữ cái cuối cùng
  const regex = /^(\d+(\.\d+)?)([kK]|[tT][rR])?$/;
  const match = input.match(regex);

  if (match) {
    let numberPart = parseFloat(match[1]);
    let suffix = match[3];

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

// Ví dụ sử dụng
let inputString = "20k";
let result = convertStringToNumber(inputString);
console.log(result); // Output: 20000

inputString = "2tr";
result = convertStringToNumber(inputString);
console.log(result); // Output: 2000000

inputString = "3.5k";
result = convertStringToNumber(inputString);
console.log(result); // Output: 3500

inputString = "1.2tr";
result = convertStringToNumber(inputString);
console.log(result); // Output: 1200000
