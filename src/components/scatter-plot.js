var fontCreator = require('three-bmfont-text');
var fontLoader = require('load-bmfont');
var SDFShader = require('../shaders/sdf');

AFRAME.registerComponent('scatter-plot', {
    schema: {
        src: {type: "asset", default: "empty"},

        title: { type: "string", default: ""},
        xLabel: {type: "string", default: ""},
        yLabel: {type: "string", default: ""},
        zLabel: {type: "string", default: ""},

        xAxisStart: {type: "number", default: 0},
        yAxisStart: {type: "number", default: 0},
        zAxisStart: {type: "number", default: 0},

        xAxisScale: {type: "number", default: 1},
        yAxisScale: {type: "number", default: 1},
        zAxisScale: {type: "number", default: 1},

        nbrOfPoints: {type: "number", default: -1},
        pointSize: { type: "number", default: 0.1 }
    },

    init: function () {
        let self = this;

        fetch(this.data.src)
        .then((response) => response.json())
        .then(function(jsonData){
            self.createAxis(jsonData);
            self.createPoints(jsonData);
        });
    },

    createAxis(jsonData) {
        let x = [];
        let y = [];
        let z = [];

        for (let i = 0; i < jsonData.length; i++) {
            x[i] = jsonData[i].x;
            y[i] = jsonData[i].y;
            z[i] = jsonData[i].z;
        }

        let d = this.data;
        let material = new THREE.LineBasicMaterial({color: 0x2A363B});
        let lines = new THREE.Geometry();
        lines.vertices.push(new THREE.Vector3(0, 0, 0));
        lines.vertices.push(new THREE.Vector3(Math.max(...x) * d.xAxisScale + d.xAxisStart, 0, 0));
        lines.vertices.push(new THREE.Vector3(0, 0, 0));
        lines.vertices.push(new THREE.Vector3(0, Math.max(...y) * d.yAxisScale + d.yAxisScale, 0));
        lines.vertices.push(new THREE.Vector3(0, 0, 0));
        lines.vertices.push(new THREE.Vector3(0, 0, Math.max(...z) * d.zAxisScale + d.zAxisStart));
        let line = new THREE.LineSegments(lines, material);
        this.el.setObject3D("axis", line);
    },

    createOneAxis() {
        
    },

    createPoints(jsonData) {
        let d = this.data;

        const LENGTH = d.nbrOfPoints < 0 ? jsonData.length : d.nbrOfPoints;

        let geometry = new THREE.Geometry();

        let COLORS = [0xF8B195, 0xF67280, 0xC06C84, 0x6C5B7B, 0x355C7D];
        let vertexColors = [];

        for(let i = 0; i < LENGTH; i++){

            let vertex = new THREE.Vector3();
            vertex.x = jsonData[i].x * d.xAxisScale + d.xAxisStart;
            vertex.y = jsonData[i].y * d.yAxisScale + d.yAxisStart;
            vertex.z = jsonData[i].z * d.zAxisScale + d.zAxisStart;

            geometry.vertices.push(vertex); 

            vertexColors.push(new THREE.Color(COLORS[i % COLORS.length]));
        }

        geometry.colors = vertexColors;

        let material = new THREE.PointsMaterial({size: d.pointSize, vertexColors: THREE.VertexColors});
        let points = new THREE.Points(geometry, material);

        this.el.setObject3D("points", points);
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
    
    createWalls: function(stats){
        var self = this;
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('./src/assets/fonts/dejavu/DejaVu-sdf.png', function (texture) {
            texture.needsUpdate = true;
            texture.anisotropy = 16;

            var fontTexture = new THREE.RawShaderMaterial(SDFShader({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                color: 0x00000 
            }))
            fontLoader('./src/assets/fonts/dejavu/DejaVu-sdf.fnt', function(err, font) {
                let levelLines = this.data.levelLines;
                for (let i = 0; i <= levelLines; i++){
                    //level
                    let vector = new THREE.Vector3(0, y, 0);

                    //create level lines
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
                    this.setPosition(line, vector, 0);
                    this.el.setObject3D("line_"+i, line);

                    //create labels
                    self.createYLabel(vector_1, vector, stats, i);

                }
            })
        })
    },
    createYLabel: function(vector_1, vector, stats, i){
        let label = stats.minValues.y + ((stats.maxValues.y - stats.minValues.y) / levelLines) * i ;
        var fontGeometry = fontCreator({
            width: 300,
            font: font,
            letterSpacing: 1,
            align: "left",
            text: label
        })

        var mesh = new THREE.Mesh(fontGeometry, fontTexture);
        var textAnchor = new THREE.Object3D();
        textAnchor.scale.multiplyScalar(0.004);
        // 1.2 is magic, should fix that
        textAnchor.position.set((-planeWidth / 2 + barSize / 2) + barSize * i, 0, barSize / 2 + 1.2);
        textAnchor.rotation.set(0, Math.PI / 2, 0);
        textAnchor.add(mesh);
        this.el.setObject3D('yLabel_' + i, textAnchor);
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
