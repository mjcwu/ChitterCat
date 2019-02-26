 const socket = io();

function scrollToBottom () {
  // selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  // height of chat
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href='/';
    } else{
      console.log('No error');
    }
  })
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
  scrollToBottom();

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
  scrollToBottom();

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