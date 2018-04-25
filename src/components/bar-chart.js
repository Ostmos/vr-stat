const DataCategorical = require( "../charts/data" ).DataCategorical;
const JSONLoader = require( "../charts/data" ).JSONLoader;
const DebugCube = require( "../lib/utils" ).DebugCube;
const DataTable = require( "../charts/data-table" ).DataTable;
const mediumText = require ( "../charts/sprite-text" ).mediumText;

AFRAME.registerComponent( "bar-chart", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 5, y: 2, z: 0.5 } },
        categories: { type: "string", default: "x" },
        heights: { type: "string", default: "y" },
        nbrOfHeightSteps: { type: "number", default: 7 },
        heightsSuffix: { type: "string" },
        barWidth: { type: "number", default: 0.2 }
    },
 
    init: function() {

        let data = this.data;

        // Title
        const title = mediumText( data.title ).mesh;
        const titleHeightOffset = 0.2;
        const titleHeight = data.size.y / 2 + titleHeightOffset;
        title.position.set( 0, titleHeight, 0 );
        this.el.setObject3D( "title", title );

        // Load data
        new JSONLoader().loadJSON( this.data.src, jsonData => {

            // Data table
            const table = new DataTable( jsonData ); 
            const heightsRange = table.getRange( data.heights );
            const axisToBarsPadding = 0.1;

            // 3D categorical grid
            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute( "categorical-grid", {
                size: data.size,
                categories: table.getColumn( data.categories ),
                heightRange: [ heightsRange.start, heightsRange.end ],
                nbrOfHeightSteps: data.nbrOfheightSteps,
                heightsSuffix: data.heightsSuffix,
                xAxisLabel: data.xAxisLabel,
                yAxisLabel: data.yAxisLabel,
                padding: axisToBarsPadding
            } );
            this.el.appendChild( Grid );

            // Bars
            const scaledHeights = table.makeScaleFitArray( data.heights, data.size.y );
            const Bars = document.createElement( "a-entity" );
            Bars.setAttribute("bars", {
                size: data.size,
                barWidth: data.barWidth,
                heights: scaledHeights,
                outSidePadding: axisToBarsPadding 
            } ); 
            this.el.appendChild( Bars );

        } );

    },

} );
