## funJSON
 - JSON with functions (methods)

[![Known Vulnerabilities](https://snyk.io/test/npm/funjson/badge.svg)](https://snyk.io/test/npm/funjson) [![Travis (.org)](https://api.travis-ci.org/YuriGor/funjson.svg?branch=master)](https://travis-ci.org/YuriGor/funjson) [![Coverage Status](https://coveralls.io/repos/github/YuriGor/funJSON/badge.svg?branch=master)](https://coveralls.io/github/YuriGor/funJSON?branch=master) <br>
[![NPM](https://nodei.co/npm/funjson.png?compact=true)](https://nodei.co/npm/funjson/)


### Implemented using `eval`, don't parse untrusted JSON!

Implementation of [reviver](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Parameters) and [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter) functions for JSON parser to stringify, detect and parse methods as strings.
Works in browser and node, no dependencies.

### Installation
In a browser just load a [script](https://cdn.jsdelivr.net/npm/funjson/browser/funJSON.min.js):
```html
<script src="https://cdn.jsdelivr.net/npm/funjson/browser/funJSON.min.js"></script>
```
Using npm:
```
npm i --save funjson
```
```js
const funJSON = require('funjson');
```
or
```js
import { stringify, stringifyToScript, parse } from 'funjson';
```


### Basic Usage

```javascript

var obj = {
  a:{
    a1:'a1',
    fa:function(name){
      //some comment here
      return 'fa Hello ' + name;
    }
  },
  b:{
    b1:'b1'
  },
  f:(name) => {
    //some comment here
    return 'f Hello ' + name;
  }
};

var str = funJSON.stringify(obj,null,2);// same syntax as for JSON.stringify
console.log('JSON:',str);
var obj2 = funJSON.parse(str);// same syntax as for JSON.parse
obj2.f('obj'); // --> 'f Hello obj'
obj2.a.fa('obj.a'); // --> 'fa Hello obj.a'

str = funJSON.stringifyToScript(obj,null,2);// generate JavaScript string.
//Useful to let user edit it in some code editor.
console.log('JS:',str);
eval('obj2 = '+str);
obj2.f("obj"); // --> 'f Hello obj'
obj2.a.fa("obj.a"); // --> 'fa Hello obj.a'

```
### funJSON.\*

  * **parse(text\[,reviver\])**:object - parses JSON string into object with methods.
    * **text** - JSON string
    * **reviver(key, value)** - optional function to customize deserialization.
  * **stringify(value\[, replacer\[, space\]\])**:string - serializes object with methods into string.
    * **value** - object to serialize
    * **replacer(key, value)** - optional function or array with white list to use instead of default replacer.
    * **space** - optional, defines how many spaces to use for pretty JSON indentation.
  * **stringifyToScript(value\[, replacer\[, space\]\])**:string - serializes object with methods into string script. Functions serialized as is, not wrapped into quots.
    * **value** - object to serialize
    * **replacer(key, value)** - optional function to use instead of default replacer.
    * **space** - optional, defines how many spaces to use for pretty JSON indentation.

*Any feedback is welcome.*
