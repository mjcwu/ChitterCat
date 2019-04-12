# ChitterCat

A social chatting app that let users to choose the chitter room they want to join and chat with other users.

![ChitterCat Front Page](https://i.imgur.com/efwHpFc.jpg)
![ChitterCat Chat Interface](https://i.imgur.com/vbYmQTc.png)

## Getting Started
ExpressJS front-end and back-end

### Prerequisites
- Install nodeJS
  - download https://nodejs.org/en/

- Install express
```
$ npm install express --save
```

### Installing

- clone the Express repo and install the dependencies:
```
$ git clone git@github.com:mjcwu/ChitterCat.git
$ cd express
$ npm install
```

## Running Chitter Cat

- Then run the chitter cat
```
$ nodemon ./server/server.js
```
or
```
$ npm start
```
- then runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

### And coding tests

- There are serveral tests to test the communication between front-end and back-end through socket.io.
- You can run the following code to test if the front-end is communicating to back-end.

```
npm test
```

- Test files are named with xxx.test.js and are located at /server/utils/

## Authors

* **Mike Wu** - [Mike Wu](https://github.com/mjcwu)
