module.exports = function(app, access) {
  const jwt = require("express-jwt");

  if(access){
    for (var type in access) {
      if (access.hasOwnProperty(type) && access[type].path) {
        app.use(access[type].path, jwt({
          secret: access[type].secret
        }).unless({
          path: access[type].ignore
        }));
      }
    }
  }
}
