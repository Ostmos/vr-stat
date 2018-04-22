function THREEVec3( vec3 ) {

    return new THREE.Vector3( vec3.x, vec3.y, vec3.z );

}

function DebugCube( component ) {
        
    const Geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
    const Material = new THREE.MeshBasicMaterial( {color: 0x000000 } );
    const Cube = new THREE.Mesh( Geometry, Material );
    Cube.position.set( 0, 0, 0 );
    component.setObject3D("debugCube", Cube);

}

module.exports = {

    THREEVec3: THREEVec3,
    DebugCube: DebugCube

};