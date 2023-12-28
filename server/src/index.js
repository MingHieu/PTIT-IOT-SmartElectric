const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const apis = require('./apis');
const { setupWSS } = require('./ws');

(async () => {
  require('dotenv').config();
  const app = express();
  const port = 3000;
  const httpServer = createServer(app);

  setupWSS(httpServer);

  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use('/', apis);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  });

  httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
