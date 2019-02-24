const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  
  it('should generate correct message object', ()=>{
    const from = 'Starbucks';
    const text = 'Time to drink coffee';
    const message = generateMessage(from, text);
  
    expect(typeof message.createdAt).toBe('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  })
});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    const from = 'Wave cafe';
    const locationMessage = generateLocationMessage(from, 20, 20)

    expect(typeof locationMessage.createdAt).toBe('number');
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe("https://www.google.com/maps?q=20,20");
  });
});