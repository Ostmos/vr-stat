// Strict range, ex [5, 1, 2] = { start: 1, end: 5 }
function Range( start = 0, end = 0 ) {

    this.start = start;
    this.end = end;

}

function DataTable( jsonData ) {

    this._table = {};
    this.loadJsonArray( jsonData );

}

DataTable.prototype = {

    loadJsonArray: function( jsonData ) {

        if ( jsonData !== undefined ) {

            if ( !Array.isArray( jsonData ) ) {

                console.error( "DataTable: jsonData is not an array of objects!" );

            } else {
                
                this.fillTable( jsonData );

            }

        }

    },

    fillTable: function( jsonData ) {

        jsonData.forEach( row => {

            Object.keys( row ).forEach( column => {

                this.addToColumn( column, row[ column ] );

            });
            
        });

        // Remove objects from one array or the other when they're short on objects?

    },

    hasColumn: function( column ) {

        if ( column !== undefined ) {

            return this._table.hasOwnProperty( column );

        }

        console.error( "DataTable: no column found named: ", column );

        return false;

    },


    addToColumn: function( column, value ) {

        if ( !this._table.hasOwnProperty( column ) ) {

            this._table[ column ] = [];

        }

        this._table[ column ].push( value );

    },

    getColumn: function( column ) {

        if ( this.hasColumn( column ) ) {

            return this._table[ column ];

        }

        return [];

    },

    getRange: function( column ) {
            
        const range = new Range();

        if ( this.hasColumn( column ) ) {

            range.start = Math.min ( ...this._table[ column ] );
            range.end = Math.max( ...this._table[ column ] );

        }

        return range;

    }, 

    // Scales column as much as needed for the max value of the column
    // to become the length. Should have a better name.
    makeScaleFitArray: function( column, length ) {

        if ( this.hasColumn( column ) ) {

            const columnMaxValue = Math.max( ...this._table[ column ] );
            const scale = length / columnMaxValue;
            return this._table[ column ].map( elem => elem * scale );

        } 

        return [];

    }

}

module.exports = {

    DataTable: DataTable

};