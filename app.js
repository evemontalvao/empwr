const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const routes = require('./routes');
const services = require('./routes/services');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

app.use('/', routes);

app.listen('2107', () => {
  console.log('Server listening to 2107')
})
