function JSONLoader( ) {}

// Fetch JSON file
JSONLoader.prototype.loadJSON = function( url, callback ) {

    fetch( url )
    .then( function( response ) {

        // response.ok is true if the request was successful (2xx)
        // we check this becuase client(4xx) and server(5xx) errors  
        // are not treated as errors by fetch()
        if ( response.ok ) return response.json();

        throw Error( "Error: " + response.statusText );

    } )  
    .then( jsonData => callback( jsonData ) );

}

module.exports = {
 
    JSONLoader: JSONLoader

};