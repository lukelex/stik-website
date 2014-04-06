stik.boundary({
  as: 'httpGet',
  from: 'controller',
  to: function httpGet(url, whenDone) {
    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200){
        whenDone(request.responseText);
      }
    }

    request.open( "GET", url, true );
    request.send( null );
  }
});

stik.boundary({
  as: 'fuzzy',
  from: 'controller',
  to: {
    search: function(pattern, names){
      var found = window.fuzzySearch.findPatterns(pattern, names),
          i = found.length,
          filteredNames = [];

      while (i--) {
        filteredNames.push(found[i].name);
      }

      return filteredNames;
    }
  }
});

stik.controller('DocsCtrl', function(ctrl){
  ctrl.action('Search', function($template, $h, fuzzy){
    var searchField = $template.querySelector('input');
    var docMethods = $template.querySelectorAll('.method a');
    var methodNames = [];
    var i = docMethods.length;

    while (i--) {
      methodNames.push(docMethods[i].textContent);
    }

    function toggleMethods(filteredNames){
      var k = docMethods.length,
          currentItem;

      while (k--) {
        currentName = docMethods[k].textContent;
        if (filteredNames.indexOf(currentName) === -1) {
          $h.hideElm(docMethods[k].parentNode);
        } else {
          $h.showElm(docMethods[k].parentNode);
        }
      }
    }

    searchField.onkeyup = function(){
      results = fuzzy.search(searchField.value, methodNames);
      toggleMethods(results);
    };
  });

  ctrl.action('ViewPage', function($template, $courier, httpGet){
    $courier.$receive('smooth-load', function(url){
      httpGet(url + '?partial=true', function(data){
        $template.innerHTML = data;
      });
    });
  });
});

stik.behavior('smooth-link', function($template, $h, $courier){
  $template.onclick = function(event){
    event.preventDefault();
    if (!$h.hasClass($template, 'active')) {
      $h.addClass($template, 'active');
      $courier.$send('smooth-load', $template.href);
    }
  };
});

stik.behavior('active-by-base-url', function($template, $h, urlState){
  var link = $template.href ? $template : $template.querySelector("a")
  if (link.href === urlState.baseUrl()) {
    $h.addClass($template, 'active');
  }
});

stik.behavior('active-by-hash', function($template, $h, urlState){
  var link = $template.href ? $template : $template.querySelector("a")
  if (link.href === urlState.baseUrl()) {
    $h.addClass($template, 'active');
  }
});
