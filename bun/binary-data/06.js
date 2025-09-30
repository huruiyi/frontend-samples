const blob = new Blob(["hello world"]);
const buf = await blob.arrayBuffer();


// 示例：读取用户上传的文本文件并解析内容
async function handleFile(file) {
  const buf = await file.arrayBuffer(); // file 是 Blob 的子类
  const decoder = new TextDecoder();
  const content = decoder.decode(buf); // 转为字符串
  console.log("文件内容：", content);

  // 也可进行二进制分析（如判断文件头、解析特定格式）
  const header = new Uint8Array(buf, 0, 4); // 读取前4字节
  console.log("文件头字节：", header);
}

// 示例：下载二进制文件并解析
async function fetchBinaryData(url) {
  const response = await fetch(url);
  const blob = await response.blob(); // 获取 Blob
  const buf = await blob.arrayBuffer(); // 转为 ArrayBuffer

  // 例如：解析图片二进制数据（检查宽高、格式等）
  const view = new DataView(buf);
  // ... 根据具体文件格式解析二进制内容
}


// 示例：简单加密（伪代码）
async function encryptData(blobData, key) {
  const buf = await blobData.arrayBuffer();
  const encryptedBuffer = crypto.subtle.encrypt(
    { name: "AES-GCM" },
    key,
    buf
  );
  return new Blob([encryptedBuffer]); // 加密后转回 Blob 存储/传输
}


// 示例：处理音频数据
async function processAudio(blob) {
  const buf = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(buf); // 解码为音频帧
  // 处理音频（如分析频谱、调整音量等）
}

// 示例：Blob 转 ArrayBuffer 后再转为 Base64
async function blobToBase64(blob) {
  const buf = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(buf);
  // 转换为 Base64 字符串（用于显示图片、传输等）
  return btoa(String.fromCharCode(...uint8Array));
}



// 点击按钮初始化并播放音频
   // 初始化 AudioContext（兼容不同浏览器）
let  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();

async function loadAndPlayAudio(url) {
  try {
    // 1. 获取音频文件（Blob 格式）
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // 2. 解码音频为 AudioBuffer（包含采样率、声道数等信息）
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 3. 创建音频源节点（将 AudioBuffer 作为数据源）
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    // 4. 连接节点到扬声器（目标节点）
    sourceNode.connect(audioContext.destination);

    // 5. 播放音频
    sourceNode.start(); // 可传参数：start(延迟时间, 开始位置, 播放时长)
  } catch (err) {
    console.error("音频处理失败：", err);
  }
}

async function playWithEffects(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // 1. 创建节点
  const sourceNode = audioContext.createBufferSource();
  const gainNode = audioContext.createGain(); // 音量节点
  const delayNode = audioContext.createDelay(); // 延迟节点

  // 2. 设置效果参数
  gainNode.gain.value = 0.3; // 音量调至30%
  delayNode.delayTime.value = 0.2; // 延迟200ms

  // 3. 构建处理链：源 → 延迟 → 音量 → 扬声器
  sourceNode.connect(delayNode);
  delayNode.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 4. 播放
  sourceNode.buffer = audioBuffer;
  sourceNode.start();
}
