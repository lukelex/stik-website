###Boundary Lab

```javascript
// this boundary might be defined in your stik_data.js file
stik.boundary({
  as: "$data",
  resolvable: true,
  to: function( $template ){
    var attrs = {}, name;

    for ( attr in $template.attributes ) {
      if ( $template.attributes[ attr ].value ) {
        name = $template.attributes[ attr ].name
        attrs[ parseName( name ) ] =
          $template.attributes[ attr ].value;
      }
    }

    function parseName( name ){
      return name.match(/(data-)(.+)/)[ 2 ];
    }

    return attrs;
  }
});

// and this in your specs/boundaries/stik_params_spec.js
it("should retrieve one attribute from the template", function(){
  var template = document.createElement("div"),
      result;

  template.setAttribute("data-id", "$081209j09urr123");

  result = stik.labs.boundary({
    name: "$data"
  }).run({
    $template: template
  });

  expect(result).toEqual( { id: "$081209j09urr123" } );
});
```
