###addClass
Adds the specified class to the element.

```javascript
stik.behavior("active-on-focus", function($template, $h){
  $template.onfocus = function(){
    $h.addClass($template, "active");
  };
});
```
