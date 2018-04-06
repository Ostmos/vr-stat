AFRAME.registerComponent('network-diagram', {
    schema: {
        sizeFactor: {type: 'number', default: 0.5},
        color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D;
        
        
        // Import json file and get data from there
        
        var values = [100, 78, 74, 64, 53, 49, 44, 33, 27, 25, 18, 12, 6, 1]
        var numberOfElements = values.length;

        //Nodes
        for(i = 1; i<numberOfElements; i++){
            mesh = this.createNode(values[i],values[0]);
            this.translateNode(mesh, i, values[i], values[0], numberOfElements);
            //Behöver sättas ut linjer 
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
            size = (this.data.sizeFactor)*(value/maxValue);
            var geometry = new THREE.SphereGeometry(size, 32, 32);
            var material = new THREE.MeshBasicMaterial({color: '#' + (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)});
            var mesh = new THREE.Mesh(geometry, material);
            return mesh;
        },

        translateNode: function(mesh,counter,value,maxValue, numberOfElements){
            size = 2*value/maxValue; //Diameter of the node
            if (counter != 1){
                //DET HÄR ÄR INTE ETT BRA SÄTT, datapunkter kan bli dolda
                mesh.translateX(Math.sin(size*counter+counter/numberOfElements) + Math.tan(counter/numberOfElements));
                mesh.translateY(Math.cos(size*counter+counter/numberOfElements) + Math.sin(counter/numberOfElements));
                mesh.translateZ(Math.tan(size*counter+counter/numberOfElements) + Math.cos(counter/numberOfElements));
            }
        },
});
