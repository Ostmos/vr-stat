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

    tock: function() {
        
        if ( this.triggered ) {

            const intersectedELs = this.threeRaycaster.intersectedEls;

            if ( intersectedELs.length > 0 ) {

                // This needs to be improved a lot
                let endPoint = new THREE.Vector3( 0, 0, 0 );
                endPoint.copy( this.threeRaycaster.raycaster.ray.direction );
                endPoint = endPoint.multiplyScalar( this.raycasterLength - 1 ).add( this.threeRaycaster.raycaster.ray.origin );
                intersectedELs[0].parentNode.object3D.position.set(endPoint.x, endPoint.y, endPoint.z);

            }

        }

    }

  });