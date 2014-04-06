###Controller Lab

```javascript
// this controller might be defined in your star_wars_ctrl.js file
stik.controller("StarWarsCtrl", "Dialog", function($viewBag){
  $viewBag.$push({
    luke: "You killed my father",
    vader: "Luke, I'm your father"
  });
});

// and this in your specs/controllers/star_wars_ctrl_spec.js
it("should push data to the template", function(){
  var template, lab;

  template = "<div data-controller=\"StarWarsCtrl\" data-action=\"Dialog\">" +
    "<span class=\"luke\" data-key=\"luke\"></span>" +
    "<span class=\"vader\" data-key=\"vader\"></span>" +
  "</div>";

  lab = stik.labs.controller({
    name: "StarWarsCtrl",
    action: "Dialog",
    template: template
  });
  lab.run();

  expect(
    lab.template.getElementsByClassName("luke")[0].textContent
  ).toEqual("You killed my father");

  expect(
    lab.template.getElementsByClassName("vader")[0].textContent
  ).toEqual("Luke, I'm your father");
});
```
