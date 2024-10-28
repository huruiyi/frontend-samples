// 创建TCP
const net = require('net');
const chatServer = net.createServer(), // 保存客户端
  clientList = [];
chatServer.on('connection', function (client) {
  client.name = client.remoteAddress + ':' + client.remotePort;
  client.write('hi' + client.name + '\n');
  // 添加客户端
  clientList.push(client);
  // 开始
  client.on('data', function (data) {
    broadcast(data, client)
  });
  // 结束
  client.on('end', function () {
    clientList.splice(clientList.indexOf(client), 1)
  })
  // 错误
  client.on('error', function (e) {
    console.log(e)
  })
});

function broadcast(message, client) {
  let i;
  const cleanup = [];
  for (i = 0; i < clientList.length; i += 1) {
    if (client !== clientList[i]) {
      if (clientList[i].writable) {
        clientList[i].write(client.name + " says " + message)
      } else {
        // 销毁退出的客户id 内存
        cleanup.push(clientList[i])
        clientList[i].destroy()
      }
    }
  }
  // 消除垃圾索引
  for (i = 0; i < cleanup.length; i += 1) {
    clientList.splice(clientList.indexOf(cleanup[i]), 1)
  }
}

chatServer.listen(8080)
