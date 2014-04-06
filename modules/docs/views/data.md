##$data
Captures all the `data-*` attributes defined in the template and gives you an object to easily access them.

###Using it
```html
<div class="lightsaber-clash" data-force="strong" data-direction="downwards"></div>
```

```javascript
stik.behavior("lightsaber-clash", function($data){
  $data.force // "strong"
  $data.direction // "downwards"
});
```
