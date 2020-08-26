#!/usr/bin/env node

/**
 * Module dependencies.
 */

import debug from 'debug';
import http from 'http';
import app from '../app';

debug('application:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
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
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr ? addr.port : 9000}`;
  debug(`Listening on ${bind}`);
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

// This is becaause serverError is not a regular Error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onError(serverError: any) {
  const { error } = console;
  if (serverError.syscall !== 'listen') {
    throw serverError;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (serverError.code) {
    case 'EACCES':
      error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
