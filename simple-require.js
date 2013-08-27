;(function(){
  "use strict";

  var cache = {},
      definitions = {};

  var require = function(name){
    var module;

    if(cache[name]){
      module = cache[name]
    } else if(definitions[name] === undefined){
      throw new Error("Module '"+ name +"' must be defined!");
    } else {
      module = cache[name] = resolve( name, definitions[name] );
    }

    return module;
  };

  var define = function(name, definition){
    if(definitions[name]) throw new Error(name +" has already been defined!");

    definitions[name] = definition;
  };

  function resolve(name, definition){
    var module = { exports: {} };

    definition(module, module.exports);

    if(canLog() && !hasProps(module.exports)){
      console.error(name + " doesn't export anything!!!! Maybe you want to look into that?");
    }

    return module.exports;
  }

  function canLog(){
    return window.console && console.error;
  }

  function hasProps(obj){
    if(typeof obj !== 'object') return true;
    var props = [];

    for(var prop in obj){ props.push(prop); }

    return props.length > 0;
  }

  define._clearCaches = function(){
    cache = {};
  };

  if(window.define) throw new Error("Simple Require: define already exists!");
  if(window.require) throw new Error("Simple Require: require already exists!");

  window.define = define;
  window.require = require;
}());
