// const net = require('net');
// const chatServer = net.createServer();
// chatServer.on('connection', function(client) {
//   client.write('hi\n')
//   client.write('ben\n')
//
//   client.end()
// });
// chatServer.listen(8080)

const net = require('net');
const chatServer = net.createServer();
chatServer.on('connection', function (client) {
  client.write('hi')
  client.on('data', function (data) {
    console.log(data.toString())
  });
});

chatServer.listen(8080)
