AFRAME.registerComponent( "bounding-box", {

    schema: {
        size: { type: "vec3" },
        parent: { type: "selector" }
    },

    init: function() {

        this.el.className = "hoverable";
        let self = this;

        const planeMaterial = new THREE.MeshBasicMaterial( { color: 0x000, opacity: 0.2, transparent: true, side: THREE.FrontSide, depthWrite: false, depthTest: false } );
        const backPlaneGeometry = new THREE.PlaneGeometry( this.data.size.x, this.data.size.y );
        const backPlaneMesh = new THREE.Mesh( backPlaneGeometry, planeMaterial );
        backPlaneMesh.position.set( 0, 0, -this.data.size.z / 2 );

        const sidePlaneGeometry = new THREE.PlaneGeometry( this.data.size.z, this.data.size.y );
        const sidePlaneMesh = new THREE.Mesh( sidePlaneGeometry, planeMaterial );
        sidePlaneMesh.position.set( -this.data.size.x / 2, 0, 0 );
        sidePlaneMesh.rotation.set( 0, Math.PI / 2, 0 );

        const bottomPlaneGeometry = new THREE.PlaneGeometry( this.data.size.x, this.data.size.z );
        const bottomPlaneMesh = new THREE.Mesh( bottomPlaneGeometry, planeMaterial );
        bottomPlaneMesh.rotation.set( -Math.PI / 2, 0, 0 );
        bottomPlaneMesh.position.set( 0, -this.data.size.y / 2, 0 );

        this.el.setObject3D( "bounding-box-back", backPlaneMesh );
        this.el.setObject3D( "bounding-box-side", sidePlaneMesh );
        this.el.setObject3D( "bounding-box-bottom", bottomPlaneMesh );

        this.el.addEventListener( "stateadded", function (evt) {

            // 0.7.0 evt.detail.state
            if ( evt.detail.state === "cursor-hovered" ) {

                if ( self.el.parentElement !== undefined ) {

                    self.el.parentElement.addState( "cursor-hovered" );

                }
                
            } 

        } );

        this.el.addEventListener( "stateremoved", function (evt) {

            if ( evt.detail.state === "cursor-hovered" ) {

                if ( self.el.parentElement !== undefined ) {

                    self.el.parentElement.removeState( "cursor-hovered" );

                }

            } 

        } );

    }

} );