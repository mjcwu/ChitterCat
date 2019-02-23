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
});

socket.on('newMessage', function(message){
  console.log('New message',message);
  // use jQuery to create an element and we can modify the element and add markup
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
}); 
 
// to have an acknowldgement, use a call back function as third argument
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: "aloha"
// }, function(serverMessage){
//   console.log('Server received the message.', serverMessage);
// });

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
}) 