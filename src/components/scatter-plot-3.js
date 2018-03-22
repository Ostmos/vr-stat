AFRAME.registerComponent('scatter-plot-3', {
    schema: {
        size: { type: 'number', default: 3 },
        nodeSize: { type: 'number', default: 0.1 },
        levelLines: { type: 'number', default: 10 },
        color: { type: 'color', default: '#FFF' },
        title: { type: 'string', default: 'no name' }
    },
    init: function () {
        //viktigt att datan som används har definerat max och min värden för x, y och z
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
        let size = this.data.size;
        let planeGeometry = new THREE.PlaneGeometry(
            size,
            size
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: "red", side: THREE.DoubleSide, opacity: 0.1});
        //var planeMaterial = new THREE.MeshLambertMaterial( { map: map, transparent: true } );
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = Math.PI / 2;
        let vector = new THREE.Vector3(size / 2, 0, size / 2);
        this.setPosition(planeMesh, vector, 0);
        this.el.setObject3D("base", planeMesh);
    },
    createWalls: function(){
        /*  //This was a  
            let planeGeometry = new THREE.PlaneGeometry(
            this.data.size,
            this.data.size
        );
        let planeMaterial_1 = new THREE.MeshBasicMaterial({color: "green", side: THREE.DoubleSide, opacity: 0.1});
        let planeMesh_1 = new THREE.Mesh(planeGeometry, planeMaterial_1);
        planeMesh_1.rotation.y = Math.PI / 2;
        let vector_1 = new THREE.Vector3(0, this.data.size / 2, this.data.size / 2);
        this.setPosition(planeMesh_1, vector_1);
        this.el.setObject3D("wall_1", planeMesh_1);

        let planeMaterial_2 = new THREE.MeshBasicMaterial({color: "yellow", side: THREE.DoubleSide, opacity: 0.});
        let planeMesh_2 = new THREE.Mesh(planeGeometry, planeMaterial_2);
        let vector_2 = new THREE.Vector3(this.data.size / 2, this.data.size / 2, 0);
        this.setPosition(planeMesh_2, vector_2);
        this.el.setObject3D("wall_2", planeMesh_2); */

        let levelLines = this.data.levelLines;
        for (let i = 0; i <= levelLines; i++){
            var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            var geometry = new THREE.Geometry();
            let size = this.data.size;
            let y = (size/levelLines) * i;
            var vector_1 = new THREE.Vector3(   0, 0, size);
            var vector_2 = new THREE.Vector3(   0, 0,    0);
            var vector_3 = new THREE.Vector3(size, 0,    0);
            geometry.vertices.push(vector_1);
            geometry.vertices.push(vector_2);
            geometry.vertices.push(vector_3);
            var line = new THREE.Line(geometry, material);
            let vector = new THREE.Vector3(0, y, 0);
            this.setPosition(line, vector, 0);
            this.el.setObject3D("line_"+i, line);
        }
    },
    createNodes: function(stats){
        
        for(let index in stats.values){
            //load values
            let node = stats.values[index];
            let x = node.x;
            let y = node.y;
            let z = node.z;

            //Scale
            let size = this.data.size;
            let max = stats.maxValues;
            let min = stats.minValues;
            let maxX = max.x-min.x;
            let maxY = max.y-min.y;
            let maxZ = max.z-min.z;
            x = ((x - min.x) / maxX) * size; 
            y = ((y - min.y) / maxY) * size;
            z = ((z - min.z) / maxZ) * size;
            let vector = new THREE.Vector3(x, y, z);
            
            //create node
            this.createNode(vector, index);
        }
        /* let vector_ = new THREE.Vector3(0,0,0);
        this.createNode(vector_, 99); */
    },
    createNode: function(vector, index){
        let nodeSize = this.data.nodeSize;
        let planeGeometry = new THREE.PlaneGeometry(
            nodeSize,
            nodeSize
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: "blue", side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        this.setPosition(planeMesh, vector, nodeSize);
        this.el.setObject3D("node_"+index, planeMesh);
    },
    setPosition: function(obj, vector, padding){
        let size = this.data.size - padding;

        obj.position.y = vector.y - size / 2;
        obj.position.z = vector.z - size / 2;
        obj.position.x = vector.x - size / 2;
    } 
})
