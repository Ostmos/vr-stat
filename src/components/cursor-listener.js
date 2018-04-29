AFRAME.registerComponent( "cursor-listener", {

    init: function() {
    
        let self = this.el;

        this.el.addEventListener( "click", function( evt ) {

            console.log( self );

        } );

        this.el.addEventListener( "stateadded", function( evt ) {

            console.log(evt.detail.state);
            console.log(evt.detail.state === "cursor-hovered");

        } );

    }

} );