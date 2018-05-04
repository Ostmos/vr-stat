AFRAME.registerComponent( "data-point", {

    schema: {
        value: { type: "string" }
    },


    init: function() {

        this.onStateAdded = this.onStateAdded.bind( this );

        this.el.addEventListener( "stateadded", this.onStateAdded );

    },

    onStateAdded: function( evt ) {

        if ( evt.detail.state == "cursor-hovered" ) {

            this.el.emit( "pointhovered", { value: this.data.value } );

        }

    }

} );