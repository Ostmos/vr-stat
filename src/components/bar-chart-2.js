const stat = require("../lib/stat");
const loadJSON = require("../lib/statJson").loadJSON;
const getColumn = require("../lib/statJson").getColumn;

AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset" },
        xAxisCol: { type: "string" },
        yAxisCol: { type: "string" },
        height: { type: "number", default: 1.5 },
        width: { type: "number", default: 1.5 },
        title: { type: "string" },
    },
 
    init: function() {
        let data = this.data;

        // Load json data and extract two columns as arrays
        let self = this;
        loadJSON( this.data.src, jsonData => {

            const XAxisData = getColumn( jsonData, data.xAxisCol );
            const XAxisLabels = XAxisData;

            let YAxisData = getColumn( jsonData, data.yAxisCol );
            YAxisData = stat.startOnZero( YAxisData ); 
            const YAxisLabels = stat.numericalToString( YAxisData, 2 );

            const XAxisPositions = stat.statTypeScaledLinearInterpolation( XAxisData, 20, "categorical", data.width );
            const YAxisPositions = stat.statTypeScaledLinearInterpolation( YAxisData, 20, "numerical", data.height );

            console.log(XAxisPositions);
            console.log(YAxisPositions);


            self.plot( XAxisPositions, XAxisLabels, YAxisPositions, YAxisLabels );

        } );

    },

    plot: function( xPositions, xLabels, yPositions, yLabels ) {

        let axis = document.createElement( "a-entity" );
        axis.setAttribute("axis", {
            positions: yPositions,
            labels: yLabels, 
            textAligment: "right",
            rotation: { x: 0, y: 90, x: 0 },
            axisLength: 1.5, 
        } );
        this.el.appendChild( axis );
    } 

} );