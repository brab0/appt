module.exports = (app, config, enviroment) => {
  return new Promise((resolve, reject) => {
    app.listen(config.port, err => {
      if(err) reject(err)

      resolve(Object.assign(config, { enviroment:enviroment }));
    });
  });
}
