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
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  // in order to provide the value, 
  // first argument is the template you want to render, 
  // second argument is to pass an object that allow Mustache to render
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // below is not as scable as the new one
  if(false){
    // use jQuery to create an element and we can modify the element and add markup
    const li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    
    jQuery('#messages').append(li);
  }
}); 
 
// to have an acknowldgement, use a call back function as third argument
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: "aloha"
// }, function(serverMessage){
//   console.log('Server received the message.', serverMessage);
// });

socket.on('newLocationMessage', function(message){
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // below is not as scable as the new one
  if(false){
    const li = jQuery('<li></li>');
    
    // "_blank" open url in a new tab
    const a = jQuery('<a target="_blank">My current location</a>');
    
    li.text(`${message.from} ${formattedTime}:`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
  }
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  const messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  })
}); 

// jQuery can be replaced with $
const locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  // if the program has access to the location
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser,');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location......');

  // first argument = success function, emit to server
  // second argument = error handler
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }); 
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});