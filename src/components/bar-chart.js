AFRAME.registerComponent('bar-chart', {
    schema: {
    size: {type: 'number', default: 10},
    color: {type: 'color', default: '#FFF'}
},

init: function() {
    var object = this.el.object3D
    object.position.z = -14; 
    object.position.y = -5;

    const CUBE_SIZE = 14;
    var geometry = new THREE.PlaneGeometry(CUBE_SIZE, CUBE_SIZE);
    geometry.rotateX(Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(geometry, material);
    
    object.add(plane);

    const SIZE = 0.5;
    const START_X = -4.75;
    const START_Z = 4.75;

    // Bars
    for (var i = 0, j = 0; i < 400; i++) {
        const HEIGHT = Math.random() * 5;
        var color = new THREE.Color(Math.random() * 0xff0000);
        var material = new THREE.MeshBasicMaterial({color: color});
        var geometry = new THREE.BoxGeometry(SIZE, HEIGHT, SIZE);
        var cube = new THREE.Mesh(geometry, material);

        if (i % 20 == 0 && i != 0) {
            j++;   
        }

        var x = START_X + SIZE * (i % 20);
        var z = START_Z - SIZE * j;

        cube.translateX(x);
        cube.translateY(HEIGHT / 2);
        cube.translateZ(z);

        object.add(cube);
    }
    

    // Lines
    const C = CUBE_SIZE;

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