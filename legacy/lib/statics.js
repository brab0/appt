module.exports = (app, options) => {
   const express = require('express');

   options.forEach(opt => {      
      app.use(opt.route, express.static(opt.path));
   })
};
