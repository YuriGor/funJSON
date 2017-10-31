## funJSON - JSON with functions(methods)

Implementation of [reviver](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Parameters) and [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter) functions for JSON parser to stringify, detect and parse methods as strings.
Works in browser and node, no dependencies.

### Basic Usage

````javascript
//const funJSON = require('./funJSON');//require for node or just load script in your page

var obj = {
  a:{
    a1:'a1',
    fa:function(name){
      //some comment here
      console.log('fa Hello ' + name);
      return 'fa Hello ' + name;
    }
  },
  b:{
    b1:'b1'
  },
  f:function(name){
    //some comment here
    console.log('f Hello ' + name);
    return 'f Hello ' + name;
  }
};

var str = funJSON.stringify(obj,null,2);// same syntax as for JSON.stringify
console.log('JSON:',str);
var obj2 = funJSON.parse(str);// same syntax as for JSON.parse
obj2.f('obj');
obj2.a.fa('obj.a');

str = funJSON.stringifyToScript(obj,null,2);// generate JavaScript string.
//Useful for letting user edit it in some code editor for example.
console.log('JS:',str);
eval('obj2 = '+str);
obj2.f("obj");
obj2.a.fa("obj.a");

````
### funJSON.\*

  * **JSON** - standard JSON parser to use. If not ovveridden, native JSON will be used by default.
  * **noConflict()**:funJSON - returns funJSON and restores global var 'funJSON' with previous value.
  * **parse(text\[,reviver\])**:object - parses JSON string into object with methods.
    * **text** - JSON string
    * **reviver(key, value)** - optional function to customize deserialization. Note that your reviver will be called before funJSON will check the value if it's a function, so funJSON will take modified value as an input.
  * **detect(obj,key,value)**:bool - funJSON uses this method to detect if given key/value pair is a method. By default it's a simple regex. Feel free to override this method, if you want to use some special convention about function detection.
    * **obj** - object owning this key/value
    * **key** - key to check
    * **value** - value to check
  * **reviver(obj,key,value)**: - inner reviver function. Uses 'detect' method to check if given key/value is a method, and if so, 'eval'(oh noes, don't tell anybody) candidate string to instantiate a function and assign it to corresponding key.
    * **obj** - object owning this key/value. Function will(may) be assigned here.
    * **key** - key to check
    * **value** - value to check
  * **stringify(value\[, replacer\[, space\]\])**:string - serializes object with methods into string.
    * **value** - object to serialize
    * **replacer(key, value)** - optional **function**(array with white list currently unsupported) to modify value before serialization. Will be called before funJSON inner replacer.
    * **space** - optional, defines how many spaces to use for pretty JSON indentation.
  * **replacer(obj,key,value)** - inner replacer used to detect and serialize methods. Simply checks if given value is function, and if so - returns it's toString(). You may want to override it to implement your custom function detect/stringify convention.
  * **stringifyToScript(value\[, replacer\[, space\]\])**:string - serializes object with methods into JavaScript string. All the functions renders as is, not as escaped strings values.
  * **replacerToScript(obj, key, value, functions)** - inner replacer used to collect functions from the object, unwrap them from strings values in result script.

*Any feedback is welcome.*
