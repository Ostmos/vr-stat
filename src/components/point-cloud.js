function PointCloud( data, dimensions ) {

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

    let material = new THREE.PointsMaterial( { size: 0.05, color: 0x000000 } );
    this.mesh = new THREE.Points(Geometry, material);

}

AFRAME.registerComponent( "point-cloud", {

    schema: {
        dimensions: { type: "vec3", default: {x: 1, y: 1, z: 1} },
        points: { type: "vec3", default: { x: [ 0.5 ], y: [ 0.5 ] , z: [ 0.5 ] }}
    },
 
    init: function() {
        let data = this.data;
        const CloudMesh = new PointCloud( this.data.points, this.data.dimensions ).mesh;
        this.el.setObject3D( "cloudMesh", CloudMesh );

    }

} );