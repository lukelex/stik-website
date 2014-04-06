###toggleClass
Toggles the specified class on the element.

```javascript
stik.behavior("active-on-click", function($template, $h){
  $template.addEventListener "click", function(){
    $h.toggleClass($template, "active");
  };
});
```
