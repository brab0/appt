module.exports = class Neo4jCustom {
  constructor(pool, query){ 
    this.pool = pool;
    this.cypher = {
      query: query
    };

    return this;
  }

  params(params){
    this.cypher.params = params;
    return this;
  }

  headers(headers){
    this.cypher.headers = headers;
    return this;
  }

  lean(){
    this.cypher.lean = true;
    return this;
  }

  // transaction(querys){
  //   var tx = this.pool.beginTransaction();
    
  //   queries.forEach(query => {  
  //   });

  //   return this;
  // }

  exec(){
    return new Promise((resolve, reject) => {
      this.pool.cypher(this.cypher, (err, results) => {
        if(err) reject(err);
        resolve(results);
      });

      process.on('uncaughtException', function(e) {
        reject(e);
      });
    });
  }
}
