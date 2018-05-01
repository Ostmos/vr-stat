function PointCloud( data, dimensions, pointTexture ) {

    const Length = data.z.length;

    const D = dimensions;
    const Origin = new THREE.Vector3( 
        -D.x / 2, -D.y / 2, -D.z / 2
    );
    const Geometry = new THREE.Geometry();
    
    for(let i = 0; i < Length; i++){
        Geometry.vertices.push(
            {x: Origin.x + data.x[ i ],
             y: Origin.y + data.y[ i ],
             z: Origin.z + data.z[ i ]
            } 
        ); 
    }
    Geometry.vertices.push(Origin);

    // Will not work in index
    var sprite = new THREE.TextureLoader().load( "../assets/textures/sphere_large.png" );
    let material = new THREE.PointsMaterial( { size: 0.05, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
    material.color.setHex( 0xb2b2ff );

    this.mesh = new THREE.Points(Geometry, material);

}

AFRAME.registerComponent( "point-cloud", {

    schema: {
        dimensions: { type: "vec3", default: {x: 1, y: 1, z: 1} },
        points: { type: "vec3", default: { x: [ 0.5 ], y: [ 0.5 ] , z: [ 0.5 ] }},
        pointTexture: { type: "asset", default: "#sphere" }
    },
 
    init: function() {

        let data = this.data;
        const CloudMesh = new PointCloud( this.data.points, this.data.dimensions, this.data.pointTexture ).mesh;
        this.el.setObject3D( "cloudMesh", CloudMesh );

    }

} );