AFRAME.registerComponent('chart-controller', {

    dependencies: ['raycaster'],

    init: function () {

        const el = this.el;
        const self = this;

        const TRIGGER = 1;
        this.triggered = false;
        this.threeRaycaster = this.el.components.raycaster; 
        this.raycasterLength = this.threeRaycaster.raycaster.far;

        this.el.addEventListener( "axismove" , function( evt ) {

            const yAxisRotation = evt.detail.axis[ 0 ] * Math.PI / 2;
            const xAxisRotation = evt.detail.axis[ 1 ] * Math.PI / 2; 

            self.el.emit( "rotation", { xAxisRotation: xAxisRotation, yAxisRotation: yAxisRotation} );

        } );

        this.el.addEventListener( "buttondown" , function( evt ) {

            if ( evt.detail.id === TRIGGER ) {

                self.triggered = !self.triggered;

            }

        } );

        this.el.addEventListener( "buttonup" , function( evt ) {

            if ( evt.detail.id === TRIGGER ) {

                self.triggered = !self.triggered;

            }

        } );

    },

    tick: function() {
        
        if ( this.triggered ) {

            const intersectedELs = this.threeRaycaster.intersectedEls;

            if ( intersectedELs.length > 0 ) {

                let endPoint = new THREE.Vector3( 0, 0, 0 );
                endPoint.copy( this.threeRaycaster.raycaster.ray.direction );
                endPoint = endPoint.multiplyScalar( this.raycasterLength ).add( this.threeRaycaster.raycaster.ray.origin );

                /*this.targetPosition.applyQuaternion(this.grabber.object3D.getWorldQuaternion())
                .setLength(this.grabDistance).add(this.grabber.object3D.getWorldPosition()).add(this.grabOffset);

                target.applyQuaternion(contoller.getWorldQuaternion).setLegnth(racasterlenght)add(controller.getWorldPosition.add(origin))*/

                this.el.emit( "position", { pos: endPoint } );

            }

        }

    }

  });