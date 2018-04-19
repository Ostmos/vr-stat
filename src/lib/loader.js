export function loadJSON( url ) {

    fetch( url )
    .then( function( response ) {

        // response.ok is true if the request was successful (2xx)
        // we check this becuase client(4xx) and server(5xx) errors  
        // are not treated as errors by fetch()
        if ( response.ok ) return response.json();

        throw Error( "Error: " + response.statusText );

    } )  
    .then( jsonData => {

        let tableData = {

            getColumnData: function( column ) {

                

            },

            getRowData: function( row ) {

                            

            }

        };

    } );

}
