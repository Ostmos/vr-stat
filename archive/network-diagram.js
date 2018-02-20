AFRAME.registerComponent('network-diagram', {
    schema: {
        size: {type: 'number', default: 1},
        color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D;

        // We should implement a graph data structure here
        // Nodes
        var geometry = new THREE.SphereGeometry(0.5, 32, 32);
        var material = new THREE.MeshBasicMaterial({color: 0xfe4365});
        var mesh = new THREE.Mesh(geometry, material );
        var mesh2 = new THREE.Mesh(geometry, material );
        var mesh3 = new THREE.Mesh(geometry, material );
        var mesh4 = new THREE.Mesh(geometry, material );

        mesh2.translateX(-10);
        mesh2.translateY(-10);
        mesh3.translateZ(-10);
        mesh4.translateY(10);

        object.add(mesh);
        object.add(mesh2);
        object.add(mesh3);
        object.add(mesh4);

        // Lines
        var material = new THREE.LineBasicMaterial({color: 0x2A363B});
        var geometry = new THREE.Geometry();
        
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(-10, -10, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 0, -10));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));

        var line = new THREE.LineSegments( geometry, material );

        object.add( line );
    },
});
