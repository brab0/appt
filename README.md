Appt
==========
A bunch of wraps, middlewares, utils and configurations for `ready-to-go` APIs building based on MongoDB + Express + NodeJs stack.


## Install
    $ npm install appt --save


## Stack
You know we're using here a MongoDB, Express and NodeJs stack. But also, we supply a `Redis` connection to allow your API work with cached data. Further that, we provide: 
- a `body-parser` middleware to handle your request parameters: https://www.npmjs.com/package/body-parser 
- a simple configuration for `static routes` using express.static function;
- a `JWT Middleware` to handle access controll: https://www.npmjs.com/package/express-jwt
- a `Database Connection and Schema Driven` got from Mongoose: https://www.npmjs.com/package/mongoose  
- a `Redis Connection` provided by cachegoose in case you want to work with cached data: https://www.npmjs.com/package/cachegoose
- an express `Server`: https://www.npmjs.com/package/express
- an ordinary express `cross-domain` configuration;
- and a `glob requirer` which boots your api core(routes, controllers, models and schemas): https://www.npmjs.com/package/require-files


## Usage
```javascript
const api = require('appt');

api.run()
    .then(res => {
        console.log(`HTTP server-${res.enviroment} rodando em ${res.host} na porta ${res.port}.`));
    })
    .catch(err => {
        throw new Error(err);
    })
```
That's it! Write your `express routes`, `controllers` and `mongoose models` as usual and don't bother anymore with those ordinary configurations you have to deal with every time you start a new API project.


### Configurations
To make possible building `ready-to-go` APIs, we define following the default settings:

```javascript
module.exports = {
    enviroment : "dev",
    bodyParser: {
        json: {
            limit: '50mb', 
            type: 'application/json'
        }, 
        urlencoded: {
            limit: '50mb', 
            extended: true
        }
    },
    cors: [{
        route: "/*",
        header: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization, Content-Type, Origin, Accept, X-Requested-With, Origin, Cache-Control, X-File-Name",
            "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS, DELETE"
        }
    }],
    paths : {
        schemes : [`**/scheme.js`],
        models : [`**/model.js`],
        controllers : [`**/controller.js`],
        routes : [`**/route.js`]
    },
    statics : [],
    access: {}, 
    server:{
        host : "http://localhost",
        port : 3001
    }
}
```
Of course you may want override some of them. Do it, but don't forget to pass your configuration as parameter to the run function such as `api.run(myConfigs).then...`. Also, such as every setting above, `database`, `statics`, `access` and `redis` has specific properties and by default, they will not be loaded. In case of you want define them to be used at your API project, follow the next config example using your own settings:
```javascript
module.exports = {
    statics : [{
        route: '/prictures',
        path: '/public/assets/pictures'
    }],
    access: {
        admin: {
          path: "/admin/", 
          ignore: ['/favicon.ico'], 
          secret: "87jyjywwwq"
        },
        super: {
          path: "/super/", 
          ignore: ['/favicon.ico'], 
          secret: "34t34g4hjj"
        }
    }, 
    redis: {
        port: 6379,
        host: 'localhost'
    },
    database : {
        uri: "mongodb://localhost:27017/simple_men",
        debug: false
    }
}
```

### Libs
Further than configs, Simple MEN provides wrappers to abstract some ExpressJs functions and helps to the Routes->Controller->Model->Scheme pattern flow. You're not obligated to use it, though we strongly recommend you do it.

This is how our `route.js` looks like:
```javascript
const { router, controllers } = require('appt');

router
  .base("/auth")
  .post('/login', req => controllers.auth.login(req.body))
  .post('/signin', req => controllers.auth.signIn(req.body));
```

See the `controller.js` below. The only observation here is we have to export a class with static methods, because this is how we'll label it under the hoods.
```javascript
const { expose, models, respond } = require('appt');

function signIn(data){
  const user = new models.User(data);
  
  return user.signIn()
    .then(res => respond(200).send(res))
    .catch(err => err);
}

expose.controller('auth', {
  signIn: signIn
})
```

Build your mongoose's models as usual, except for the use of `api` object.
This is our `model.js`:
```javascript
const { expose, schemes } = require('appt');

schemes.User.methods.signIn = () => {
  return this.save()
    .then(res => res)
    .catch(res => res);
};

expose.model('User', schemes.User);
```

Finnaly our `scheme.js` file. I use to separate my schemes from models and if you do too, remember to set a name to it when you export. Take a look:
```javascript
const { expose } = require('appt');

expose.scheme('User', {
  name: {
    type: String,
    trim: true,
    default: ""
  },
  email: {
    type: String,
    trim: true,
    default: ""
  },
  password: {
    type: String,
    trim: true,
    default: ""
  }
});
```

## That's all folks!
If you have any suggestion or want to contribute somehow, let me know!

## License
```
MIT License

Copyright (c) 2017 Rodrigo Brabo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
