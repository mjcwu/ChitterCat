const socket = io();

socket.on('connect', function(){
  console.log('Connected to server!');

  // put it inside the connect so it only happens when connected to the server
  // socket.emit('createMessage', {
  //   from: 'George Bush',
  //   text: 'time to retire'
  // });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server!');
})

socket.on('newMessage', function(message){
  console.log('New message',message);
})