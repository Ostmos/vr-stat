function Range( start, end ) {

    this.start = start;
    this.end = end;

}

Range.prototype.evenStepLength = function( steps ) {

    return ( this.end - this.start ) / ( steps - 1 );

}

function Data3 ( x, y, z ) {

    this.vectors = {
        x: x,
        y: y,
        z: z
    }

    this.xRange = new Range( Math.min( ...x ), Math.max( ...x ) );
    this.yRange = new Range( Math.min( ...y ), Math.max( ...y ) );
    this.zRange = new Range( Math.min( ...z ), Math.max( ...z ) );

}

Data3.prototype.scale = function( scale ) {

    Object.keys( this.vectors ).forEach( key => {

        this.vectors[ key ].map( elem => elem * scale ); 

    } );

}

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

// Get a column from a json file with a table like structure
JSONLoader.prototype.getColumn = function( jsonData, attribute ) {

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

module.exports = {
 
    JSONLoader: JSONLoader,
    Data3: Data3,
    Range: Range

};