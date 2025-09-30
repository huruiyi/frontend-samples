const test1 = () => {
  const buf = new ArrayBuffer(64);
  const blob = new Blob([ buf ]);
}

const test2 = () => {
  const buf = new ArrayBuffer(64);
  const blob = new Blob([ buf ], { type : "application/octet-stream" });
  console.log(blob.type)
}

test2()
