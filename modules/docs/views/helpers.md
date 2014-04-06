##Helpers
Helpers can be used as a shortcut to create small functional pieces of code.

All defined helpers reside under the **$h** module that can be injected into controllers, behaviors and boundaries.

###Defining
```javascript
// this helper does not have dependencies
stik.helper("hasClass", function(){
  return function(elm, selector){
    var className = " " + selector + " ";
    return (" " + elm.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
  };
});
// the helper defined below depends on the
// previously defined hasClass helper
stik.helper("toggleClass", function(hasClass){
  return function(elm, selector){
    if (hasClass(elm, selector)) {
      var regex = new RegExp("\\b\\s?" + selector + "\\b", "g");
      elm.className = elm.className.replace(regex, '');
    } else if (!hasClass(elm, selector)) {
      elm.className += " " + selector;
    }
  };
});
```

###Using it
```javascript
stik.controller("AppCtrl", "List", function($template, $h){
  $h.toggleClass($template, "stik-is-awesome");
});

stik.behavior("shine-on-focus", function($template, $h){
  $template.addEventListener("focus", function(){
    $h.toggleClass($template, "shining");
  });
  $template.addEventListener('blur', function(){
    $h.toggleClass($template, "shining");
  });
});

stik.boundary({
  as: "myAwesomeExternalLibraryBoundary",
  from: "controller",
  resolvable: true,
  to: function($h, $template){
    var http = new SomeHttpLibrary();
    if ($h.hasClass($template, 'not-loaded')) {
      http.get('/load-app.html').wheDone(function(res){
        $h.toggleClass($template, 'loading-done');
      });
    }
  }
});
```
