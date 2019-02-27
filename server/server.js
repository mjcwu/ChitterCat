const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
// http is build in library
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

// same as app.listen
const server = http.createServer(app)

// get back as web socket server
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

// register event listener, 'connection' listen to new connection
// socket - individual socket
io.on('connection', (socket)=>{
  console.log('New user connected')
  
  // --------------- join page ----------------
  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.')
    }

    // join specific room 'the argument'
    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUsers(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

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

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
})


server.listen(port, ()=>{
  console.log( `Server is up on ${port}`);
});

module.exports = {app};