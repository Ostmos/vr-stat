const StatJson = {

    // Fetch JSON file
    loadJSON: function( url, callback ) {

        fetch( url )
        .then( function( response ) {

            // response.ok is true if the request was successful (2xx)
            // we check this becuase client(4xx) and server(5xx) errors  
            // are not treated as errors by fetch()
            if ( response.ok ) return response.json();

            throw Error( "Error: " + response.statusText );

        } )  
        .then( jsonData => callback( jsonData ) );

    },

    // Get a column from a json file with a table like structure
    getColumn: function( jsonData, attribute ) {

        if ( jsonData != null && typeof attribute === "string" ) {

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


}

module.exports = StatJson;
