module.exports = (app, cors) => {
  cors.forEach(c => {
    app.all(c.route,
    (req, res, next) => {
      Object.keys(c.header).forEach(key => {
        res.header(key, c.header[key]);
      });
      
      next();
    });
  });
};
