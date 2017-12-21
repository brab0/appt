# Appt
Overcome recurrency steps at NodeJs projects building. 


## Install
    $ npm install appt --save


## What is this for?
Lets say you're building an **ExpressJs**(*we love it, right?*) based API. You probably will define a class or whatever to make a **database connection**, start a **server**, get an **express instance** and assemble (`app.use()`) your **routes**, handle your requests with **body-parser**, configure **CORS**, access controll(**JWT**) and so on...EVERY TIME! 

Or you're may just building a regular node's program. You will write a **glob requirer** to your **mongoose schemes and models** and...*hey, you also gonna have to require them all, even they've been loaded before*. Further that, good look when you change something on you *project's paths structure*.
 
If some of these scenarios looks familiar or makes sense to you, well, **Appt is totally for you!!!**


## Resources
To allow you building **ready-to-go NodeJs applications**, Appt provides a bunch of wraps, middlewares, classes and default configuration. We provide:
- a middleware using [`body-parser`](https://www.npmjs.com/package/body-parser) to handle your request parameters; 
- a configurable `static routes` helper using `express.static`;
- a `JWT Middleware` middleware to handle access controll using [express-jwt](https://www.npmjs.com/package/express-jwt) package;
- a MongoDB and Neo4j `Database Connection` helper;
- a wrapper for [mongoose](https://www.npmjs.com/package/mongoose) models and schemes;
- a `Cypher's Query Class` wrapping [neo4j](https://www.npmjs.com/package/neo4j) package;
- a `Redis Connection` helper using [cachegoose](https://www.npmjs.com/package/cachegoose) cached data;
- an [express](https://www.npmjs.com/package/express) `Server` wrapper;
- a `cross-domain(CORS)` helper;
- a [`glob requirer`](https://www.npmjs.com/package/require-files) with a `register` to label, boot and assemble your core application(routes, controllers, models and schemas) and expose some utils;
- a `Router Class` to wrap express routes and make the chaining of them easier;
- and finnally, a bunch of predefined configurations, as we can see below:
```javascript
// defaults
{
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
    server:{
        host : "http://localhost",
        port : 3001
    },
    database : {},
    statics : [],
    access: {},
    redis: {}
}
```

Of course you may want override some of these settings. Lets take a look to the next session.
**OBS:** All the non explicit overriden settings will be kept just as seen above.

## Usage
This session will guide you through an API example built with **Appt**. You can clone the whole example [right here](https://github.com/brab0/simple-men-template). 

For this example, we're gonna use: `statics paths`, `JWT` access controll, a custom folder structure(`paths`), `redis` to cache some queries and mongoDB. As we told before, everything is built-in. The only external package we're using here is `jsonwebtoken` to encrypt our JWT token. 

#### ./config.js
```javascript
module.exports = {
    paths : {
        schemes : [`**/schemes/*.js`],
        models : [`**/models/*.js`],
        controllers : [`**/controllers/*.js`],
        routes : [`**/routes/*.js`]
    },
    statics : [{
        route: '/pictures',
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
        type: "mongodb",
        uri: "mongodb://localhost:27017/simple_men",
        debug: false
    },
    server:{
        host : "http://localhost",
        port : 3000
    }
}
```
**Whats going on:**
- the `paths` setting is telling Appt where we design our core. So it will assemble it to us;
- the `statics` will define where the api statics are;
- the `access` will tell to Appt what routes JWT middleware must cover and what secrets to use against tokens sent;
- `redis` and `database` set the connections of both. If you're using Neo4j you must to change the `type` to "neo4j"(such as your `uri`, of course).
- to finish it, the `server` setting overrides default `port`, which is now :3000;


#### ./main.js
Once our API has all the configurations done, we should create our starter point. Lets take a look:
```javascript
import { config } from './config';
import { api } from 'appt';

api.run(config)
    .then(res => console.log(`HTTP server-${res.enviroment} running at ${res.host}:${res.port}.`))
    .catch(err => {
        throw new Error(err);
    });
```
**Whats going on:**
- we called our config.js file previously defined;
- imported the appt's `api` module and ran it passing our configs. Doing this, Appt boots its modules and, finnaly, load a server which return our configs as `res`. So now we can print our server status;


### Core
Working with a MongoDB(mongoose) + ExpressJs stack, I like to divide my API's structure between `routes`, `controllers`, `models` and `schemes`in different files. Feel free to try something different, but remember to configure the `paths` as/where you designed them and, if you are working with MongoDB, always register your schemes and models (even if they are at the same file). 


#### ./routes/auth.js
```javascript
import { route, controllers } from 'appt';

route("/auth")
  .get('/login/:user', req => controllers.auth.login(req.body))
  .post('/signin', req => controllers.auth.signIn(req.body));
```
**Whats going on:**
- `route` is a instance of a classe which wraps express routes and make it easier. So, breaking the lines, we first define a baseUrl at `route("/auth")`, then chain all the subsequents methods. That means every *get* http-request to `/auth/login/some-param` and *post* to `/auth/signin`, will be handled by these two routes;
- `controllers` is an object containing the reference of all our core's controllers assembled. Which means we no longer need to require them by their paths;

**OBS:** You may have noticed(or will in the controller file), there's no *response* instance to *send* back our results and *statusCode*. Well, it's here. We encapsulate it into a middleware to run on every return from their designated methods. **Why?** It looks a good practice let our routes to receive AND to respond all the calls since they are our interfaces. To allow that, we provide the method `respond()`(next) so we can decide the status and result to send back from our controllers or even models;


#### ./controllers/auth.js
```javascript
import { models, respond, config, register } from 'appt';
import jwt from 'jsonwebtoken';

const signIn = (user) => {
  return models.User.signIn(user)
    .then(res => respond(200).send(res))
    .catch(err => err);
}

const login = (user) => {
  return models.User.login(user)
    .then(res => {

      if(!res) throw 'Usuário ou senha errados.';        

      const token = jwt.sign({
        nome: res.name
      }, config.access.admin.secret, {
        expiresIn: "5 days"
      });
      
      return respond(200).send(token)       
    })
    .catch(err => respond(401).send(err));
};

register.controller('auth', {
  signIn,
  login
})
```
**Whats going on:**


#### ./models/user.js
```javascript
import { schemes, models, register } from 'appt'

const UserScheme = schemes.User;

UserScheme.statics.login = user => {
  return models.User.findOne({
    email: user.email,
    password: user.password
  })
  .then(res => res)
  .catch(res => res);
};

UserScheme.statics.signIn = user => {
  const newUser = new models.User(user);
  
  return newUser.save()
  .then(res => res)
  .catch(res => res);
};

register.model('User', UserScheme);
```
**Whats going on:**


#### ./schemes/user.js
```javascript
import { register } from 'appt';

const User = {
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
  },
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
};

register.scheme('User', User);
```
**Whats going on:**


## That's all folks!
Though we strongly recommed you to use Appt `route` class and mongoose wrapper, you can opt working with traditional express router and mongoose stufs. If you do so, import it from Appt such as the instance of your server/app as well(import {express, server, mongoose} from 'appt').

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
