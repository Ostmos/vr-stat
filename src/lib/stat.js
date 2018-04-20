export function range( arr, min, max ) {

    let arrInRange = arr.filter( ( elem ) => {

        return elem >= min && elem <= max;

    } );

    return arrInRange;

}

export function startOnZero( arr ) {

    let result = range( arr, 0, ...arr );
    return result;

}

export function interpolate( arr, steps ) {

    const MIN = Math.min( ...arr );
    const MAX = Math.max( ...arr );
    const STEP = (MAX - MIN) / steps;

    let interpolatedArray = [];
    for (let i = 0; i < steps + 1; i++ ) {
        interpolatedArray.push( MIN + STEP * i );
    }
    return interpolatedArray;

}

export function stepArray( steps, stepLength ) {

    let arr = [];
    for ( let i = 0; i < steps * stepLength; i += stepLength ) {
        arr.push( i );
    }
    return arr;

}

export function offset( arr, off ) {

    let offsetArr = arr.map( elem => elem + off );
    return offsetArr;

}

export function scaleFit( arr, scale ) {

    const MIN = Math.min( ...arr ); 
    const MAX = Math.max( ...arr ); 
    const RATIO = scale / (MAX - MIN);
    let scaledArray = arr.map( elem => elem * RATIO );
    return scaledArray;

}

export function sortNumeric( arr ) {

    arr.sort( ( i, j ) => ( i - j ));

}

export function decimalPrecision( arr, precision ) {

    let precisionArray = arr.map( elem => elem.toFixed(precision) );
    return precisionArray;

}

export function suffix ( arr, s ) {

    let suffixArray = [];
    suffixArray = arr.map( elem => elem.concat( s ) );
    return suffixArray;

}

export function numericalToString( arr, precission, suffix ) {

    let result = decimalPrecision( arr, precission);

    if ( suffix ) {

        result = suffix( result, suffix);

    }

    return result;

} 

export function longestString( arr ) {

    let arrCopy = arr.slice();
    let sortedArr = arrCopy.sort ( ( str1, str2 ) => {
        return str1.length < str2.length;
    } );
    return sortedArr[0].length;

}

// Linear interpolation
// Categorical values: stepArray => scaleFit 
// Numerical values: interpolate => scaleFit
export function statTypeScaledLinearInterpolation( values, steps, type, fitLength ) {

    let result = [];
    if ( type === "numerical" ) {

        result = interpolate( values, steps );

    } else if ( type === "categorical") {

        const Length = values.length;
        const StepLength = Length / steps; 
        result = stepArray( Length, StepLength );
        result = offset( result, fitLength / steps / 2);

    } else {

        throw Error( type + " not supported as a data type for stat" );

    }

    result = scaleFit( result, fitLength );
    return result;

} 