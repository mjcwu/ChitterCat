
class Users {
  constructor () {
    this.users = [];
  }

  addUsers(id, name, room){
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }
  
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => {
        return user.id !== id
      });
    }

    return user;
  }

  getUser(id){
    let user = this.users.filter((user)=>{
      return user.id === id
    })
    return user[0];
  }

  getUserList(room){
    let users = this.users.filter((user)=> user.room===room);
    let namesArray = users.map((user)=> user.name);

    return namesArray;
  }
}

module.exports = {Users};