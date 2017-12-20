# Appt
Overcome recurrency steps at the start of a NodeJs project building. 


## Install
    $ npm install appt --save


## What is this for?
Lets say you're building an **ExpressJs**(*we love it, right?*) based API. You probably will define a class or whatever to make a **database connection**, start a **server**, get an **express instance** and assemble (`use`) your **routes**, handle your requests with a **body-parser**, configure some **CORS**, access controll(**JWT**) and so on...EVERY TIME! 

Or you're may building a regular node's program. You will write a **glob requirer** to your **mongoose schemes and models** and...*hey, you also gonna have to require them all, even they've been loaded before*. Further that, good look when you change something on you *project's paths structure*.
 
If some of these scenarios looks familiar or makes sense to you, well, **Appt is totally for you!!!**


## Resources
To allow you building **ready-to-go NodeJs applications**, Appt provides a bunch of resources(*wraps, middlewares, classes and default configuration*) as seen below:
- a middleware using [`body-parser`](https://www.npmjs.com/package/body-parser) to handle your request parameters; 
- a configurable `static routes` helper using `express.static`;
- a `JWT Middleware` middleware to handle access controll using [express-jwt](https://www.npmjs.com/package/express-jwt) package;
- a MongoDB and Neo4j `Database Connection` helper;
- an instantiation wrapper for [mongoose](https://www.npmjs.com/package/mongoose) models and schemes;
- a `Cypher's Query Class` wrapping [neo4j](https://www.npmjs.com/package/neo4j) package;
- a `Redis Connection` helper using [cachegoose](https://www.npmjs.com/package/cachegoose) cached data;
- an [express](https://www.npmjs.com/package/express) `Server` wrapper;
- a `cross-domain(CORS)` helper;
- a [`glob requirer`](https://www.npmjs.com/package/require-files) with a `register` to label, boot and assemble your core application(routes, controllers, models and schemas) and expose some utils according with your configurations;
- a `Router Class` to wrap express routes and make the chaining of them easier;
- and finnally, a bunch of predefined configurations, as seen below:
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

Of course you may want override some of these settings. Take a look to the next session.

**OBS:** All the non explicit overriden settings will be kept just as seen above.

## Usage
The nexts session will guide you through an API example built with Appt. You can clone the whole example [right here](https://github.com/brab0/simple-men-template) 


### Custom Configs
Although we can find similarity on some api/app building steps, some configurations makes sense only for us. Said that, lets customize our API configurations as follows:

```javascript
// config.js

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
Explaing a bit what is happening here:
- the `paths` setting is where Appt will find and what it will assembled;
- the `statics` will define where the api statics are;
- the `access` will tell to Appt what routes JWT must cover and what secrets it should use to verify a header's request token;
- `redis` and `database` set the connections of both. If you're using Neo4j you must to change the `type` to "neo4j"(such as you `uri`, of course).
- to finish it, the `server` setting overrides `port`, which is now :3000;

### Entry Point
Once our API has all the configurations done, we should create our starter point(set it to be at your package.json). There, we'll call an API's Appt instance, which will boot the resources and return the result of an express server instance:

```javascript
// main.js
import { config } from './config';
import { api } from 'appt';

api.run(config)
    .then(res => console.log(`HTTP server-${res.enviroment} running at ${res.host}:${res.port}.`))
    .catch(err => {
        throw new Error(err);
    });
```


### Core
Working with a MongoDB(mongoose) + ExpressJs stack, I like to divide my API's structure between `routes`, `controllers`, `models` and `schemes`. Feel free to try something else, but remember to configure the `paths` as you designed and don't forget to `register` everything.

**Spoiler Alert**: You will notice it ahead, but `register` method is the way(pattern) to make clear, such developer and Appt, of what is what. Dizzy? No problem. Let move on! 


#### Route
```javascript
// ./routes/auth.js

const { route, controllers } = require('appt');

route("/auth")
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
