AFRAME.registerComponent('chart-event-listener', {

    schema: {

        controller: { type: "selector" }

    },
    
    init: function() {

        const el = this.el;
        let self = this;
        const controller = this.data.controller;

        controller.addEventListener('rotation', function ( evt ) {

            const xAxisRotation = evt.detail.xAxisRotation;
            const yAxisRotation = evt.detail.yAxisRotation;

            if ( self.el.is( "cursor-hovered" ) ) {

                self.el.object3D.rotation.set(xAxisRotation, yAxisRotation, 0);

            }

        } );
        
    },

    tick: function() {
    }

})
