
# Appt
A lightweight *exo-framework* for *ready-to-go* **NodeJs** applications.


## What?!
This document will introduce the `@appt/mongoose` plugin package. We assume you got here after seeing the [Appt's Main](https://github.com/brab0/appt) page. If you don't, **we strongly recommend** you to step back an take a 5 minutes reading to get used with some concepts we're going to apply here.


## Install
    $ npm install @appt/mongoose --save

    
## @appt/mongoose
This is a plugin made for the Mongoose ODM that wraps it to works into the Appt's ecosystem.
 
## Resources
The `@appt/mongoose` plugin export some resources which can be imported as seen below:
```javascript
import {
	Mongoose,
	TModel,
	TSchema,
	SchemaTypes,
	MongooseParse
} from '@appt/core';
```

### Mongoose
```javascript
import { ApptComponent, TDatabase } from '@appt/core';
import { Mongoose } from '@appt/mongoose';

@ApptComponent({
	extend: {
		type: TDatabase,
		use: [Mongoose],
		config: {
			uri: 'mongodb://localhost:27017/appt-demo',
			options: {}
		}
	}
})
export class AppDatabase(){}
```

### TModel
```javascript
import { ApptComponent } from '@appt/core';
import { TModel } from '@appt/mongoose';

@ApptComponent({
	extend: {
		type: TModel,
		use: ['AppSchema'],
		config: {}
	}
})
export class AppModel(){}
```

### TSchema
```javascript
import { ApptComponent } from '@appt/core';
import { TSchema } from '@appt/mongoose';

@ApptComponent({
	extend: {
		type: TSchema,
		config: {}
	}
})
export class AppShema(){
	constructor(){
		this.name = {
			type: String,
			trim: true,
			default: "",
		}
		
		this.email = {
			type: String,
			trim: true,
			default: "",
		}
	}
}
```

### SchemaTypes
This is an Appt interface for Mongoose ODM schema types. It exposes every type available by Mongoose.
```javascript
import { SchemaTypes } from '@appt/mongoose';
...
	this._id = {
		type: SchemaTypes.ObjectId,
		require: true
	}
...
```

### MongooseParse
This is an Appt interface for Mongoose ODM schema parsers. It exposes every parser available by Mongoose.

```javascript
import { MongooseParse } from '@appt/mongoose';
...
	getById(myId){
		return this.findOne({
			_id: MongooseParse.ObjectId(myId)
		})
	}
...
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
