#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import createDebug from 'debug';
import app from './app.js';
import { normalizePort, onError } from './utils/config.util.js';

const debug = createDebug('personal-blog:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', (error) => onError(error, port));
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  console.log('Server is running on port ' + port);
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  debug('Listening on ' + bind);
}
