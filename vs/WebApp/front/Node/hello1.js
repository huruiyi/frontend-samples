// 1. 概念
// (1)  Node 是对高性能V8 引擎的封装（V8 是Google Chrome 浏览器的JavaScript 引擎），
//      通过提供一系列优化的API 类库，使V8 在浏览器之外依然能高效运行。
//      比如，在 服务器端开发程序常常需要处理二进制文件，JavaScript 语言本身对此支持得不好，
//      因此V8 也如此，而Node 的Buffer 类库提供了轻松操作二进制数据的方法。
//      使用 Node，除了可以直接操作V8 的JavaScript 运行时状态，还能在开发上得到更多益处。
// (2) Node 采用了事件循环（event loop）架构，让开发高效的服务器程序变得简单和安全。
//     对比其他构建高性能服务器的架构，Nod既保证了性能，又降低
// 2. 事件循环
// Node 做的每一件事情都是非阻塞的，所以事件触发与Node 对其操作的时间间隔是很短的，因为Node 不需要等待如磁盘I/O 这样的操作。
const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello word\n');
}).listen(8080, '127.0.0.1');
