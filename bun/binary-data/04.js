const test1 = () => {
  const buf = new ArrayBuffer(64);
  const decoder = new TextDecoder();
  const str = decoder.decode(buf);
  console.log(str);
}

const test2 = () => {
  // 创建一个包含 ASCII 字符 'hello' 的 Uint8Array，然后基于它的 buffer 创建 ArrayBuffer
  const uint8Arr = new Uint8Array([ 104, 101, 108, 108, 111 ]);
  const buf = uint8Arr.buffer;
  const decoder = new TextDecoder();
  const str = decoder.decode(buf);
  console.log(str); // 输出 hello
}

const test3 = () => {
  const buffer = new ArrayBuffer(8); // 8字节缓冲区

// 创建一个无符号8位整数视图（每个元素占1字节）
  const uint8View = new Uint8Array(buffer);
  uint8View[0] = 0x48; // 'H' 的 ASCII 码
  uint8View[1] = 0x65; // 'e'
  uint8View[2] = 0x6C; // 'l'
  uint8View[3] = 0x6C; // 'l'
  uint8View[4] = 0x6F; // 'o'

// 解码为字符串
  const decoder = new TextDecoder();
  console.log(decoder.decode(buffer)); // 输出："Hello"
}



// 方法1：直接通过TextEncoder创建包含字符串的ArrayBuffer
function stringToBuffer(str) {
  const encoder = new TextEncoder(); // 默认使用UTF-8编码
  const uint8Array = encoder.encode(str); // 编码为Uint8Array
  return uint8Array.buffer; // 返回对应的ArrayBuffer
}

// 方法2：将字符串写入已存在的ArrayBuffer（需确保缓冲区足够大）
function writeStringToBuffer(str, buffer) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);

  // 检查缓冲区容量是否足够
  if (uint8Array.byteLength > buffer.byteLength) {
    throw new Error("ArrayBuffer容量不足，无法写入字符串");
  }

  // 将编码后的二进制数据复制到目标缓冲区
  new Uint8Array(buffer).set(uint8Array);
  return buffer;
}

// 示例使用
const str = "Hello, 世界!";

// 方法1示例
const buffer1 = stringToBuffer(str);
console.log("方法1生成的缓冲区长度：", buffer1.byteLength); // 13字节（"Hello, "占7字节，"世界!"占6字节）

// 方法2示例
const buffer2 = new ArrayBuffer(32); // 创建一个32字节的缓冲区
writeStringToBuffer(str, buffer2);
console.log("方法2写入后的数据：", new TextDecoder().decode(buffer2)); // 解码验证：Hello, 世界!
