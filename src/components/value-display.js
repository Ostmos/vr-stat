var fontCreator = require('three-bmfont-text');
var fontLoader = require('load-bmfont');

AFRAME.registerComponent('value-display', {
    schema: {
        size: {type: 'number', default: 1},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 0.5}
    },
    init: function() {
        var data = this.data;
        var object = this.el.object3D;
    
        var text = document.createElement("a-entity");
        text.className = "cont-disp";

        text.setAttribute("geometry",{
            primitive: "plane",
            width: data.width,
            height: data.height
        });

        text.setAttribute("material", {
            color: "#3366AA",
            opacity: 0.8  
        });

        text.setAttribute("text", {
            color: "#000",
            side: "double",
            value: "X: \n Y: \n Z: ",
            align: "center",
            width: 1,
            font: 'roboto',
            lineHeight: data.height*200,
            xOffset: -data.width/2 +data.width*0.03
        });



        this.el.appendChild(text);  
    }   
});
