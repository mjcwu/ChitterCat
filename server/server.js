const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
// http is build in library
const http = require('http');

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

  // socket.emit - to single user
  // socket.emit('newMessage', {
  //   from: 'Brock Obama',
  //   text: 'you should retire',
  //   createAt: 123
  // });
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room',
    createAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createAt: new Date().getTime()
  })
  
  socket.on('createMessage', (newMessage)=>{
    console.log('createMessage', newMessage);

    // to everyone
    io.emit('newMessage',{
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date().getTime()
    })

    // broadcast to everyone but the creator
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', ()=>{
    console.log('User is disconnected!');
  });
})



server.listen(port, ()=>{
  console.log( `Server is up on ${port}`);
});

module.exports = {app};