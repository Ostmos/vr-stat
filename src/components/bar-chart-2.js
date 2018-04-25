const DataCategorical = require( "../charts/data" ).DataCategorical;
const JSONLoader = require( "../charts/data" ).JSONLoader;
const MediumText = require ( "../charts/sprite-text" ).mediumText;
const DebugCube = require( "../lib/utils" ).DebugCube;
const DataTable = require( "../charts/data-table" ).DataTable;

AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        size: { type: "vec3", default: { x: 5, y: 2, z: 0.5 } },
        categories: { type: "string", default: "x" },
        heights: { type: "string", default: "y" },
        nbrOfheightsSteps: { type: "number", default: 7 },
        heightsSuffix: { type: "string" },
        barWidth: { type: "number", default: 0.2 }
    },
 
    init: function() {

        let data = this.data;
        let self = this;

        // Title
        const title = MediumText( data.title ).mesh;
        const titleHeightOffset = 0.2;
        const titleHeight = data.size.y / 2 + titleHeightOffset;
        title.position.set( 0, titleHeight, 0 );
        this.el.setObject3D( "title", title );

        // Load data
        new JSONLoader().loadJSON( this.data.src, jsonData => {

            const table = new DataTable( jsonData ); 
            const heightsRange = table.getRange( data.heights );
            const padding = 0.1;

            // 3D Grid
            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute( "categorical-grid", {

                dimensions: data.size,
                ySteps: data.nbrOfheightsSteps,
                yRange: [ heightsRange.start, heightsRange.end ],
                ySuffix: data.heightsSuffix,
                xAxisLabel: data.xAxisLabel,
                yAxisLabel: data.yAxisLabel,
                categories: table.getColumn( data.categories ),
                padding: padding

            } );
            this.el.appendChild( Grid );

            // Bars
            const scaledHeights = table.makeScaleFitArray( data.heights, data.size.y );
            const Bars = document.createElement( "a-entity" );
            Bars.setAttribute("bars", {
                dimensions: data.size,
                width: data.barWidth,
                dataHeights: scaledHeights,
                padding: padding 
            } ); 
            this.el.appendChild( Bars );

        } );

    },

} );
