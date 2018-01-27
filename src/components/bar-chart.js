AFRAME.registerComponent('bar-chart', {
    schema: {
    size: {type: 'number', default: 10},
    color: {type: 'color', default: '#FFF'}
},

init: function() {
    var data = this.data;
    var el = this.el;

    var scene = this.el.sceneEl.object3D;

    this.geometry = new THREE.BoxBufferGeometry(data.size, data.size, data.size);
    this.material = new THREE.MeshStandardMaterial({color: data.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);

    this.geometry = new THREE.BoxBufferGeometry(data.size, data.size, data.size);
    this.material = new THREE.MeshStandardMaterial({color: data.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);

    el.setObject3D('mesh', this.mesh);
},
});