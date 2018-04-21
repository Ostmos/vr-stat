// Module with some helpful methods for arrays with statistical data

var stat = {

    // Wrapper methods. We should be use chaining. 

    sortedLabels: function( arr, precision, suffix ) {

        let result = arr.slice();
        this.numericSort( result );
        result = this.precisionStringArray( result, precision );
        result = this.suffixArray( result, suffix );
        return result;

    },    

    scaledArray: function( arr, scaleLength, length ) {

        const Max = Math.max( ...arr );
        const Min = Math.min( ...arr ); 
        let result = this.evenlySpacedArray( Min, Max, length );
        result = this.scaleToLength( result, scaleLength );
        return result;

    },

    scaledCategoricalArray: function( arr, scaleLength, offset ) {

        const Length = arr.length;
        let result = this.evenlySpacedArray( offset, scaleLength, Length ); 
        return result;

    },

    // Array methods
    
    evenlySpacedArray: function( min, max, spaces ) {

        const StepLength = ( max - min ) / ( spaces - 1 ); 
        let result = [];
        for( let i = 0; i < spaces; i++ ) {

            result.push( min + StepLength * i );

        }
        return result;

    },

    scaleToLength: function( arr, length ) {

        const Max = Math.max( ...arr ); 
        const RATIO = length / Max;
        let scaledArray = arr.map( elem => elem * RATIO );
        return scaledArray;

    },

    numericSort: function( arr ) {

        arr.sort( ( i, j ) => ( i - j ));

    },

    rangedArray: function( arr, min, max ) {

        let arrInRange = arr.filter( ( elem ) => {

            return elem >= min && elem <= max;

        } );
        return arrInRange;

    },

    convertToStringArray: function( arr ) {

        return arr.map(String);

    }, 

    suffixArray: function( arr, suffix ) {

        suffixArray = arr.map( elem => elem.concat( suffix ) );
        return suffixArray;

    },

    longestString: function( arr ) {

        let arrCopy = arr.slice();
        let sortedArr = arrCopy.sort ( ( str1, str2 ) => {
            return str1.length < str2.length;
        } );
        return sortedArr[0].length;

    },

    precisionStringArray: function ( arr, precision ) {

        let precisionArray = arr.map( elem => elem.toFixed( precision ) );
        return precisionArray;

    }

};

module.exports = stat;