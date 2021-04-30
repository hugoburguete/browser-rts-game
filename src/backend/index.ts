import { createServer } from './server';

createServer()
  .then(server => {
    // Start server
    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
  })
  .catch(err => {
    console.error(err);
  });
