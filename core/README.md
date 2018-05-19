
# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.


## What?!
This document will introduce the main package to start using Appt into your projects, the `@appt/core`. We assume you got here after seeing the [Appt's Main](https://github.com/brab0/appt) page. If you don't, we strongly recommend you to step back an take a 5 minutes reading to get used with some concepts we're going to apply here.

## Install
    $ npm install @appt/core --save


## Compatibility
**We're using ES6 features!** Which means you gonna need to compile your code to work with current versions of **NodeJs**. Thankfully, there's a lot of tools out there doing that, such as [babel](https://babeljs.io/).
You might also want to work with **TypeScript**. If you do, check the *experimental decorators support* to start coding.

    
## Overview
**EVERYTHING** on Appt's core is about the perception of **Modules** and **Components**, which are implemented by `@ApptModule` and `@ApptComponent` decorators. The main purpose of them is to *assemble* and *handle the implementation's logic*, respectively, on a way you can naturally build your application as you always do (*building your custom middlewares, server, database connections and so on...*), letting Appt to wrap it all with simplicity on a *non-intrusive* style.


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
