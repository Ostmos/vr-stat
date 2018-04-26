AFRAME.registerComponent( "bounding-box", {

    schema: {
        size: { type: "vec3" },
    },

    init: function() {

        this.el.className = "bounding-box";

        const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xF00, opacity: 0, transparent: true, side: THREE.DoubleSide } );
        const backPlaneGeometry = new THREE.PlaneGeometry( this.data.size.x, this.data.size.y );
        const backPlaneMesh = new THREE.Mesh( backPlaneGeometry, planeMaterial );
        backPlaneMesh.position.set( 0, 0, -this.data.size.z / 2 );

        const sidePlaneGeometry = new THREE.PlaneGeometry( this.data.size.z, this.data.size.y );
        const sidePlaneMesh = new THREE.Mesh( sidePlaneGeometry, planeMaterial );
        sidePlaneMesh.position.set( -this.data.size.x / 2, 0, 0 );
        sidePlaneMesh.rotation.set( 0, Math.PI / 2, 0 );

        this.el.setObject3D( "bounding-box-back", backPlaneMesh );
        this.el.setObject3D( "bounding-box-side", sidePlaneMesh );

        this.el.addEventListener( "stateadded", function (evt) {

            // 0.7.0 evt.detail.state
            if ( evt.detail.state === "cursor-hovered" ) {

                console.log('hover');

            } 

        } );

        this.el.addEventListener( "stateremoved", function (evt) {

            if ( evt.detail.state === "cursor-hovered" ) {

                console.log('not hover');

            } 

        } );

    }

} );