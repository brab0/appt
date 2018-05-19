# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.


## What?!
Thanks to ES6 features, Appt's core works like an **exo-framework**. Which means we can help your development process, being less intrusive. 
> Even removing **@appt/core** *out of the way*, your implementation's logic still makes sense and gonna work.

### Modules && Components
**EVERYTHING** on Appt's core is about the perception of **Modules** and **Components**, which are implemented by `@ApptModule` and `@ApptComponent` decorators. The main purpose of them is to *assemble* and *handle the implementation's logic*, respectively, on a way you can naturally build your application as you always do (*building your custom middlewares, server, database connections and so on...*), letting Appt to wrap it all with simplicity on a *non-intrusive* style.

#### Install
    $ npm install @appt/core --save


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
