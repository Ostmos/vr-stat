AFRAME.registerComponent('bar-chart', {
    schema: {
    size: {type: 'number', default: 10},
    offset: {type: 'number', default: 10},
    color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D

        var geometry = new THREE.PlaneGeometry(data.size, data.size);
        geometry.rotateX(Math.PI / 2);
        var material = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geometry, material);
        
        object.add(plane);

        const BAR_SIZE = 0.5;
        const START_X = -4.75;
        const START_Z = 4.75;

        // Bars
        for (var i = 0, j = 0; i < 400; i++) {
            var color = new THREE.Color(Math.random() * 0xff0000);
            var material = new THREE.MeshBasicMaterial({color: color});
            const HEIGHT = Math.floor(Math.random() * Math.floor(data.size / 2));
            var geometry = new THREE.BoxGeometry(BAR_SIZE, HEIGHT, BAR_SIZE);
            var cube = new THREE.Mesh(geometry, material);

            if (i % 20 == 0 && i != 0) {
                j++;   
            }

            var x = START_X + BAR_SIZE * (i % 20);
            var z = START_Z - BAR_SIZE * j;

            cube.translateX(x);
            cube.translateY(HEIGHT / 2);
            cube.translateZ(z);

            object.add(cube);
        }
        

        // Lines
        const C = data.size;

        var start = new THREE.Vector3(-C / 2, 0, C / 2);
        var start2 = new THREE.Vector3(-C / 2, 0, -C / 2);
        var start3 = new THREE.Vector3(C / 2, 0, -C / 2);

        var material = new THREE.LineBasicMaterial({color: 0x2A363B});
        var geometry = new THREE.Geometry();
        
        for (var i = 0; i < 10; i++) {
            geometry.vertices.push(new THREE.Vector3(start.x, start.y + i, start.z));
            geometry.vertices.push(new THREE.Vector3(start2.x, start2.y + i, start2.z));
            geometry.vertices.push(new THREE.Vector3(start2.x, start2.y + i, start2.z));
            geometry.vertices.push(new THREE.Vector3(start3.x, start3.y + i, start3.z));
        }
        var line = new THREE.LineSegments( geometry, material );

        object.add( line );
    },
});