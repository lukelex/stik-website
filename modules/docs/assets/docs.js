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
