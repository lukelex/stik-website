###removeClass
Removes the specified class from the element.

```javascript
stik.behavior("active-on-focus", function($template, $h){
  // ...
  $template.onblur = function(){
    $h.removeClass($template, "active");
  };
});
```
