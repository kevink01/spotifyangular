export { hexColor };

const hex = [
  '#320000',
  '#640000',
  '#853f00',
  '#ab8700',
  '#bfad00',
  '#dce600',
  '#b4cf04',
  '#90ba07',
  '#65a00b',
  '#338210',
  '#006414',
];

function hexColor(num: number) {
  return hex[Math.floor(num / 10)];
}
