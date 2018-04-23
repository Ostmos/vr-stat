const TimeSeries = require( "../charts/data" ).TimeSeries;
const JSONLoader = require( "../charts/data" ).JSONLoader;
const MediumText = require ( "../charts/sprite-text" ).mediumText;

AFRAME.registerComponent( "line-chart", {

    schema: {
        src: { type: "asset" },
        title: {type: "string" },
        dimensions: { type: "vec3", default: { x: 4, y: 2, z: 1 } },
        lineColumns: { type: "array" },
        timeColumn: { type: "string" },
        lineLabels: { type: "array" },
        xAxisLabel: { type: "string" },
        yAxisLabel: { type: "string" },
        ySteps: {type: "number", default: 7},
        lineSeperation: { type: "number", default: 0.5 }
    },
 
    init: function() {

        let data = this.data;
        let self = this;

        // Title
        const Text = MediumText( data.title ).mesh;
        const TextOffset = 0.2;
        Text.position.set( 0, data.dimensions.y / 2 + TextOffset, 0 );
        this.el.setObject3D( "title", Text );

        const Loader = new JSONLoader;
        Loader.loadJSON( this.data.src, jsonData => {

            let dataSet = new TimeSeries( Loader.getColumn( jsonData, data.timeColumn ) );

            for ( let i = 0; i < data.lineColumns.length; i++ ) {

                dataSet.add(Loader.getColumn( jsonData, data.lineColumns[ i ] ) );

            }

            // 3D Grid
            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute( "categorical-grid", {

                dimensions: data.dimensions,
                ySteps: data.ySteps,
                yRange: [dataSet.range.start, dataSet.range.end],
                ySuffix: data.ySuffix,
                xAxisLabel: data.xAxisLabel,
                yAxisLabel: data.yAxisLabel,
                categories: dataSet.time,

            } );
            this.el.appendChild( Grid );

        } );

    },

} );