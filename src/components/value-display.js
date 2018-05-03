AFRAME.registerComponent( "value-display", {

    schema: {
        width: {type: "number", default: 0.18 },
        height: {type: "number", default: 0.07 },
        wrapCount: {type: "number", default: 20 },
        bgColor: {type: "color", default: "#000" },
        textColor: {type: "color", default: 0xFFFFFF }
    },

    init: function() {

        this.onReceivedValue = this.onReceivedValue.bind( this );

        this.el.sceneEl.addEventListener( "pointhovered", this.onReceivedValue );

        this.makeDisplay();

    },


    makeDisplay: function() {

        const el = this.el;
        const data = this.data;

        this.textPlane = document.createElement("a-plane");
        this.textPlane.setAttribute( "color", data.bgColor );
        this.textPlane.setAttribute( "rotation", "-55 0 0");
        this.textPlane.setAttribute( "position", "0 0 -0.03");
        this.textPlane.setAttribute( "width", data.width );
        this.textPlane.setAttribute( "height", data.height );
        this.textPlane.setAttribute( "text", {
            wrapCount: data.wrapCount,
            color: data.textColor,
            align: "center", 
            value: "Value: \n"
        } );
        this.el.appendChild( this.textPlane );

    },

    onReceivedValue: function( evt ) {

        if ( evt.detail.value === undefined || evt.detail.value === "" ) { return; }

        const newText = evt.detail.value;

        this.updateDisplay( newText );

    },

    updateDisplay: function( text ) {

        if ( this.textPlane === undefined ) { return; }
        this.textPlane.setAttribute("text", {
            value: "Value: \n" + text
        })

    }

});
