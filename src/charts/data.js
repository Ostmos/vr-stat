function Range( start, end ) {

    this.start = start;
    this.end = end;

}

Range.prototype.evenStepLength = function( steps ) {

    return ( this.end - this.start ) / ( steps - 1 );

}

// Use vector instead?
function XYZDataSet( x, y, z ) {

   this.x = x; 
   this.y = y;
   this.z = z; 

}

module.exports = {

    Range: Range,
    XYZDataSet: XYZDataSet

}