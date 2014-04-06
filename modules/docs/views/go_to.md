###goTo
Gives you a mockable interface to `window.location`.

```javascript
stik.controller("AppCtrl", "Posts", function($h){
  $h.goTo('/posts/73892');
  // mockable redirect
});
```
