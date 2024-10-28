const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const hmacSHA512 = require('crypto-js/hmac-sha512');

function test0() {
    const message = "Hello World", nonce = "ha ha", path = "/user", privateKey = "54353454354655675873422534748";
    const hashDigest = sha256(nonce + message);
    const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

    console.log(hashDigest);
    console.log(hmacDigest);
}

function test1() {
    console.log(CryptoJS.HmacSHA1("Message", "Key"));
    console.log(SHA256("Message"));
    console.log(AES.encrypt('my message', 'secret key 123').toString());
}


function test2() {
    const encText = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    console.log(encText)

    const bytes = CryptoJS.AES.decrypt(encText, 'secret key 123');
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
}

function test3() {
    const data = [{id: 1}, {id: 2}];
    const encText = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    console.log(encText)

    const bytes = CryptoJS.AES.decrypt(encText, 'secret key 123');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);
}

function test4() {
    var md5 = CryptoJS.MD5("Message");
    console.log(md5);
    console.log("MD5:", md5.toString());
}

function test5() {
    var hash = CryptoJS.SHA1("Message");
    console.log(hash);
    console.log("SHA1:", hash.toString());
}

function test6() {
    var hash256 = CryptoJS.SHA256("Message");
    console.log(hash256);
    console.log("SHA256:", hash256.toString());
}

function test7() {
    var hash512 = CryptoJS.SHA512("Message");
    console.log("-----------------------------------------------------------------");
    console.log(hash512);
    console.log("-----------------------------------------------------------------");
    console.log("SHA512:", hash512.toString());
    console.log("-----------------------------------------------------------------");
}

function test8() {
    var hash1 = CryptoJS.SHA3("Message");
    var hash2 = CryptoJS.SHA3("Message", {outputLength: 512});
    var hash3 = CryptoJS.SHA3("Message", {outputLength: 384});
    var hash4 = CryptoJS.SHA3("Message", {outputLength: 256});
    var hash5 = CryptoJS.SHA3("Message", {outputLength: 224});

    console.log(hash5.toString())
}

function test9() {
    var hash = CryptoJS.RIPEMD160("Message");
    console.log(hash)
    console.log(hash.toString())
}

function test10() {
    var hash = CryptoJS.SHA256("Message");
    var base64 = hash.toString(CryptoJS.enc.Base64);
    var hex = hash.toString(CryptoJS.enc.Hex);

    console.log(base64);
    console.log(hex);
}

function test11() {
    var sha256 = CryptoJS.algo.SHA256.create();
    sha256.update("Message Part 1");
    sha256.update("Message Part 2");
    sha256.update("Message Part 3");
    var hash = sha256.finalize();
    console.log(hash);
    console.log(hash.toString());
}

function test12() {
    var hashMd5 = CryptoJS.HmacMD5("Message", "Secret Passphrase");
    var hashSha1 = CryptoJS.HmacSHA1("Message", "Secret Passphrase");
    var hashSha256 = CryptoJS.HmacSHA256("Message", "Secret Passphrase");
    var hashSha512 = CryptoJS.HmacSHA512("Message", "Secret Passphrase");
    console.log(hashMd5)
    console.log(hashSha1)
    console.log(hashSha256)
    console.log(hashSha512)
}

function test13() {
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, "Secret Passphrase");
    hmac.update("Message Part 1");
    hmac.update("Message Part 2");
    hmac.update("Message Part 3");
    var hash = hmac.finalize();
    console.log(hash)
    console.log(hash.toString())
}

function test14() {
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 128 / 32
    });
    var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 256 / 32
    });
    var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 512 / 32
    });
    var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 512 / 32,
        iterations: 1000
    });

    console.log(key128Bits.toString())
    console.log(key256Bits.toString())
    console.log(key512Bits.toString())
    console.log(key512Bits1000Iterations.toString())
}

function test15() {
    var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
    var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

    console.log(encrypted.toString())
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(decryptedData);
}