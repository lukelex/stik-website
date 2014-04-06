##hasClass
Checks whether the element has the specified class.

```javascript
stik.behavior("active-on-click", function($template, $h){
  $template.addEventListener "click", function(){
    if ($h.hasClass($template, "active")) {
      $h.removeClass($template, "active");
    } else {
      $h.addClass($template, "active");
    }
  };
});
```
