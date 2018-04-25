const DataCategorical = require( "../charts/data" ).DataCategorical;
const JSONLoader = require( "../charts/data" ).JSONLoader;
const MediumText = require ( "../charts/sprite-text" ).mediumText;
const DebugCube = require( "../lib/utils" ).DebugCube;
const DataTable = require( "../charts/data-table" ).DataTable;

AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        dimensions: { type: "vec3", default: { x: 5, y: 2, z: 0.5 } },
        ySteps: { type: "number", default: 7 },
        xCol: { type: "string", default: "x" },
        yCol: { type: "string", default: "y" },
        ySuffix: { type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        barWidth: { type: "number", default: 0.2 }
    },
 
    init: function() {

        let data = this.data;
        let self = this;

        // Title
        const Text = MediumText( data.title ).mesh;
        const TextOffset = 0.2;
        Text.position.set( 0, data.dimensions.y / 2 + TextOffset, 0 );
        this.el.setObject3D( "title", Text );

        // Load data
        const Loader = new JSONLoader;
        Loader.loadJSON( this.data.src, jsonData => {

            const dataTable = new DataTable( jsonData ); 
            console.log(dataTable);

            const XCol = Loader.getColumn( jsonData, data.xCol );
            const YCol = Loader.getColumn( jsonData, data.yCol );

            let dataset = new DataCategorical( 
                XCol,
                YCol,
            );

            console.log(dataset);

            const Padding = 0.2;

            // 3D Grid
            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute( "categorical-grid", {

                dimensions: data.dimensions,
                ySteps: data.ySteps,
                yRange: [dataset.range.start, dataset.range.end],
                ySuffix: data.ySuffix,
                xAxisLabel: data.xAxisLabel,
                yAxisLabel: data.yAxisLabel,
                categories: dataset.categories,
                padding: Padding

            } );
            this.el.appendChild( Grid );

            // Bars
            dataset.scaleToLength( data.dimensions.y );
            const Bars = document.createElement( "a-entity" );
            Bars.setAttribute("bars", {
                dimensions: data.dimensions,
                width: data.barWidth,
                dataHeights: dataset.values,
                padding: Padding 
            } ); 
            this.el.appendChild( Bars );


        } );

    },

} );
