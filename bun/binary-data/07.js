// const blob = new Blob(["hello world"]);
// const arr = new DataView(await blob.arrayBuffer());

// 创建一个包含结构化数据的 Blob（模拟自定义协议）
const buffer = new ArrayBuffer(12);
const view = new DataView(buffer);
// 写入数据：1个int32（4字节） + 1个float32（4字节） + 1个uint16（2字节） + 1个uint8（1字节）
view.setInt32(0, 100, true);    // 偏移0，值100，小端序
view.setFloat32(4, 3.14, false); // 偏移4，值3.14，大端序
view.setUint16(8, 0xFF00, true); // 偏移8，值0xFF00，小端序
view.setUint8(10, 0xAB);        // 偏移10，值0xAB

const blob = new Blob([ buffer ]);

// 解析 Blob 中的结构化数据
async function parseStructuredData(blob) {
  const arrBuffer = await blob.arrayBuffer();
  const dataView = new DataView(arrBuffer);

  // 按格式读取数据
  const intVal = dataView.getInt32(0, true);    // 100
  const floatVal = dataView.getFloat32(4, false); // 3.14
  const uint16Val = dataView.getUint16(8, true); // 0xFF00
  const uint8Val = dataView.getUint8(10);       // 0xAB

  console.log("解析结果：", { intVal, floatVal, uint16Val, uint8Val });
}

await parseStructuredData(blob);

// 模拟用户上传文件（Blob 类型）
export async function identifyImageFormat(fileBlob) {
  // 只读取前8字节（足够判断常见图片格式）
  const slice = fileBlob.slice(0, 8); // 截取 Blob 前8字节
  const arrBuffer = await slice.arrayBuffer();
  const dataView = new DataView(arrBuffer);

  // 读取文件头标识（Magic Number）
  const firstByte = dataView.getUint8(0);
  const secondByte = dataView.getUint8(1);
  const eighthByte = dataView.getUint8(7);

  // 判断格式
  if (firstByte === 0xFF && secondByte === 0xD8) {
    return "JPEG"; // JPEG 标识：0xFFD8
  } else if (firstByte === 0x89 && secondByte === 0x50) {
    // PNG 标识：0x89504E470D0A1A0A（前8字节）
    if (eighthByte === 0x0A) {
      return "PNG";
    }
  }
  return "未知格式";
}



//对于大文件，考虑使用 streamSaver.js 等库实现流式下载
 export async function downloadFileAsBlob(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      // 将响应转换为 Blob
      const fileBlob = await response.blob();
      console.log('下载的文件 Blob：', fileBlob);
      return fileBlob;
    } catch (err) {
      console.error('下载失败：', err);
    }
  }
// 协议格式：[版本号(1字节)] [数据长度(2字节，小端)] [状态码(1字节)] [数据...]
async function parseCustomProtocol(blob) {
  const arrBuffer = await blob.arrayBuffer();
  const dataView = new DataView(arrBuffer);

  // 解析协议头
  const version = dataView.getUint8(0);
  const dataLength = dataView.getUint16(1, true); // 小端序读取2字节长度
  const status = dataView.getUint8(3);

  // 解析数据体（根据长度截取）
  const dataStart = 4;
  const data = new Uint8Array(arrBuffer, dataStart, dataLength);

  console.log("协议解析：", { version, dataLength, status, data });
}

async function modifyBinaryData(originalBlob) {
  const arrBuffer = await originalBlob.arrayBuffer();
  const dataView = new DataView(arrBuffer);

  // 修改指定位置的二进制值（例如将第3字节改为0x01）
  if (arrBuffer.byteLength >= 3) {
    dataView.setUint8(2, 0x01);
  }

  // 生成修改后的 Blob
  const modifiedBlob = new Blob([ arrBuffer ]);
  return modifiedBlob;
}
