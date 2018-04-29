const JSONLoader = require( "../data/data-loader" ).JSONLoader;
const DataTable = require( "../data/data-table" ).DataTable;
const Range = require( "../data/data-table" ).Range;
const MediumText = require ( "../text/sprite-text" ).mediumText;

AFRAME.registerComponent( "line-chart", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 2, y: 1, z: 1 } },
        lines: { type: "array" },
        lineLabels: { type: "array" },
        time: { type: "string" },
        nbrOfHeightSteps: {type: "number", default: 7},
        heightsSuffix: {type: "string" },
    },
 
    init: function() {

        new JSONLoader().loadJSON( this.data.src, jsonData => {

            const table = new DataTable( jsonData );

            this.makeGrid( table );
            this.makeLines( table );

        } );

    },

    makeTitle: function() {

        // Title
        const Text = MediumText( this.data.title ).mesh;
        const TextOffset = 0.2;
        Text.position.set( 0, this.data.size.y / 2 + TextOffset, 0 );
        this.el.setObject3D( "title", Text );

    },

    makeGrid: function( table ) {

        const allLinesRange = new Range();
        for ( let i = 0; i < this.data.lines.length; i++ ) {

            const heightRange = table.getRange( this.data.lines[i] );

            if ( heightRange.start < allLinesRange.start ) {

                allLinesRange.start = heightRange.start;

            } 
            if ( heightRange.end > allLinesRange.end ) {

                allLinesRange.end = heightRange.end;

            }

        }

        const times = table.getColumn( this.data.time );
        // 3D Grid
        this.el.setAttribute( "categorical-grid", {
            size: this.data.size,
            nbrOfHeightSteps: this.data.nbrOfHeightSteps,
            heightRange: [ allLinesRange.start, allLinesRange.end ],
            heightsSuffix: this.data.heightsSuffix,
            xAxisLabel: this.data.xAxisLabel,
            yAxisLabel: this.data.yAxisLabel,
            categories: times,
        } );


    },

    makeLines: function( table ) {

        // Lines
        const scaledLines = [];
        for ( let i = 0; i < this.data.lines.length; i++ ) {

            const scaledLine = table.makeScaleFitArray( this.data.lines[ i ], this.data.size.y );
            scaledLines.push( scaledLine );

        } 
        this.el.setAttribute("lines", {
            dimensions: this.data.size,
            heights: scaledLines,
            labels: this.data.lineLabels
        } ); 

    }

} );