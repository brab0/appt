module.exports = config => {
  if(config){
    switch(config.type){
      case "mongodb":
        return loadMongoDatabase(config)
      break; 
      case "neo4j":
        return loadNeo4jDatabase(config)
      break; 
    }   
  } else {
    return new Promise(resolve => resolve());
  }
};

function loadMongoDatabase(config){
  const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');

  return mongoose
  .connect(config.uri, { 
    useMongoClient: true 
  })
  .then(() => {
    mongoose.set('debug', config.debug);

    return {};
  })
  .catch(err => {
    throw new Error(err)
  });
}

function loadNeo4jDatabase(config){  
  var neo4j = require('neo4j');  
  
  return new Promise((resolve, reject) => {
    resolve(new neo4j.GraphDatabase(config.uri));
  });
}