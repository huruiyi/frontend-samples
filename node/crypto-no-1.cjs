const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const hmacSHA512 = require('crypto-js/hmac-sha512');

/**
 * https://segmentfault.com/a/1190000039192480
 *
 * ECB：电码本模式（Electronic Codebook Book）。将整个明文分成若干段相同的小段，然后对每一小段进行加密。
 * CBC：密码分组链接模式（Cipher Block Chaining）。先将明文切分成若干小段，然后每一小段与初始块或者上一段的密文段进行异或运算后，再与密钥进行加密。
 */
/**
 * AES-256-ECB对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 加密后的密文，Base64格式
 */
function AES_ECB_ENCRYPT(text, secretKey) {
  const keyHex = CryptoJS.enc.Base64.parse(secretKey);
  const messageHex = CryptoJS.enc.Utf8.parse(text);
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    "mode" : CryptoJS.mode.ECB,
    "padding" : CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * AES-256-ECB对称解密
 * @param textBase64 {string} 要解密的密文，Base64格式
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 解密后的明文
 */
function AES_ECB_DECRYPT(textBase64, secretKey) {
  var keyHex = CryptoJS.enc.Base64.parse(secretKey);
  var decrypt = CryptoJS.AES.decrypt(textBase64, keyHex, {
    "mode" : CryptoJS.mode.ECB,
    "padding" : CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

/**
 * AES-256-CBC对称加密
 * @param text {string} 要加密的明文
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 加密后的密文，Base64格式
 */
function AES_CBC_ENCRYPT(text, secretKey) {
  const keyHex = CryptoJS.enc.Base64.parse(secretKey);
  const ivHex = keyHex.clone();
  // 前16字节作为向量
  ivHex.sigBytes = 16;
  ivHex.words.splice(4);
  const messageHex = CryptoJS.enc.Utf8.parse(text);
  const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
    "iv" : ivHex,
    "mode" : CryptoJS.mode.CBC,
    "padding" : CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

/**
 * AES-256-CBC对称解密
 * @param textBase64 {string} 要解密的密文，Base64格式
 * @param secretKey {string} 密钥，43位随机大小写与数字
 * @returns {string} 解密后的明文
 */
function AES_CBC_DECRYPT(textBase64, secretKey) {
  const keyHex = CryptoJS.enc.Base64.parse(secretKey);
  const ivHex = keyHex.clone();
  // 前16字节作为向量
  ivHex.sigBytes = 16;
  ivHex.words.splice(4);
  const decrypt = CryptoJS.AES.decrypt(textBase64, keyHex, {
    "iv" : ivHex,
    "mode" : CryptoJS.mode.CBC,
    "padding" : CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypt);
}

const message = "123加密解密工具测试类sss";
const key = "KUf4hM5rThssysJhcRFCfxLR8Imihjl0eMsyhh1M7Wk";

// 测试AES-256-ECB
const ecbEncrypt = AES_ECB_ENCRYPT(message, key);
console.log("ecb加密", ecbEncrypt);
const ecbDecrypt = AES_ECB_DECRYPT(ecbEncrypt, key);
console.log("ecb结果比较---", message === ecbDecrypt)

// 测试AES-256-CBC
const cbcEncrypt = AES_CBC_ENCRYPT(message, key);
console.log("cbc加密", cbcEncrypt);
const cbcDecrypt = AES_CBC_DECRYPT(cbcEncrypt, key);
console.log("cbc结果比较---", message === cbcDecrypt)


