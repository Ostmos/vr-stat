const assert = require( "chai" ).assert; 
const chai = require( "chai" );
const DataTable = require( "../src/charts/data-table" ).DataTable;

// TODO, test console.error
describe( "DataTable", function() {

    describe( "DataTable.DataTable", function() {

        it ( "Should load json array into table", function() {

            const jsonArray = [ { x: 1, y: 4 } ];
            const table = new DataTable( jsonArray );

            assert.isNotEmpty( table._table );

        } );

        it ( "Should not load json object into table", function() {

            const jsonObject = { x: 0, y: 0 };
            const table = new DataTable( jsonObject );

            assert.isEmpty( table._table );

        } );

    } );

    describe( "DataTable.fillTable", function() {

        it( "Should push elements to each table column from a json array" , function() {
            
            const table = new DataTable( );
            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 }, { x: 3, y: 6 } ];
            table.fillTable( jsonData );

            assert.deepEqual( table._table, { x: [ 1, 2, 3 ], y: [ 4, 5, 6 ]  } );

        } );

    } );

    describe( "DataTable.hasColumn", function() {

        it( "Should return true since column exists", function() {

            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 } ];
            const table = new DataTable( jsonData );
            const exists = table.hasColumn( "x" );

            assert( exists );

        } );

        it( "Should return false since column does not exist", function() {

            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 } ];
            const table = new DataTable( jsonData );
            const exists = table.hasColumn( "z" );

            assert( !exists );

        } );

    } );

    describe( "DataTable.getColumn", function() {

        it( "Should return column", function() {

            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 } ];
            const table = new DataTable( jsonData );
            const column = table.getColumn( "x" );

            assert.sameOrderedMembers( column, [ 1, 2 ] );

        } );

    } );

    describe( "DataTable.addToColumn", function() {

        it( "Should add element to specified column" , function() {
            
            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 } ];
            const table = new DataTable( jsonData );
            table.addToColumn( "x", 10 );

            assert.deepEqual( table._table, { x: [ 1, 2, 10 ], y: [ 4, 5 ]  } );

        } );

    } );

    describe( "DataTable.getColumn", function() {

        it( "Should return column", function() {

            const jsonData = [ { x: 1, y: 4 }, { x: 2, y: 5 } ];
            const table = new DataTable( jsonData );
            const column = table.getColumn( "x" );

            assert.sameOrderedMembers( column, [ 1, 2 ] );

        } );

    } );

    describe( "DataTable.getRange", function() {

        it( "Should return the column range, i.e. the max and min value of the column array", function() {

            const jsonData = [ { x: 6 }, { x: 2 }, { x: 10 }, { x: 3 } ];
            const table = new DataTable( jsonData );
            const range = table.getRange( "x" );

            assert.sameOrderedMembers( [ range.start, range.end] , [ 2, 10 ] );

        } );

    } );

    describe( "DataTable.scaleFit", function() {

        it( "Should return an array of a column with the max value length", function() {

            const jsonData = [ { x: 2 }, { x: 10 } ];
            const table = new DataTable( jsonData );
            const scaledArray = table.makeScaleFitArray( "x", 5 );

            assert.sameOrderedMembers( scaledArray , [ 1, 5 ] );

        } );

    } );

} );