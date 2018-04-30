AFRAME.registerComponent( "rotation-component", {

    schema: {
        rotationController: { type: "selector" }
    },

    init: function() {

        const self = this;
        const el = this.el;
        const data = this.data;

        const controller = document.querySelector( "#rotation-controller" );

        document.addEventListener('keydown', (event) => {
            const keyName = event.key;

            if ( keyName === "r" && self.el.is( "cursor-hovered" ) ) {

                self.el.object3D.rotation.set( Math.random() * Math.PI / 2, 0, 0 );

            }

          }, false);


        el.addEventListener( "stateadded", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

            }

        } );

        el.addEventListener( "stateremoved", function( evt ) {

            if ( evt.detail.state == "cursor-hovered" ) {

            }

        } );

    }

} );