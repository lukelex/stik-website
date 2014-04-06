##Behaviors
With the `behavior` method you can create reusable behaviors that can be applyed in multiple components throughout you application. Or, you can add multiple behaviors to a same component. Those behaviors should only have the responsibility of adding visual interactions instead of doing data manipulations (which is the controller responsibility).

```javascript
stik.behavior("sparkle-input", function($template){
  $template.addEventListener("focus", function(){
    // apply some fancy visual behavior
  });
  $template.addEventListener("blur", function(){
    // remove some fancy visual behavior
  });
});

stik.behavior("some-other-behavior", function($template){
  // ...
});
```

The bind of a behavior to its component is achieved using css classes.

```html
  <input class="sparkle-input some-other-behavior" />
```

After a template is bound to any behavior it will get a new attribute signalling behaviors were successfully applied, like so:

```html
  <input class="sparkle-input some-other-behavior" data-behaviors="sparkle-input some-other-behavior" />
```
