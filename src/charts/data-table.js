// Strict range, ex [5, 1, 2] = { start: 1, end: 5 }
function Range( start = 0, end = 0 ) {

    this.start = start;
    this.end = end;

}

function DataTable( jsonData ) {

    this.table = {};
    this.loadJson( jsonData );

}

DataTable.prototype = {

    loadJson: function( jsonData ) {

        if ( jsonData !== undefined ) {

            if ( !Array.isArray( jsonData ) ) {

                console.error( "DataSet: jsonData is not an array of objects!" );

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

    addToColumn: function( column, value ) {

        if ( !this.table.hasOwnProperty( column ) ) {

            this.table[ column ] = [];

        }

        this.table[ column ].push( value );

    },

    getRange: function( column ) {
            
        const range = new Range();

        if ( this.hasColumn( column ) ) {

            range.start = Math.max( ...this.table[ column ] );
            range.end = Math.min ( ...this.table[ column ] );

        }

        return range;

    }, 

    hasColumn: function( column ) {

        if ( column !== undefined ) {

            return this.table.hasOwnProperty( column );

        }

        return false;

    },

    scaleColumnToLength: function( column, value ) {

         

    }

}

module.exports = {

    DataTable: DataTable

};