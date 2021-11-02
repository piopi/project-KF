import * as http from 'http';
import App from './App';
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

const app: App = new App();
let server: http.Server;
const PORT = normalizePort(process.env.PORT || '3001');

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific error codes here.
  throw error;
}

function serverListening(): void {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
}

app
  .init()
  .then(() => {
    app.express.set('port', PORT);

    server = app.httpServer; // http.createServer(App);
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(PORT);
  })
  .catch((err: Error) => {
    console.info('app.init error');
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
  });

process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Promise Rejection: reason:', reason.message);
  console.error(reason.stack);
});
