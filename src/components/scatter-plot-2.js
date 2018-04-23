const Data3 = require( "../charts/data" ).Data3;
const JSONLoader = require( "../charts/data" ).JSONLoader;

AFRAME.registerComponent( "scatter-plot-2", {

    schema: {
        src: { type: "asset" },
        dimensions: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
        steps: { type: "vec3", default: { x: 7, y: 7, z: 7 } },
        xCol: { type: "string", default: "x" },
        yCol: { type: "string", default: "y" },
        zCol: { type: "string", default: "z" }
    },
 
    init: function() {

        let data = this.data;
        let self = this;

        const Loader = new JSONLoader;
        Loader.loadJSON( this.data.src, jsonData => {

            const XCol = Loader.getColumn( jsonData, data.xCol );
            const YCol = Loader.getColumn( jsonData, data.yCol );
            const ZCol = Loader.getColumn( jsonData, data.zCol );

            console.log(XCol);

            let dataset = new Data3( 
                XCol,
                YCol,
                ZCol
            );

            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute("numerical-grid", {

                dimensions: data.dimensions,
                steps: data.steps,
                xRange: [dataset.xRange.start, dataset.xRange.end],
                yRange: [dataset.yRange.start, dataset.yRange.end],
                zRange: [dataset.zRange.start, dataset.zRange.end],
                xSuffix: "",
                ySuffix: "",
                zSuffix: "",

            });
            this.el.appendChild( Grid );
        
            const PointCloud = document.createElement( "a-entity" );
            PointCloud.setAttribute( "point-cloud", {
                
                dimensions: data.dimensions ,
                points: { x: [ 0.5 ], y: [ 0.5 ] , z: [ 0.5 ] }

            } );
            this.el.appendChild( PointCloud );

        } );

        /*
        range [0, 5] get from [min(x), max(x)]
        Scales against dimensions afterwards
        -offset => scalefit
        */

    },

} );