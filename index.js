#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('backend:server');
var http = require('http');
const cors = require("cors")

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

const io = require("socket.io")(server, {
  cors:{
      origin: "*",
      methods: ["GET", "POST"]
  }
})

// app.use(cors())
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "/*");
  res.header("Access-Control-Allow-Methods", 'GET,POST');
  app.use(cors())
  next();
})
app.use(cors())

io.on('connection', (socket)=>{
  socket.emit('me', socket.id);

  socket.on('disconnect', ()=>{
      socket.broadcast.emit("callended")
  })

  socket.on("calluser", ({ userToCall, signalData, from, name}) =>{
      io.to(userToCall).emit("calluser", { signal: signalData, from, name})
  })

  socket.on("answercall", ( data )=>{
      io.to(data.to).emit("callaccepted", data.signal)
  })
})





/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
