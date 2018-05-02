AFRAME.registerComponent( "move-trigger", {

    init: function() {

        const self = this;

        const TRIGGER_BUTTON = 1;

        this.el.addEventListener( "buttondown", function( evt ) {

            if ( evt.detail.id === TRIGGER_BUTTON ) {

                self.el.emit( "movedTrigger", {} );

            }

        } );

    }

} );