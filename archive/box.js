AFRAME.registerComponent('box', {
        schema: {
        size: {type: 'number', default: 10},
        color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        this.directionVec3 = THREE.Vector3();
        this.geometry = new THREE.BoxBufferGeometry(data.size, data.size, data.size);
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        el.setObject3D('mesh', this.mesh);
    },

    tick: function(time, timeDelta) {
        var pos = this.el.object3D.position;

        this.el.setAttribute('position', {
            x: pos.x,
            y: pos.y + 0.001, 
            z: pos.z + 0.01 
        });
    }
});