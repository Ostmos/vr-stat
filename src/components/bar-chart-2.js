const DataCategorical = require( "../charts/data" ).DataCategorical;
const JSONLoader = require( "../charts/data" ).JSONLoader;
const MediumText = require ( "../charts/sprite-text" ).mediumText;

AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        dimensions: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
        ySteps: { type: "number", default: 7 },
        xCol: { type: "string", default: "x" },
        yCol: { type: "string", default: "y" },
        ySuffix: { type: "string" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
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

            const XCol = Loader.getColumn( jsonData, data.xCol );
            const YCol = Loader.getColumn( jsonData, data.yCol );

            let dataset = new DataCategorical( 
                XCol,
                YCol,
            );

            // 3D Grid
            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute("categorical-grid", {

                dimensions: data.dimensions,
                ySteps: data.ySteps,
                yRange: [dataset.range.start, dataset.range.end],
                ySuffix: data.ySuffix,
                xAxisLabel: data.xAxisLabel,
                yAxisLabel: data.yAxisLabel,

            });
            this.el.appendChild( Grid );
        } );

    },

} );
