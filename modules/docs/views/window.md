##$window
Allows you to mock he window global obj
```javascript
stik.behavior("someWindowDependentBehavior", function($window){
  $window.AudioListener();
  // in this way you can later on
  // mock the window object on your tests
});

// or

stik.helper("clearTimeout", function($window){
  return $window.clearTimeout;
});
```
