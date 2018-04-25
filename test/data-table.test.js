const Assert = require( "chai" ).assert; 
const Chai = require( "chai" );
const dataTable = require( "../src/charts/data-table" ).DataTable;

describe( "stat", function() {

    describe( "stat.evenlySpacedArray", function() {

        it( "Should create evenly spaced array between 0 and 2 in 5 steps", function() {

            const Result = stat.evenlySpacedArray( 0, 2, 5 );
            Assert.sameOrderedMembers( Result, [ 0, 0.5, 1.0, 1.5, 2 ] );            

        } );

        it( "Should create evenly spaced array between 1 and 3 in 2 steps", function() {

            const Result = stat.evenlySpacedArray( 1, 3, 2 );
            Assert.sameOrderedMembers( Result, [ 1, 3 ] );

        } );

        it( "Should create evenly spaced array between -3 and 3 in 5 steps", function() {

            const Result = stat.evenlySpacedArray( -3, 3, 5 );
            Assert.sameOrderedMembers( Result, [ -3, -1.5, 0, 1.5, 3 ] );

        } );

        it ( "Should create evenly spaced array between -3 and 3 in 4 steps", function() {

            const Result = stat.evenlySpacedArray( -3, 3, 4 );
            Assert.sameOrderedMembers( Result, [ -3, -1, 1, 3 ] );

        } );

    } );

    describe( "stat.scaleToLength", function() {

        it( "Should scale all array elements so the max value is 50" , function() {
            
            const Result = stat.scaleToLength( [ 1, 2, 3, 4, 5 ], 50 );
            Assert.sameOrderedMembers( Result, [ 10, 20, 30, 40, 50 ]);

        } );

        it( "Should scale all array elements so the max value is 2" , function() {
            
            const Result = stat.scaleToLength( [ 1, 2, 3, 4 ], 2 );
            Assert.sameOrderedMembers( Result, [ 0.5, 1, 1.5, 2 ] );

        } );

    } );

    describe( "stat.numericSort", function() {

        it( "Should sort array elements", function() {

            let arr = [ 5, 0, 3, 20, 1 ]; 
            stat.numericSort( arr );
            Assert.sameOrderedMembers( arr, [ 0, 1, 3, 5, 20 ] );

        } );

    } );

    describe( "stat.convertToStringArray", function() {

        it( "Should convert array with numbers to array with strings", function() {

            const Result = stat.convertToStringArray( [ 4, 1, 2 ] );
            Assert.sameDeepOrderedMembers( Result, [ "4", "1", "2" ] );

        } );

    } );

    describe( "stat.suffixArray", function() {

        it( "Should add suffix to array", function() {

            const Result = stat.suffixArray( ["5", "1", "2"], "%" );
            Assert.sameOrderedMembers( Result, [ "5%", "1%", "2%" ] );

        } );

    } ) 

    describe( "stat.longestString", function() {

        it( "Should return the length of the longest string in an array", function() {

            const Result = stat.longestString( ["abc", "ab", "abcd", "a"] );
            Assert.strictEqual( Result, 4 );

        } );

    } );

    describe( "stat.longestString", function() {

        it( "Should convert numerical array to string array with some precision ", function() {

            const Result = stat.precisionStringArray( [1.01912, 2.0, 3, 5.12], 2 );
            Assert.sameOrderedMembers( Result, [ "1.02", "2.00", "3.00", "5.12" ] );

        } );

    } );

    describe( "stat.rangedArray", function() {

        it( "Should remove elements not in range [1, 6] (inclusive) from array" , function() {

            const Result = stat.rangedArray( [ 10, 3, 20, 6, -10, 1 ], 1, 6 );
            Assert.sameOrderedMembers( Result, [ 3, 6, 1 ] );

        } );

    } );

    describe( "stat.sortedLabels", function() {

        it( "Should sort => add precision => add suffix on array", function() {

            const Result = stat.sortedLabels( [ 5.001, 3.2, 0, 100 ], 2, "m" );
            Assert.sameOrderedMembers( Result, [ "0.00m", "3.20m", "5.00m", "100.00m" ] ); 

        } );

    } );

    describe( "stat.scaledArray", function() {

        it( "Should evenly distribute points in an array and scale them to fit a length", function() {

            const Result = stat.scaledArray( [ 1, 0, 2 ], 2, 5 );
            // 0, 0.5, 1, 1.5, 2 => 0, 0.25, 0.5, 0.75, 1
            Assert.sameOrderedMembers( Result, [ 0, 0.5, 1, 1.5, 2 ] ); 

        } );

    } );

    describe( "stat.scaledCategoricalArray", function() {

        it( "Should create dummy numerical array from categorical array and scale them to fit a length", function() {

            const Result = stat.scaledCategoricalArray( [ "l1", "l2", "l3", "l4", "l5" ], 2, 1 );
            // "l1", "l2", "l3", "l4", "l5" => 1, 1.25, 1.5, 1.75, 2 
            Assert.sameOrderedMembers( Result, [ 1, 1.25, 1.5, 1.75, 2 ] ); 

        } );

    } );

} );