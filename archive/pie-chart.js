AFRAME.registerComponent('pie-chart', {
    schema: {
        size: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D;

        var total = 0;
        var index = 0;
        while (total < Math.PI * 2) {
            var size = Math.random();
            var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
            material.side = THREE.DoubleSide;
            if (total + size > Math.PI * 2) {
                size = Math.PI * 2 - total;
            }
            var geometry = new THREE.CircleGeometry(5, 32, total, size);
            var circleSegment = new THREE.Mesh(geometry, material);
            console.log('total: ' + total + ' size: ' + (total + size));
            total += size;
            object.add(circleSegment);
        }
    },
});

