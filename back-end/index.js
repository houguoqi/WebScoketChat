#!/usr/bin/env node
var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 

// 客户端连接成功
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    // 客户端连接错误
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    // 服务端断开连接
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });

    // 客户端收到信息
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    

    // 客户端连接成功后  每个一秒给客户端发送一个信息
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            console.log(number);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});
 
client.connect('ws://localhost:8080/', 'echo-protocol');