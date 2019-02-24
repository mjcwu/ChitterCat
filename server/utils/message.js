const moment = require('moment');

const generateMessage = (from, text)=>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (from, latitude, longtidue)=>{
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longtidue}`,
    createdAt: moment().valueOf()
  }
}

module.exports = { generateMessage, generateLocationMessage};