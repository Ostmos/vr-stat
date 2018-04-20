// Fetch JSON file
export function loadJSON( url, callback ) {

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

// Get column from an array of objects
export function getColumn( jsonData, attribute ) {

    if ( Array.isArray( jsonData ) && typeof attribute === "string" ) {

        let result = [];
        jsonData.forEach( obj => {

            Object.keys( obj ).forEach( key => {

                if ( key === attribute ) {

                    result.push( obj[ key ] );

                }

            } );

        } );
        
        return result;

    }

}

