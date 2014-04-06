##$template
Contains the HTML template (HTMLElement) that was bound to the current controller. This shall be used as the scope of **ALL** your DOM manipulation. Everything you need to access in the DOM to fullfill the role of the current controller action needs to be inside it. Using any HTML that doesn't reside in it is a violation of the Law of Demeter.

###Using it
```javascript
stik.controller("YourCtrl", "YourAction", function($template){
  // you can use plain JS to access the DOM
  $template.getElementsByClassName("my-elm");

  // and do your stuff
  ...
});
```
