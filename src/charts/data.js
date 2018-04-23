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

    this.ranges = {
        x: new Range( Math.min( ...x ), Math.max( ...x ) ),
        y: new Range( Math.min( ...y ), Math.max( ...y ) ),
        z: new Range( Math.min( ...z ), Math.max( ...z ) )
    }

}

Data3.prototype.fitRange = function() {

    this.vectors.x = this.vectors.x.map( elem => elem - this.ranges.x.start ); 
    this.vectors.y = this.vectors.y.map( elem => elem - this.ranges.y.start ); 
    this.vectors.z = this.vectors.z.map( elem => elem - this.ranges.z.start ); 

}

Data3.prototype.scaleToLength = function( dimensions ) {

    Object.keys( this.vectors ).forEach( key => {

            const Ratio = dimensions[key] / this.ranges[ key ].end;
            this.vectors[ key ] = this.vectors[ key ].map( elem => elem * Ratio );

    } );

}

function DataCategorical ( categories, values ) {

    this.categories = categories;
    this.values = values;

    this.range = new Range( 0, Math.max( ...values ) );

}

DataCategorical.prototype.scaleToLength = function( length ) {

    const Ratio = length / this.range.end;
    this.values = this.values.map( elem => elem * Ratio );

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
    DataCategorical: DataCategorical,
    Range: Range

};