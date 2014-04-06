###deepExtend
Gives you the ability to deep copy all properties and values from one object to another.

```javascript
stik.controller("AppCtrl", "Post", function($h, httpGet){
  currentPost = {};

  anotherPost = httpGet("/posts/1029783.json");

  $h.deepExtend currentPost, anotherPost
  // currentPost will have all new properties
  // and values from anotherPost
});
```
