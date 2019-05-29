const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT || 8081;
const db = require('./db');

server.listen(port);
// WARNING: app.listen(80) will NOT work here!

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist')));
//app.use('/api', apiRouter);

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

io.on('connection', socket => {
    console.log('User connected')

    socket.on('vote', (side) => {
      // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
      // we make use of the socket.emit method again with the argument given to use from the callback function above
      console.log('new vote for option ', side)
      io.sockets.emit('vote', side)
    })

    socket.on('confirm', () => {
      console.log("confirm page");
      io.sockets.emit('confirm');
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/vote/:side", function(req, res){
  //store result in db
  console.log(req.params.side);
  io.sockets.emit('vote', "side"+req.params.side);
  res.send({votedSide: req.params.side})
})

app.get("/api/current", function(req, res){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
  let time = {
    currentTime: getCurrentTime(),
    remainingTime: getRemainingTime()
  };
  db.getCurrent(date)
  .then(data=>{
    res.json(Object.assign(data, time));
    //res.json(data);
  })
  .catch(err=>{
    console.log("error: ", err);
  });
})

app.post("/api/vote/:side", function(req, res){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();
  let side = req.params.side;
  db.vote(date, side)
  .then(data=>{
    io.sockets.emit('vote', "side"+side);
    res.send({votedSide: side})
  })
  .catch(err=>{
    console.log("error: ", err);
  });
})

app.post("/api/confirm", function(req, res){
  io.sockets.emit('confirm');
  res.send({confirm: "yes"});
})

app.post("/api/cancel", function(req, res){
  io.sockets.emit('cancel');
  res.send({voteStatus: "cancelled"});
})

app.get('*/bundle.js', (req,res) => {
  res.sendFile(path.join(__dirname, '../../dist/bundle.js'));
 });

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
 });

function getRemainingTime() {
  let today = new Date();
  let currentHours = today.getHours();
  let currentMins = today.getMinutes();
  let currentSeconds = today.getSeconds();

  let finalHour = 20;
  let finalMinutes = 0;
  let finalSeconds = 0;

  let hours = finalHour - currentHours;
  if(currentMins > finalMinutes) {
      hours --;
  }
  let mins = 60 - finalMinutes - currentMins;
  if(currentSeconds > finalSeconds) {
      mins --;
  }
  let seconds = 60 - finalSeconds - currentSeconds;
  return `${hours >= 10 ? hours : "0" + hours}:${mins >= 10 ? mins : "0" + mins}:${seconds >= 10 ? seconds : "0" + seconds}`;
}

function getCurrentTime() {
  let today = new Date();
  let hours = today.getHours();
  let mins = today.getMinutes();
  let seconds = today.getSeconds();
  return `${hours >= 10 ? hours : "0" + hours}:${mins >= 10 ? mins : "0" + mins}:${seconds >= 10 ? seconds : "0" + seconds}`;
}