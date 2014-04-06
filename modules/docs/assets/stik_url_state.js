window.stik.boundary({
  as: 'urlState',
  to: {
    baseUrl: function(){
      return window.location.href;
    },
    relativeUrl: function(){
      return this.baseUrl().match(/http:\/\/.+?(\/.+$)/)[1];
    },
    pathName: function(){
      return window.location.pathname;
    },
    hash: function( newHashValue ){
      return this.locationHash( newHashValue ).replace( /^#/, '' );
    },
    locationHash: function( newHashValue ){
      if ( newHashValue ) {
        window.location.hash = newHashValue;
      }
      return location.hash;
    },
    mainPath: function() {
      return '/' + this.pathName().split( '/' )[ 1 ];
    },
    queries: function(){
      var result, queries, query;

      queries = this.baseUrl().split( '?' )[ 1 ];

      if ( queries ) {
        queries = queries.split( '&' );
        result = {};
        for ( var i = 0; i < queries.length; i++ ) {
          query = queries[ i ].split( '=' );
          result[ query[ 0 ] ] = query[ 1 ];
        }
        return result;
      } else {
        return {};
      }
    }
  }
});
