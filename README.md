
# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.

## What?!
It's interesting how the idea of framework remains the same since 90's years. Even with all the *packages manager running*, essentially most of them still use cannonballs to kill flies and require a big learn curve. Said that...

> "how do we create a framework less intrusive, unnecessarily heavy, semantically intuitive, which can overcome recurrent steps on building process applications, without being too imperative and focused on fast and scalable development?"

**Not easy, right? But possible!** 
Lets introduce some concepts used by Appt.

## Main Concepts
Thanks to ECMA new features, Appt's core works like an **exo-framework**. Which means we can interfere helping you to smooth some development steps, but on way which can be less intrusive. 
> Even removing **appt core** *out of the way*, your business rules implementation still make sense and work.

### Decorators
The whole Appt's ecosystem is based on **decorator/annotation** pattern (AtScript). So, it makes clear we are talking here about *class orientation*.
The pattern contributes to make Appt *flexible*, your application *scalable* and allows an *less-imperative* core (*@appt/core*) basically built over the perception of  **Modules** (*@ApptModule*) and **Components** (*@ApptComponent*). 
**EVERYTHING** on Appt is about these two decorators and the definition of each one on your application is essentially yours.
```javascript
/* app.main.js */

import { ApptBootstrap, ApptModule } from '@appt/core';

@ApptModule({
	declare: ['PersonModel', 'PersonController']
})
export class MainModule {}

ApptBootstrap.module('MainModule');
```
```javascript
/* app.person.js */

import { ApptComponent } from '@appt/core';

@ApptComponent({
	inject: ['PersonModel']
})
export class PersonController {
	constructor(person){
		const greeting = person.sayHello('Appt')
		console.log(greeting);
	}
}

@ApptComponent()
export class PersonModel {
	sayHello(you){
		return `Hello ${you}`;
	}
}
```

### Specials Decorator Types


### Plugins


## Packages
To guarantee you're gonna use (and load) only what you want/need, the Appt project is fully modularized and uncoupled by scope.
 
### @appt/core

#### Install
    $ npm install @appt/core --save


### @appt/api
#### Install
    $ npm install @appt/api --save

### @appt/mongoose
#### Install
    $ npm install @appt/mongoose --save

### @appt/legacy
That was the first implementation of Appt. Still has some value and it's really straightforward. It has an scheme/configuration approach. If you feel curious about it, maybe it's worth to check it out: https://github.com/brab0/appt/tree/master/legacy

#### Install
    $ npm install @appt/legacy --save


## Compatibility
Because Appt use ES6 features of AtScript decorators/annotations, your project must predict that and make use of some compiler tool, such and [babel](https://babeljs.io/), together with *babel-plugin-transform-decorators-legacy*. For **TypeScript** users, the support is native.

## Third-Party
We don't want re-invent the wheel! Thanks to these amazing packages out there we can go straight to the point and focus on the environment desired. There is some of those we're using at this project:
- [mongoose](https://www.npmjs.com/package/mongoose) for advanced database models and schemes;
- [`body-parser`](https://www.npmjs.com/package/body-parser) to handle the request parameters;
- [express](https://www.npmjs.com/package/express) to run api's `Server`, `Routes`, `Statics`, `cross-domain(CORS)` and so on...
- [express-jwt](https://www.npmjs.com/package/express-jwt) to handle the access control;  
  
  
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