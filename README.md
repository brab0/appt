# Appt
Appt is a lightweight *exo-framework* for building **NodeJs** applications.

## What?!
It's interesting how the idea of framework remains the same since 90's years. Even with all the *packages manager revolution*, essentially, most of them still use cannonballs to kill flies. That was the main challenge of this project: 

> "how to create a framework to overcome recurrent steps on building NodeJs applications without being too imperative, unnecessarily heavy, semantic and focusing on fast and scalable development?"

The answer to this questions is: *"Don't reinvent the wheel, keep it simple and modularized!"*

## Exo-framework
An exo-framework is a bunch of tools running over an ecosystem that improves the building process of something, but it's non-intrusive in a way that, even after removed, keeps the implementation working. That's the appt's core!

## Resources
To allow you building **ready-to-go NodeJs applications**, Appt provides a bunch of wraps, middlewares, classes and default configuration. We provide:
- a middleware using [`body-parser`](https://www.npmjs.com/package/body-parser) to handle your request parameters; 
- a configurable `static routes` helper using `express.static`;
- a `JWT Middleware` middleware to handle access controll using [express-jwt](https://www.npmjs.com/package/express-jwt) package;
- a wrapper for [mongoose](https://www.npmjs.com/package/mongoose) models and schemes;
- an [express](https://www.npmjs.com/package/express) `Server` wrapper;
- a `cross-domain(CORS)` helper;

## Install
    $ npm install @appt/core --save

## Core

*./models/Person.js*

```javascript
export default class Person {
	constructor(){}
	
	greeting(_id){
		const person = new ModelPerson();
		const name = person.getPersonNameById(_id);
		
		console.log(`Hey ${name}. How are you doing?`)
	}
}
```

```javascript
// Main.js
import Person from '../../../../models/Person'

const person = new Person();

person.greeting();
```

## That's it?!
Not even close.

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
