AFRAME.registerComponent('scatter-plot-3', {
    schema: {
        size: { type: 'number', default: 3 },
        radius: { type: 'number', default: 0.02 },
        color: { type: 'color', default: '#FFF' },
        title: {type: 'string', default: 'no name'}
    },
    init: function () {
        const twitterData = JSON.parse(`{
            "stats": {
                "labels": {"x": "Retweet", "y": "Favorite", "z": "Number of tweets"},
                "maxValues": {"x": 4, "y": 3, "z": 651},
                "minValues": {"x": 0, "y": 0, "z": 19},
                "values": [
                    {"x": 3, "y": 2, "z": 342},
                    {"x": 0, "y": 0, "z": 50},
                    {"x": 0, "y": 1, "z": 100},
                    {"x": 0, "y": 2, "z": 23},
                    {"x": 1, "y": 0, "z": 651},
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
        let planeMaterial = new THREE.MeshBasicMaterial({color: "red", side: THREE.FrontSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = -Math.PI / 2;
        this.el.setObject3D("base", planeMesh);
    },
    createWalls: function(){
        let planeGeometry = new THREE.PlaneGeometry(
            this.data.size,
            this.data.size
        );
        let planeMaterial_1 = new THREE.MeshBasicMaterial({color: "green", side: THREE.FrontSide});
        let planeMesh_1 = new THREE.Mesh(planeGeometry, planeMaterial_1);
        planeMesh_1.rotation.y = -Math.PI / 2;
        this.el.setObject3D("wall_1", planeMesh_1);

        let planeMaterial_2 = new THREE.MeshBasicMaterial({color: "yellow", side: THREE.FrontSide});
        let planeMesh_2 = new THREE.Mesh(planeGeometry, planeMaterial_2);
        this.el.setObject3D("wall_2", planeMesh_2);
    },
    createNodes: function(stats){
        let i = 0;
        let node = stats.values[i];
        let x = node.x;
        let y = node.y;
        let z = node.z;

        //Scale
        let maxValues = stats.MaxValues;
        x = (x / maxValues.x) * this.data.size; 
        y = (y / maxValues.y) * this.data.size;
        z = (z / maxValues.z) * this.data.size;
        let vector = new THREE.Vector3(x, y, z)
        this.createNode(vector);
    },
    createNode: function(vector){
        let planeGeometry = new THREE.PlaneGeometry(
            0.02,
            0,02
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: "blue", side: THREE.doubleside});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        mesh.position.set(
            vector.x,
            vector.y,
            vector.z
        )
        this.el.setObject3D("node", planeMesh);
    } 
})
