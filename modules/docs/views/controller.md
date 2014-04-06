##Controllers
With Stik.js you can define in your HTML which templates should be bound to a specific controller and action.

###Single Actions
While declaring single controller actions you can pass in three arguments:

* `ControllerName` (String) -> Could be either the name of the page or the section in which the template will reside;
* `ActionName` (String) -> The component name. Usually maps to the component's responsibility;
* `ExecutionUnit` (Function) -> The script where your component data interactions shall live;

```javascript
stik.controller("CharactesCtrl", "List", function($template){
  var supported, character;

  character = $template.getElementsByClassName('character');

  function clickHandler(event){
    supported = event.target.getAttribute('hero');
    alert("I'll support " + supported + "!!");
  };

  for (var i = 0; i < character.length; i++) {
    character[i].addEventListener('click', clickHandler);
  };
});
```

```html
<div id="characters-list" data-controller="CharactesCtrl" data-action="List">
  <h3>Sub Characters</h3>
  <ul>
    <li class="character" hero="Mario">Luigi</li>
    <li class="character" hero="Link">Zelda</li>
    <li class="character" hero="Samus">Baby Metroid</li>
  </ul>
</div>
```

You can even have multiple templates using the same controller and action.

```html
<div id="heroes-list" data-controller="BattleCtrl" data-action="List">
  <ul>
    <li>Mario</li>
    <li>Samus</li>
    <li>Link</li>
  </ul>
</div>

<div id="villains-list" data-controller="BattleCtrl" data-action="List">
  <ul>
    <li>Bowser</li>
    <li>Metroid</li>
    <li>Ganondorf</li>
  </ul>
</div>
```

```javascript
stik.controller("BattleCtrl", "List", function($template){
  var heroes = $template.getElementsByClassName('hero');

  function clickHandler(event){
    alert("It's me, " + event.target.textContent + "!! And I'm ready to fight!");
  };

  for (var i = 0; i < heroes.length; i++) {
    heroes[i].addEventListener('click', clickHandler);
  };
});
```

###Multiple actions per Controller
If you want to split responsibilities and compose your controller with multiple actions (and you should), you can declare multiple actions inside the same controller definition.

```javascript
stik.controller("MailCtrl", function(ctrl){
  ctrl.action("Sender", function($template, $courier){
    var mailInput, mailButton;

    mailInput = $template.getElementsByClassName("mail-input")[0];
    mailButton = $template.getElementsByClassName("mail-button")[0];

    mailButton.addEventListener("click", function(){
      $courier.$send("new-mail", mailInput.value);
      mailInput.value = "";
    });
  });

  ctrl.action("Receiver", function($courier, $viewBag){
    $courier.$receive("new-mail", function(message){
      $viewBag.$push({newMsg: message});
    });
  });
});
```
