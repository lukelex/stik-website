##debounce
Debouncing ensures that a method gets executed only once, during the specified interval, even if several calls were triggered.

```javascript
stik.behavior("shineOnMouseMove", function($h, $template){
  shineFunc.bind({}, $template);

  // the `shineThis` function will only be called
  // once within 500ms even if the browser triggers
  // 100+ mouse events
  $template.addEventListener("mousemove", $h.debounce(shineThis, 500));
});
```
