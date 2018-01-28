AFRAME.registerComponent('bar-chart', {
    schema: {
    size: {type: 'number', default: 10},
    color: {type: 'color', default: '#FFF'}
},

init: function() {
    var object = this.el.object3D;
    object.position.z = -14; 
    object.position.y = -5;

    const PLANE_WIDTH = 14;
    var geometry = new THREE.PlaneGeometry(PLANE_WIDTH , PLANE_WIDTH);
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
    
    const P = PLANE_WIDTH;

    var corners = [
        new THREE.Vector3(-P / 2, 0, P / 2),
        new THREE.Vector3(-P / 2, P / 2, P / 2),
        new THREE.Vector3(-P / 2, 0, -P / 2),
        new THREE.Vector3(-P / 2, P / 2, -P / 2),
        new THREE.Vector3(P / 2, 0, -P / 2),
        new THREE.Vector3(P / 2, P / 2, -P / 2),
    ];

    // Line
    var material = new THREE.LineBasicMaterial({color: 0x2A363B});
    var geometry = new THREE.Geometry();
    for (var i = 0; i < corners.length; i++) {
        geometry.vertices.push(corners[i]);
    }

    var line = new THREE.LineSegments( geometry, material );
    object.add( line );
},

});