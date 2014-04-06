##Boundaries
External libraries, objects and functions can be added as injectable modules to Stik.js. With that you will be able to avoid referencing global defined variables within controllers or behaviors. This will make your code more testable, since you will be able to inject mocks that quacks like the original libraries.

Boundaries can be injectable in both controllers and behaviors. Unless, otherwise stated through the **from** parameter.

###Object Boundaries:

```javascript
stik.boundary({
  as: "MyDataLibrary",
  from: "controller",
  to: {
    // your awesome data related object
    someAwesomeData: "Awesome!!",
    doSomeDataManipulation: function(){ return "Yay!"; }
  }
});

stik.boundary({
  as: "MyEffectsLibrary",
  from: "behavior",
  to: {
    // your awesome visual related obj
    fadeIn: function(elm){},
    fadeOut: function(elm){}
  }
});

stik.controller("AppCtrl", "List", function(MyDataLibrary){
  // here you can manipulate your data
  // using your external dependency
  MyDataLibrary.doSomeDataManipulation(); // "Yay!"
  MyDataLibrary.someAwesomeData; // "Awesome!!"
});

stik.behavior("fade-input", function($template, MyEffectsLibrary){
  // here you can attach your visual effects
  // using your external dependency

  MyEffectsLibrary.fadeIn($template);
  MyEffectsLibrary.fadeOut($template);
});
```

###Function Boundaries:

```javascript
stik.boundary({
  as: "GetTwitterFeed",
  from: "controller",
  to: function(){
    return ajaxLib.get("https://twitter.com/twitterapi");
  }
});

stik.boundary({
  as: "fadeIn",
  from: "behavior",
  to: function(elm){
    return applyFadeIn(elm);
  }
});

stik.controller("AppCtrl", "List", function(GetTwitterFeed, $viewBag){
  var feed = GetTwitterFeed();

  $viewBag.$push(feed);
});

stik.behavior("fade-input", function($template, fadeIn){
  fadeIn($template);
});
```

###Resolvable Boundaries
Resolvable Boundaries are functions that might depend on Stik modules or other boundaries. They will be called with the required dependencies and their returned value will be passed on to whichever controller or behavior requiring it.

```javascript
stik.boundary({
  as: "SomeFunkyFunc",
  from: "controller",
  resolvable: true,
  to: function($template){
    return doSomethingFunky($template);
  }
});

stik.controller("AppCtrl", "List", function(SomeFunkyFunc){
  SomeFunkyFunc // some funky value returned from the boundary
});
```

###Instantiable Boundaries:
Instantiable boundaries can be used when you might have dependencies on Stik modules but mostly other boundaries and you need to maintain separate state between your controllers and/or behaviors.

```javascript
stik.boundary({
  as: "TwoWayDataBinding",
  from: "controller",
  instantiable: true,
  to: function($template, $viewBag, GetTwitterFeed){
    // this should be the obj constructor
    // that will receive whichever dependency you declare

    this.prototype.bindTo = function(myDataObj){
      // do your binding stuff
    };
  }
});

stik.controller("AppCtrl", "List", function(TwoWayDataBinding){
  // this will be a new instance of the TwoWayDataBinding class
  // that will have the $template as an instance variable
  TwoWayDataBinding.bindTo(SomeData);
});
```

###Cachable Boundaries
Function and Instantiable boundaries can be cached to avoid duplicate calls or expensive operations. The function will be called the first time and its value will be cached for all subsequencial calls.

```javascript
stik.boundary({
  as: "expensiveFunction",
  cache: true,
  to: function(){
    return expensiveOperation();
  }
});
```
