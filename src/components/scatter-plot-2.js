const LoadJSON = require("../lib/statJson").loadJSON;
const GetColumn = require("../lib/statJson").getColumn;
const Range = require( "../charts/data" ).Range;
const XYZDataSet = require( "../charts/data" ).XYZDataSet;

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
        LoadJSON( this.data.src, jsonData => {

            let x = GetColumn( jsonData, data.xCol );
            let y = GetColumn( jsonData, data.yCol );
            let z = GetColumn( jsonData, data.zCol );

            // TODO Clean this up
            function Range( x, y ) {

                this.x = x;
                this.y = y;

            }

            let xRange = new Range( Math.min( ...x ), Math.max( ...x ) );
            let yRange = new Range( Math.min( ...y ), Math.max( ...y ) );
            let zRange = new Range( Math.min( ...z ), Math.max( ...z ) );
    

            /*
            range [0, 5] get from [min(x), max(x)]
            Scales against dimensions afterwards
            -offset => scalefit
            */

            const Grid = document.createElement( "a-entity" );
            Grid.setAttribute("numerical-grid", {

                dimensions: data.dimensions,
                steps: data.steps,
                xRange: [ xRange.x, xRange.y ],
                yRange: [ yRange.x, yRange.y ],
                zRange: [ zRange.x, zRange.y ],
                xSuffix: "",
                ySuffix: "",
                zSuffix: "",

            });
            this.el.appendChild( Grid );
        
            const PointCloud = document.createElement( "a-entity" );
            PointCloud.setAttribute( "point-cloud", "" );
            this.el.appendChild( PointCloud );


        } );


    },

} );