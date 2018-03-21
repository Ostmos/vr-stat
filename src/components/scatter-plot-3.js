AFRAME.registerComponent('scatter-plot-3', {
    schema: {
        size: { type: 'number', default: 3 },
        nodeSize: { type: 'number', default: 0.1 },
        color: { type: 'color', default: '#FFF' },
        title: {type: 'string', default: 'no name'}
    },
    init: function () {
        const twitterData = JSON.parse(`{
            "stats": {
                "labels": {"x": "Retweet", "y": "Favorite", "z": "Number of tweets"},
                "maxValues": {"x": 4, "y": 3, "z": 342},
                "minValues": {"x": 0, "y": 0, "z": 19},
                "values": [
                    {"x": 4, "y": 3, "z": 342},
                    {"x": 0, "y": 0, "z": 50},
                    {"x": 0, "y": 1, "z": 100},
                    {"x": 0, "y": 2, "z": 23},
                    {"x": 1, "y": 0, "z": 251},
                    {"x": 1, "y": 1, "z": 19},
                    {"x": 1, "y": 2, "z": 100},
                    {"x": 2, "y": 0, "z": 123},
                    {"x": 2, "y": 1, "z": 101},
                    {"x": 2, "y": 2, "z": 123},
                    {"x": 3, "y": 0, "z": 123},
                    {"x": 4, "y": 1, "z": 20},
                    {"x": 3, "y": 3, "z": 70}
                ]
            }
        }`);
        this.createBase();
        this.createWalls();
        this.createNodes(twitterData.stats);
    },
    createBase: function() {
        let planeGeometry = new THREE.PlaneGeometry(
            this.data.size,
            this.data.size
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: "red", side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = -Math.PI / 2;
        let vector = new THREE.Vector3(this.data.size / 2, 0, this.data.size / 2);
        this.setPosition(planeMesh, vector);
        this.el.setObject3D("base", planeMesh);
    },
    createWalls: function(){
        let planeGeometry = new THREE.PlaneGeometry(
            this.data.size,
            this.data.size
        );
        let planeMaterial_1 = new THREE.MeshBasicMaterial({color: "green", side: THREE.DoubleSide});
        let planeMesh_1 = new THREE.Mesh(planeGeometry, planeMaterial_1);
        planeMesh_1.rotation.y = Math.PI / 2;
        let vector_1 = new THREE.Vector3(0, this.data.size / 2, this.data.size / 2);
        this.setPosition(planeMesh_1, vector_1);
        this.el.setObject3D("wall_1", planeMesh_1);

        let planeMaterial_2 = new THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide});
        let planeMesh_2 = new THREE.Mesh(planeGeometry, planeMaterial_2);
        let vector_2 = new THREE.Vector3(this.data.size / 2, this.data.size / 2, 0);
        this.setPosition(planeMesh_2, vector_2);
        this.el.setObject3D("wall_2", planeMesh_2);
    },
    createNodes: function(stats){
        
        for(let index in stats.values){
            //load values
            let node = stats.values[index];
            let x = node.x;
            let y = node.y;
            let z = node.z;

            //Scale
            let max = stats.maxValues;
            let min = stats.minValues;
            let maxX = max.x-min.x;
            let maxY = max.y-min.y;
            let maxZ = max.z-min.z;
            x = ((x - min.x) / maxX) * this.data.size; 
            y = ((y - min.y) / maxY) * this.data.size;
            z = ((z - min.z) / maxZ) * this.data.size;
            let vector = new THREE.Vector3(x, y, z)
            console.log("x: " + x + "\ny: " + y + "\nz: " + z);
            //create node
            this.createNode(vector, index);
        }
        let vector_ = new THREE.Vector3(3,3,3);
        this.createNode(vector_, 99);
    },
    createNode: function(vector, index){
        let planeGeometry = new THREE.PlaneGeometry(
            this.data.nodeSize,
            this.data.nodeSize
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: "blue", side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        this.setPosition(planeMesh, vector);
        this.el.setObject3D("node_"+index, planeMesh);
    },
    setPosition: function(obj, vector){
        let size = this.data.size;

        obj.position.y = vector.y - size / 2;
        obj.position.z = vector.z - size / 2;
        obj.position.x = vector.x - size / 2;
    } 
})
