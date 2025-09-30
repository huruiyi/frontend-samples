const test1 = () => {
  const arrBuffer = new ArrayBuffer(64);
  const nodeBuffer = Buffer.from(arrBuffer);
}

const test2 = () => {
  const arrBuffer = new ArrayBuffer(64);
  const nodeBuffer = Buffer.from(arrBuffer, 0, 16); // view first 16 bytes
}
