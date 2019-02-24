const generateMessage = (from, text)=>{
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (from, latitude, longtidue)=>{
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longtidue}`,
    createdAt: new Date().getTime()
  }
}

module.exports = { generateMessage, generateLocationMessage};