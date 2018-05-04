AFRAME.registerComponent( "rotate-trigger", {

    init: function() {

        const self = this;

        this.el.addEventListener( "componentchanged", function( evt ) {

            console.log(evt.detail.name);

            if ( evt.detail.name === "rotation" ) {

                self.el.emit( "rotationTrigger", {} );

            }

        } );

    },

    tick: function() {

      //  console.log(this.el);

    }

} );