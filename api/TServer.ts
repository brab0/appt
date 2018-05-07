import { apptRouterSystem } from './TRouter';
import apptApi from './appt.api';

interface TAddress {
   host: String;
   port: Number;
}

interface TStatics {
   route: String;
   path: String;
}

interface TBodyParser {
   json: any; 
   urlencoded: any;
}

interface TCors {
   route: String,
   header: any
}

interface TServerConfig {
   address?: TAddress;
   statics?: Array<TStatics>;
   bodyParser?: TBodyParser;
   cors?: Array<TCors>;
}

export default class TServer{
    private defaultConfig: TServerConfig = {};
    private customConfig : TServerConfig = {};
    public api: any;
    public express: any;

    constructor(){
      this.api = apptApi.getInstance();
      this.express = apptApi.getExpress();

      this.defaultConfig.address = {
         host : "http://localhost",
         port : 3000
      };
      
      this.defaultConfig.statics = [];

      this.defaultConfig.bodyParser = {
         json: {
            limit: '50mb', 
            type: 'application/json'
         }, 
         urlencoded: {
            limit: '50mb', 
            extended: true
         }
      };

      this.defaultConfig.cors = [{
         route: "/*",
         header: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type, Origin, Accept, X-Requested-With, Origin, Cache-Control, X-File-Name",
            "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS, DELETE"
         }
      }];      
   }

   setAddress(addressConfig: TAddress): void {
      this.customConfig.address = addressConfig || this.defaultConfig.address;
   }

   setStatics(staticsConfig: Array<TStatics>): void {
      this.customConfig.statics = staticsConfig || this.defaultConfig.statics;

      this.customConfig.statics.forEach(opt => {      
         this.api.use(opt.route, this.express.static(opt.path));
      })
   }

   setBodyParser(bodyParser: TBodyParser): void {
      this.customConfig.bodyParser = bodyParser || this.defaultConfig.bodyParser;

      const bp = require('body-parser');
  
      this.api.use(bp.json(this.customConfig.bodyParser.json));
      this.api.use(bp.urlencoded(this.customConfig.bodyParser.urlencoded));
   }

   setCors(cors: Array<TCors>): void {
      this.customConfig.cors = cors || this.defaultConfig.cors;

      this.customConfig.cors.forEach(c => {
         this.api.all(c.route,
         (req: any, res: any, next: any) => {
           Object.keys(c.header).forEach(key => {
             res.header(key, c.header[key]);
           });
           
           next();
         });
       });
   }

   loadRoutes(){
     apptRouterSystem.ready.forEach(routeKey => routeKey.emit('complete'));
   }

   exec(args: any, usable: any, Target: any, injectables: Array<String>): Promise<any> {
      this.setAddress(args && args.address);      
      this.setStatics(args && args.statics);
      this.setBodyParser(args && args.bodyParser);
      this.setCors(args && args.cors);
      
      this.loadRoutes();

      return new Promise((resolve, reject) => {                  
        this.api.listen(this.customConfig.address.port, 
          (err: any) => {               
            if(err) reject(err);
            
            resolve(new Target(this.customConfig));
          });
      });
   }
}