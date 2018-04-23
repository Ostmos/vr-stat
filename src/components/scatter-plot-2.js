const Data3 = require( "../charts/data" ).Data3;
const JSONLoader = require( "../charts/data" ).JSONLoader;

AFRAME.registerComponent( "scatter-plot-2", {

    schema: {
        src: { type: "asset" },
        dimensions: { type: "vec3", default: { x: 2, y: 2, z: 2 } },
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

            let dataset = new Data3( 
                XCol,
                YCol,
                ZCol
            );

            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute("numerical-grid", {

                dimensions: data.dimensions,
                steps: data.steps,
                xRange: [dataset.ranges.x.start, dataset.ranges.x.end],
                yRange: [dataset.ranges.y.start, dataset.ranges.y.end],
                zRange: [dataset.ranges.z.start, dataset.ranges.z.end],
                xSuffix: "",
                ySuffix: "",
                zSuffix: "",

            });
            this.el.appendChild( Grid );

            dataset.fitRange();
            dataset.scaleToLength( data.dimensions );
        
            const PointCloud = document.createElement( "a-entity" );
            PointCloud.setAttribute( "point-cloud", {
                
                dimensions: data.dimensions ,
                points: { 
                    x: dataset.vectors.x, 
                    y: dataset.vectors.y,
                    z: dataset.vectors.z 
                }

            } );
            this.el.appendChild( PointCloud );

        } );

    },

} );