
  
# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.


## What?!
It's interesting how the idea of framework remains the same since 90's. Even with all the *packages manager running*, essentially most of them still use cannonballs to kill flies, bringing a lot of stuff we don't need, putting all together, demanding a big learning curve and re-inventing the wheel. Once said that...

> "how do we create a framework unnecessarily heavy, semantically intuitive, which can overcome recurrent steps on building process applications, without being too imperative, focusing on fast and scalable development?"

**We made Appt!**

*This document will introduce the main concepts used by Appt while the examples (yes, you'll see some code, but **not here**) will be separated according to their respective contexts with links to them at the **Packages** session below.*

## Why?
Imagine yourself starting a new project, which you don't really sure about the architecture. You'll write some code, import packages and classes by their paths when suddenly *BOOM*: you decide to reorganize everything. You're gonna rewrite every *../../../../path* of every single file into your project. 

...Or maybe, you're on a complex project, which becomes bigger and bigger fast, and the more it grows, the more impossible becomes to read and find yourself on it.

If some of those scenarios looks familiar and bother you, **you should definitely use Appt**!


## Packages
To guarantee you're gonna use (*and load*) only what you want/need, Appt is fully modularized and uncoupled by scoped packages.

### @appt/cli
The Appt's cli for seeds Appt projects generation (for now)

#### Install
    $ npm install -g @appt/cli

**Read the docs:** https://github.com/brab0/appt/tree/master/cli
 
### @appt/core
The Appt's ecosystem package. It's responsible for give the DI approach.

#### Install
    $ npm install @appt/core --save

**Read the docs:** https://github.com/brab0/appt/tree/master/core

    
### @appt/api
A ready-to-go wrapper to build amazing API's that gathers essential tools, such as [express](https://www.npmjs.com/package/express), [`body-parser`](https://www.npmjs.com/package/body-parser) and [express-jwt](https://www.npmjs.com/package/express-jwt), putting them all into Appt's ecosystem.

#### Install
    $ npm install @appt/api --save

**Read the docs:** https://github.com/brab0/appt/tree/master/api


### @appt/mongoose
A wrapper to put [mongoose](https://www.npmjs.com/package/mongoose) inside the Appt's ecosystem and make it works on crack!

#### Install
    $ npm install @appt/mongoose --save

**Read the docs:** https://github.com/brab0/appt/tree/master/plugins/mongoose


### @appt/legacy
There was a first implementation of Appt concept. It's not maintained anymore, but it's stable and has this value on a non-class-orientation approach. If you feel curious about it, maybe it's worth to check it out. 

#### Install
    $ npm install @appt/legacy --save

**Read the docs:** https://github.com/brab0/appt/tree/master/legacy


## Main Concepts
Thanks to ES6 features, Appt's core works like an **exo-framework**. Which means we can help your development process, being less intrusive. 
> Even removing **@appt/core** *out of the way*, your implementation's logic still makes sense and gonna work.

### Dependecy Injection
The whole *Appt's ecosystem* is based on *dependecy injection pattern*, using the power of **decorators** over the **annotation** sintaxe style (*AtScript*). This allows Appt's core to be more *flexible* and *scale* your application easier *without being a lot imperative.* 

### Modules && Components
**EVERYTHING** on Appt's concept is about to build applications over the perception of **Modules** and **Components**. Inside `@appt/core`, these concepts are implemented as `@ApptModule` and `@ApptComponent` decorators, which have the purpose to *assemble* the whole application and *handle the implementation's logic*, respectively. That means, you can naturally build your application as you always do (*building your custom middlewares, server, database connections and so on...*) and let Appt to wrap it all with simplicity on a *non-intrusive* style.

### Special-Type Extenders
Even the main core decorators `@ApptModule` and `@ApptComponent` have particular and simple roles, Appt also provides a way to add some powers and behaviours to them, making use of *Special-Type Extenders*. That means, even you do not need them, they can give an elegant, semantic and straightforward approach to your server implementation, database connection, routes etc. 

### Default Configurations
Because we are also talking about to create *ready-to-go NodeJs applications*, every Special-Type Extender has its default configuration. That means Appt can overcome some trivial steps on development process, such as writing `CORS`, defining `Body Parsers`, making `JWT middlewares`, configuring `Routers` etc, by simply providing built-in default configuration and, of course, letting you overwrite them.

### Plugins
Plugins are, essentially, uncoupled wrappers developed to work with third party packages to work specifically into the Appt's ecosystem. Although you might not need them, you will notice they can decrease your development effort an give you an elegant approach.


## Compatibility
Because Appt use ES6 features, your project must predict that and make use of some compiler tool, such as [babel](https://babeljs.io/), and configure it to work with decorators as annotation (*babel-plugin-transform-decorators-legacy*).
For **TypeScript** development, decorators are available as an experimental feature (use experimentalDecorators as true on your tsconfig.json).
  
  
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
