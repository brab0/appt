module.exports = (app, config) => {
  const bodyParser = require('body-parser');
  
  app.use(bodyParser.json(config.json));
  app.use(bodyParser.urlencoded(config.urlencoded));
};
