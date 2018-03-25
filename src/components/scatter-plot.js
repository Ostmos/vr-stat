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
        var maxValue = Math.max(...values);

        const BAR_TOT_SIZE = (data.barPadding * 2) + data.barSize;
        const WIDTH        = BAR_TOT_SIZE * x.length;
        const DEPTH        = BAR_TOT_SIZE * z.length;
        const MAX_HEIGHT   = 1;

        setTitle(this.el, data.title, MAX_HEIGHT, DEPTH);

        var panelBox = createPanelBox(WIDTH, DEPTH, data.panelBoxPadding, data.barSize,
            BAR_TOT_SIZE, data.textColor, x, z);
        entity.appendChild(panelBox);


        //createLevelLines(WIDTH, DEPTH, maxValue, panelBox, data.textColor, y, data.barSize);

        //createLevelLines(WIDTH, DEPTH, maxValue, MAX_HEIGHT, panelBox, data.textColor, y, data.barSize);


        createSpheres(WIDTH, DEPTH, x, z, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor, maxValue);
        // createBars(WIDTH, DEPTH, x, z, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor);
    },
});

function createPanelBox(width, depth, padding, barSize, barTotalSize, textColor, xLabels, zLabels) {
    var panelBox = document.createElement("a-box");
    panelBox.setAttribute('height', '0.03');
    panelBox.setAttribute('width', width + padding);
    panelBox.setAttribute('depth', depth + padding);
    panelBox.setAttribute('color', "#2A363B");

    for (var i = 0; i < zLabels.length; i++) {
        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", zLabels[i]);
        label.setAttribute("rotation", "-90 0 0");
        label.setAttribute("color", textColor);
        label.setAttribute("position", {
            x: width / 2 + barSize / 1.3, y: 0.00, z: depth / 2 - barTotalSize / 2 - barTotalSize * i
        });
        panelBox.appendChild(label);
    }

    for (var i = 0; i < xLabels.length; i++) {
        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", xLabels[i]);
        label.setAttribute("rotation", "-90 90 0");
        label.setAttribute("color", textColor);
        label.setAttribute("align", "right")
        label.setAttribute("position", {
            x: width / 2 - barTotalSize / 2 - barTotalSize * i, y: 0.00, z: width / 2 - barTotalSize / 1.3
        });
        panelBox.appendChild(label);
    }

    return panelBox;
};



function createSpheres(width, depth, xLabels, zLabels, values, barSize, barTotalSize, panelBox, textColor, maxValue) {
    const OFFSET = barTotalSize / 2;
    const sphereRadius = barTotalSize / 8;
    var color_1 = ["#E1F5C4", "#ECE473", "#F9D423", "#F6903D", "#F05053"]
    var c = color_1;


    var pos = {x: 0, y: 0, z: 0}; 
    var z = 0;
    var labX, labY, labZ;

    for (var i = 0; i < values.length; i++) {
        var val = values[i] / maxValue;
        var bar = document.createElement("a-sphere");

        bar.setAttribute("radius", sphereRadius);
        bar.setAttribute("transparent", "true");
        bar.setAttribute("opacity", "0.9");

        var colour;
        if (val <= 0.2) colour = c[0];
        else if(val <= 0.4) colour = c[1];
        else if(val <= 0.6) colour = c[2];
        else if(val <= 0.8) colour = c[3];
        else colour = c[4];
        bar.setAttribute("color", colour);

        labY = Math.floor(values[i]);
        labX = xLabels[i % xLabels.length];
        if(i % xLabels.length == 0 && i != 0){
            ++z;
        }  
        labZ = zLabels[z]; 

        bar.setAttribute("labelX", labX);
        bar.setAttribute("labelY", labY);
        bar.setAttribute("labelZ", labZ);

        bar.setAttribute("hoverable","");
        bar.setAttribute("bar-listener","");

        pos.x = (pos.x + barTotalSize) % width;

        pos.y = val;

        if (i % xLabels.length == 0) {
            pos.z += barTotalSize;
        }

        bar.setAttribute("position", {
            x: (pos.x - width / 2) + OFFSET,
            y: pos.y,
            z: (pos.z - depth / 2) - OFFSET
        });

        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", Math.floor(values[i]));
        label.setAttribute("rotation", "0 0 0")
        label.setAttribute("color", textColor)
        label.setAttribute("align", "center");
        label.setAttribute("position", {
            x: 0, y: sphereRadius * 2, z: 0
        });
        label.setAttribute("visible", "false");
        
        bar.appendChild(label);

        panelBox.appendChild(bar);
    }
};


