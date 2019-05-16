const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/apiRouter');

server.listen(8000);
// WARNING: app.listen(80) will NOT work here!

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
});

app.get("/vote/:side", function(req, res){
  //store result in db
  console.log(req.params.side);
  io.sockets.emit('vote', "side"+req.params.side);
  res.send({votedSide: req.params.side})
})

app.use(express.static(path.join(__dirname, '../../dist')));