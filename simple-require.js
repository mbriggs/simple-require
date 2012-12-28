;(function(){
  "use strict";

  var cache = {},
      definitions = {}

  var require = function(name){
    var module

    if(cache[name]){
      module = cache[name]
    } else if(definitions[name] === undefined){
      throw new Error("Module '"+ name +"' must be defined!")
    } else {
      module = cache[name] = resolve( definitions[name] )
    }

    return module
  }

  var define = function(name, definition){
    if(definitions[name]) throw new Error(name +" has already been defined!")

    definitions[name] = definition
  }

  var resolve = function(definition){
    var module = { exports: {} }

    definition(module, module.exports)

    return module.exports
  }

  define._clearCaches = function(){
    cache = {}
  }

  this.define = define
  this.require = require
}());
