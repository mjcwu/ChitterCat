const expect = require('expect');

const {generateMessage} = require('./message');

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