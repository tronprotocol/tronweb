export function toThousands(num) {
  let NUM = (num || 0).toString();
  let arr = NUM.split('.');
  let number = (arr[0] || 0).toString(),
    result = '';
  while (number.length > 3) {
    result = ',' + number.slice(-3) + result;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    if (arr[1]) {
      result = number + result + '.' + arr[1];
    } else {
      result = number + result;
    }
  }
  return result;
}
