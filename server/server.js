const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
// http is build in library
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

// same as app.listen
const server = http.createServer(app)

// get back as web socket server
const io = socketIO(server);

app.use(express.static(publicPath));

// register event listener, 'connection' listen to new connection
// socket - individual socket
io.on('connection', (socket)=>{
  console.log('New user connected')
  
  // --------------- join page ----------------
  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.')
    }

    // join specific room 'the argument'
    socket.join(params.room);

      // socket.emit - to that joined user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    // broadcast to everyone but the just joined uesr
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  })

  // --------------- create msg ---------------
  // callback function is used to acknowledge that the server has received the data from user
  socket.on('createMessage', (newMessage, callback)=>{
    console.log('createMessage', newMessage);

    // to everyone
    io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));

    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', ()=>{
    console.log('User is disconnected!');
  });
})


server.listen(port, ()=>{
  console.log( `Server is up on ${port}`);
});

module.exports = {app};