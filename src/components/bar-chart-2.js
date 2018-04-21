const stat = require("../lib/stat");
const loadJSON = require("../lib/statJson").loadJSON;
const getColumn = require("../lib/statJson").getColumn;
const SpriteText = require("../lib/SpriteText");

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

        SpriteText.createText();
        this.el.object3D.add(SpriteText.createText());
        // Load json data and extract two columns as arrays
        let self = this;
        loadJSON( this.data.src, jsonData => {

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