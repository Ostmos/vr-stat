AFRAME.registerComponent( "grab-trigger", {

    init: function() {

        let self = this;

        this.el.addEventListener( "stateadded", function(evt) {

            const state = evt.detail.state;

            self.el.emit( "grabTrigger", {} );

        } );

    }


} );