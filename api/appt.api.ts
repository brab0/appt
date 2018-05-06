const express = require('express');

class ApptApi {
   private instance: any;
   private express: any;

   constructor(){
      this.express = express;
      this.instance = this.express();
   }

   getInstance(){
      return this.instance;
   }

   getExpress(){
      return this.express;
   }
}

export default new ApptApi();
