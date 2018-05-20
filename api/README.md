
# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.


## What?!
This document will introduce the `@appt/api` package. We assume you got here after seeing the [Appt's Main](https://github.com/brab0/appt) page. If you don't, **we strongly recommend** you to step back an take a 5 minutes reading to get used with some concepts we're going to apply here.


## Install
    $ npm install @appt/api --save

    
## @appt/api
This package brings and wraps to the Appt's ecosystem all the essential packages, middlewares and configurations to built a ready-to-go REST Api.


## Third-Party
We don't want re-invent the wheel! Thanks to these amazing packages out there we can go straight to the point. 
There is some of those we're using at this project:
- [`body-parser`](https://www.npmjs.com/package/body-parser) to handle the request parameters;
- [express](https://www.npmjs.com/package/express) to run api's `Server`, `Routes`, `Statics`, `cross-domain(CORS)` and so on...
- [express-jwt](https://www.npmjs.com/package/express-jwt) to handle the access control;  
 
 
## Resources
The `@appt/api` plugin export some resources which can be imported as seen below:
```javascript
import {
	TServer,
	TRouter,
	api
} from '@appt/api';

import {
	Get,
	Post,
	Put,
	Delete,
	Patch,
	...
} from '@appt/api/router';
```

### TServer
```javascript
import { ApptComponent } from '@appt/core';
import { TServer } from '@appt/api';

/*

** These are the default configuration you can override. **

const config = {
	address: {
		host : "http://localhost",
		port : 3000
	},
	statics: [],
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
	}]
};
*/

@ApptComponent({
	extend: {
		type: TServer,
		config: {}
	}
})
export class ApiServer(){}
```

### TRouter
```javascript
import { ApptComponent } from '@appt/core';
import { TRouter } from '@appt/api';

@ApptComponent({
	extend: {
		type: TRouter,
		use: ['PrivateRouter', 'PublicRouter'],
		config: {
			path: '/api'
		}
	}
})
export class ApiRouter(){}
```

### api
```javascript
import { ApptComponent } from '@appt/core';
import { api } from '@appt/api';

@ApptComponent()
export class SomeComponent(){
	printExpressApiInstance(){	
		console.log(this.instance);
	}
	
	printExpress(){	
		console.log(this.express);
	}
}
```

### Router Decorators
```javascript
import { TRouter } from '@appt/api';
import { Get, Post } from '@appt/api/router';

@ApptComponent({
	extend: {
		type: TRouter
	}
})
export class PrivateRouter(){
	constructor(){}
	
	@Get('/')
	getAll(req, res, next){
		res.status(200).send('Take everything!')
	}

	@Get('/:id')
	getById(req, res, next){
		res.status(200).send(`We're gonna search by: ${req.params.id}`)
	}

	@Post('/:id')
	getById(req, res, next){
		res.status(200).send(req.body)		
	}
}
```

## Compatibility
**We're using ES6 features!** Which means you gonna need to compile your code to work with current versions of **NodeJs**. Thankfully, there's a lot of tools out there doing that, such as [babel](https://babeljs.io/).
You might also want to work with **TypeScript**. If you do, check the *experimental decorators support* option to start coding.


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
