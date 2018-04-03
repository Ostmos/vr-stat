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
        for(i = 1; i<5; i++){
            mesh = this.createNode(i,5);
            this.translateNode(mesh, i);
            object.add(mesh);
        }

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
        //create nodes:
        createNode: function(value, maxValue) {
            size = 0.5*value/maxValue;
            var geometry = new THREE.SphereGeometry(size, 32, 32);
            var material = new THREE.MeshBasicMaterial({color: 0x777777});
            var mesh = new THREE.Mesh(geometry, material);
            mesh.translateX(i*0.5);
            return mesh;
        },
        translateNode: function(mesh,counter){
            if(counter != 0){
                mesh.translateX(counter*0.5);
            }
        },
});
