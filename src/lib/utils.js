const Utils = {

    // Convert aframe vec3 to threejs vec3
    THREEVec3: function ( vec3 ) {

        return new THREE.Vector3( vec3.x, vec3.y, vec3.z );

    }

}

module.exports = Utils;