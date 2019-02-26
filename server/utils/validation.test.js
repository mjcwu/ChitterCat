const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string value', ()=>{
    const name=1234;
    
    const returnName=isRealString(name);
    expect(returnName).toBeFalsy();
  })

  it('should reject string with only space', ()=>{
    const name='    ';
    
    const returnName=isRealString(name);
    expect(returnName).toBeFalsy();
  })

  it('should allow string with non-space charactors', ()=>{
    const name='asdfadf';
    
    const returnName=isRealString(name);
    expect(returnName).toBeTruthy();
  })
})