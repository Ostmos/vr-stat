AFRAME.registerComponent('chart-event-listener', {

    schema: {

        controller: { type: "selector" }

    },
    
    init: function() {

        const el = this.el;
        let self = this;
        const controller = this.data.controller;

        controller.addEventListener('rotation', function ( evt ) {

            if ( self.el.is( "cursor-hovered" ) ) {

                const xAxisRotation = evt.detail.xAxisRotation;
                const yAxisRotation = evt.detail.yAxisRotation;

                self.el.object3D.rotation.set(xAxisRotation, yAxisRotation, 0);

            }

        } );

        controller.addEventListener('position', function ( evt ) {

            if ( self.el.is( "cursor-hovered" ) ) {


                var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
                var material = new THREE.MeshBasicMaterial( {color: 0x000000} );
                var cube = new THREE.Mesh( geometry, material );
                self.el.setObject3D("c1", cube);
                const newPos = evt.detail.pos;
                console.log(newPos);

                self.el.object3D.position.set(newPos.x, newPos.y, newPos.z);

            }

        } );
        
    },

})
