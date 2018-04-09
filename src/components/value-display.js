var fontCreator = require('three-bmfont-text');
var fontLoader = require('load-bmfont');

AFRAME.registerComponent('value-display', {
    schema: {
        size: {type: 'number', default: 1},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 0.5},

        xValue: {type: 'string', default: "123"},
        yValue: {type: 'string', default: "231"},
        zValue: {type: 'string', default: "321"},
    },
    init: function() {
        var data = this.data;
        var object = this.el.object3D;

        //*** SET x-,y- and zValue here ***
        /*
        data.xValue = ...
        data.yValue = ...
        data.zValue = ...
        */
    
        var text = document.createElement("a-entity");
        var result = document.createElement("a-entity");
        text.className = "cont-disp";

        text.setAttribute("geometry",{
            primitive: "plane",
            width: data.width/1.5,
            height: data.height,
        });

        text.setAttribute("material", {
            color: "#3366AA",
            opacity: 0.8,  
        });

        text.setAttribute("text", {
            color: "#000",
            side: "double",
            value: "X: \n Y: \n Z: ",
            align: "center",
            width: 1,
            font: 'roboto',
            lineHeight: data.height*250,
            xOffset: -data.width/2 +data.width*0.25,
        });

        result.setAttribute("text", {
            color: "#000",
            side: "double",
            value: data.xValue + "\n" + data.yValue + "\n" + data.zValue,
            align: "left",
            width: 1,
            font: 'roboto',
            lineHeight: data.height*250,
            xOffset: 0.3,
        });

        text.appendChild(result);
        this.el.appendChild(text);  
    }   
});
