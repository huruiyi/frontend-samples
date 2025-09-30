const test1 = () => {
  const buf = new ArrayBuffer(64);
  const arr = new Uint8Array(buf);
  console.log(arr.length, arr[0])
}

const test2 = () => {
  const buf = new ArrayBuffer(64);
  const uintArr = new Uint8Array(buf);
  const regularArr = Array.from(uintArr);
  console.log(regularArr)
}

test2()
