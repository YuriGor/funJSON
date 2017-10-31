/* Copyright (c) 2017 Yuri Gor, MIT License, https://github.com/YuriGor/funJSON */
"use strict";

;(function() {
  var root = this;
  var previous_funJSON = root.funJSON;

  var has_require = typeof require !== 'undefined';

  var funJSON = root.funJSON = {
    noConflict: function() {
      root.funJSON = previous_funJSON;
      return funJSON;
    },
    JSON: JSON||root.JSON,
    parse: function(text,reviver){
      var me = this;
      var rv;
      if(reviver)
      {
        rv = function(key, value){
          var obj = this;
          return me.reviver(obj,key,reviver.call(obj,key,value));
        };
      }else{
        rv = function(key, value){
          return me.reviver(this,key,value);
        };
      }
      return this.JSON.parse(text,rv);
    },
    reviver: function(obj, key, value){
      if(this.detect(obj, key, value))
      {
        try{
          value = eval('('+value+')');
        }catch(err){
          err.message = "Failed to parse function '"+key+"'."+err.message;
          throw err;
        }
      }
      return value;
    },
    detect: function(obj, key, value){
      return typeof value == 'string' && /^function\s*\([\s\w$,]*\)\s*\{[\s\S]*\}$/.test(value);
    },
    stringify: function(value, replacer, space){
      var me = this;
      var rp;
      if(replacer)
      {
        rp = function(key, value){
          var obj = this;
          return me.replacer(obj,key,replacer.call(obj,key,value));
        };
      }else{
        rp = function(key, value){
          return me.replacer(this,key,value);
        };
      }
      return this.JSON.stringify(value, rp, space);
    },
    replacer: function(obj, key, value){
      if(typeof value == 'function')
        value = value.toString();
      return value;
    }
  };

  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = funJSON;
    }
    exports.funJSON = funJSON;
  }
  else {
    root.funJSON = funJSON;
  }

}).call(this);