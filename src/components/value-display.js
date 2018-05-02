AFRAME.registerComponent( "value-display", {
    schema: {
        width: {type: "number", default: 0.3},
        height: {type: "number", default: 0.2},

        xValue: {type: "string", default: 2 },
        yValue: {type: "string", default: 3 },
        zValue: {type: "string", default: 4 },
    },
    init: function() {

        let data = this.data;

        const text = document.createElement("a-entity");
        text.setAttribute("geometry",{
            primitive: "plane",
            width: data.width,
            height: data.height 
        });
        text.setAttribute("material", {
            color: "#355C7D",
            opacity: 0.8,  
        });
        text.setAttribute("text", {
            value: "Hello",
            align: "center",
            width: 0.5
        } );

        const textWrapper = document.createElement("a-entity");
        textWrapper.appendChild( text );
        textWrapper.setAttribute("position", {
            x: 0,
            y: 0.1,
            z: 0
        });
        textWrapper.setAttribute("rotation", {
            x: - Math.PI,
            y: 0,
            z: 0
        });

/*        text.setAttribute("text", {
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
        });*/

        
        this.el.appendChild( textWrapper );  
    },

});
