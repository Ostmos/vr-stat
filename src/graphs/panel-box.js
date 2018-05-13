AFRAME.registerComponent( "panel-box", {

    schema: {
        size: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
        bottomColor: { type: "color", default: 0x000000 },
        sidesColor: { type: "color", default: 0x000000 },
        bottomOpacity: { type: "number", default: 0.8 },
        sidesOpacity: { type: "number", default: 0 },
    },

    init: function() {

        const BIAS = 0.001;

        const data = this.data;
        const size = data.size;

        this.bottomGeometry = new THREE.PlaneGeometry( size.x, size.z );
        this.sideGeometry = new THREE.PlaneGeometry( size.z, size.y );
        this.backGeometry = new THREE.PlaneGeometry( size.x, size.y );

        this.bottomMaterial = new THREE.MeshBasicMaterial( { 
            color: data.bottomColor, 
            transparent: true, 
            opacity: data.bottomOpacity,
            side: THREE.DoubleSide
        } );

        this.sidesMaterial = new THREE.MeshBasicMaterial( {
            color: data.sidesColor, 
            transparent: true, 
            opacity: data.sidesOpacity ,
            side: THREE.DoubleSide
        } );

        this.bottomMesh = new THREE.Mesh( this.bottomGeometry, this.bottomMaterial );
        this.bottomMesh.rotation.set( Math.PI / 2, 0, 0 );
        this.bottomMesh.position.set( 0, - data.size.y / 2, 0 );

        this.sideMesh = new THREE.Mesh( this.sideGeometry, this.sidesMaterial );
        this.sideMesh.rotation.set( 0, Math.PI / 2, 0 );
        this.sideMesh.position.set( - data.size.x / 2, 0, 0 );

        this.backMesh = new THREE.Mesh( this.backGeometry, this.sidesMaterial );
        this.backMesh.position.set( 0, 0, - data.size.z / 2 );

        this.meshGroup = new THREE.Group();
        this.meshGroup.add( this.bottomMesh );
        this.meshGroup.add( this.sideMesh );
        this.meshGroup.add( this.backMesh );

        this.meshGroup.position.set( -BIAS, -BIAS, -BIAS );

        this.el.setObject3D( "panel-box", this.meshGroup );

    }

} );