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

        console.log( "DataTable: no column found named: ", column );

        return false;

    },

    hasColumns: function( columns ) {

        if ( columns === undefined || !Array.isArray( columns ) ) { return false; }

        columns.forEach( column => {

            if ( !this.hasColumn( column ) ) { return false; }

        } );

        return true;

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

            let columnMaxValue = Math.max( ...this._table[ column ] );
            if ( columnMaxValue <= 0 ) {

                columnMaxValue = 0.0001;
            
            }                 
            const scale = length / columnMaxValue;

            return this._table[ column ].map( elem => elem * scale );

        } 

        return [];

    },

    makeScaleFitMatrix: function( columns, length ) {

        if ( !this.hasColumns( columns ) || length === undefined ) { return; }

        let matrixMax = 0;

        for ( let i = 0; i < columns.length; i ++ ) {

            let columnArray = this.getColumn( columns[ i ] );
            let columnMax = Math.max( ...columnArray );

            if ( columnMax > matrixMax ) {

                matrixMax = columnMax;

            }

        } 

        if ( matrixMax <= 0 ) {
        
            matrixMax = 0.0001;
        
        }
        const scale = length / matrixMax;

        let resultMatrix = [];

        for ( let i = 0; i < columns.length; i ++ ) {

            resultMatrix[ i ] = this._table[ columns[ i ] ].map( elem => elem * scale );

        }

        return resultMatrix;

    }, 

    // Floors whole array to the min value of the range
    floorToMinValue: function( column ) {

        if ( this.hasColumn( column ) ) {

            const range = this.getRange( column );
            
            this._table[ column ] = this._table[ column ].map( elem => elem - range.start );

        }

    }

}


module.exports = {

    DataTable: DataTable,
    Range: Range

};