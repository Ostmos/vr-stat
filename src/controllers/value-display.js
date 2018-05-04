AFRAME.registerComponent( "value-display", {

    schema: {
        width: {type: "number", default: 0.18 },
        height: {type: "number", default: 0.07 },
        wrapCount: {type: "number", default: 30 },
        bgColor: {type: "color", default: "#000" },
        textColor: {type: "color", default: 0xFFFFFF }
    },

    init: function() {

        this.SAVE_BUTTON = 2;

        this.onReceivedValue = this.onReceivedValue.bind( this );

        this.el.sceneEl.addEventListener( "pointhovered", this.onReceivedValue );

        this.onButtonDown = this.onButtonDown.bind( this );
        this.el.addEventListener( "buttondown" , this.onButtonDown ); 

        this.savedValue = "";

        this.makeDisplay();

    },

    onButtonDown: function( evt ) {

        if ( evt.detail.id === this.SAVE_BUTTON ) {

            this.savedValue = this.currentValue;
            this.updateDisplay();

        }

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
            value: "Current: \n" + "Saved: "
        } );
        this.el.appendChild( this.textPlane );

    },

    onReceivedValue: function( evt ) {

        if ( evt.detail.value === undefined || evt.detail.value === "" ) { return; }

        this.currentValue = evt.detail.value;

        this.updateDisplay( );

    },

    updateDisplay: function( text ) {

        if ( this.textPlane === undefined ) { return; }
        this.textPlane.setAttribute("text", {
            value: "Current: " + this.currentValue + "\nSaved: " + this.savedValue
        })

    }

});
