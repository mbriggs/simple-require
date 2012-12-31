# Simple Require

require.js is amazing, but sometimes you just want simple deferred loading. This
does that in 60loc.

## gotchas

This doesn't do async, builds, optimizations, or anything like that. Also
doesn't do bi-directional associations, but since those are a design smell
anyways, I have managed to get away so far without adding them in (if you
introduce one, you will get a stack overflow exception).

## usage

Simple require will introduce two globals -- `require` and `define`. Module
definitions are executed (and memoized) when first required. To reset the cached
definitions (this is sometimes needed in test code, but should NEVER be needed
in production code!!), invoke `define._clearCaches()`.

Half the code there is to let you know when you do something dumb, like forget
to export anything, or define two modules with the same name.

```javascript
// simple usage

define("some-module", function(module){
  module.exports = {
    a: 1,
    b: 2
  }
});

console.log(require('some-module').a) // => 1


// when you are returning a bag of functions, you may just want to use exports

define("some-module", function(module, exports){
  exports.foo = function(){
    return "HI"
  }
});

console.log(require('some-module').foo()) // => "HI"
```
