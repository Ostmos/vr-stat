import * as statJson from "../lib/statJson";

AFRAME.registerComponent( "bar-chart-2", {

    schema: {
        src: { type: "asset" },
        xAxisAttribute: { type: "string" },
        yAxisAttribute: { type: "string" },
        title: { type: "string" },
    },
 
    init: function() {
        let data = this.data;

        statJson.loadJSON( this.data.src, function( jsonData ) {

            const XAxis = statJson.getColumn( jsonData, data.xAxisAttribute );
            const YAxis = statJson.getColumn( jsonData, data.yAxisAttribute );

            console.log(XAxis);
            console.log(YAxis);
            
        } );

    },

    plot: function( jsonData ) {

        let axis = document.createElement( "a-entity" );
        axis.setAttribute("axis", {
            arr: [0, 1, 2], 
            textAligment: "right"
        } );
        axis.setAttribute( "rotation" ,
            { x: 0, y: 90, z: 0 }
        );

        this.el.appendChild( axis );
    } 

} );