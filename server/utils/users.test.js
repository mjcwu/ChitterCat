const expect = require ('expect');

const {Users} = require('./users');

describe('Users', ()=>{
  let users;
  // call seed data
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'stemcell'
    }, {
      id: '2',
      name: 'Mandy',
      room: 'stemcell'
    }, {
      id: '3',
      name: 'Bush',
      room: 'usa'
    }];
  });

  it('should add new user', ()=>{
     const user = {
       id: 123,
       name: 'cow bai',
       room: '30cm'
     };
     const users = new Users();

     const resUser = users.addUsers(user.id, user.name, user.room)
     // users.users => first users is from line 3
     // second users is from the users.js users array
     expect(users.users).toEqual([user]);
  });

  it('should remove a user', ()=>{
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user', ()=>{
    const userId = '4';
    const user = users.removeUser(userId);

    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  })

  it('should find a user', ()=>{
    let user = users.getUser('1');
    expect(user.id).toEqual('1');
  })

  it('should not find a user', ()=>{
    let user = users.getUser('100');
    expect(user).toNotExist;
  })

  it('should return names for stemcell', ()=>{
    let userList = users.getUserList('stemcell');
    expect(userList).toEqual(['Mike', 'Mandy']);
  });

  it('should return names for usa', ()=>{
    let userList = users.getUserList('usa');
    expect(userList).toEqual(['Bush']);
  });
})