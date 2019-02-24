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

socket.on('newLocationMessage', function(message){
  const li = jQuery('<li></li>');

  // "_blank" open url in a new tab
  const a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
}); 

// jQuery can be replaced with $('#send-location')
const locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  // if the program has access to the location
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser,');
  }

  // first argument = success function, emit to server
  // second argument = error handler
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }); 
  }, function(){
    alert('Unable to fetch location.');
  });
});