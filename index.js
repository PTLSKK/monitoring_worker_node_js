const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoute = require('./routes/api');

const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoute);

app.get('/', function(req, res) {
  res.send('Welcom to node services');
});

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on('error', err => {
    console.log('ERROR: ', err);
  });
