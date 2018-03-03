AFRAME.registerComponent("bar-chart2", {
    schema: {
        src: {type: "asset", default: "empty"},
        chartPadding: {type: "number", default: 0.05},
        barSize: {type: "number", default: 0.05},
        barPadding: {type: "number", default: 0.02},
        scale: {type: "number", default: 1}
    },
 
    init: function () {
        var data = this.data;
        var el = this.el;

        var k = 0;

        for (var i = 0; i < 1000; i++) {
            this.geometry = new THREE.BoxBufferGeometry(0.1, 0.1, 1 * Math.random());
            this.material = new THREE.MeshStandardMaterial({color: Math.random() * 0xFFFFFF});
            var mesh = new THREE.Mesh(this.geometry, this.material);

            mesh.translateX(i % 100 * 0.1);
            if (i % 100 == 0) {
                k = k + 1;
                console.log(k);
            }
            mesh.translateY(k * 0.1);
            el.setObject3D("mesh" + i, mesh);
        }
    }
});