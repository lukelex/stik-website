###Behavior Lab
```javascript
// this behavior might be defined in your lightsaber-sparks.js file
stik.behavior( "lightsaber-sparks", function( $template ){
  $template.className += " sparkling";
});

// and this in your specs/behaviors/lightsaber_sparks_spec.js
it("should run the specified behavior", function(){
  var template, lab;

  template = "<span class=\"lightsaber-sparks\"></span>";

  lab = stik.labs.behavior({
    name: "lightsaber-sparks",
    template: template
  });
  lab.run();

  expect(
    lab.template.className
  ).toEqual( "lightsaber-sparks sparkling" );
});
```
