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
        
        xSuffix: {type: "string", default: ""},
        ySuffix: {type: "string", default: ""},
        zSuffix: {type: "string", default: ""},

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
        let d = this.data;

        fetch(this.data.src)
        .then((response) => response.json())
        .then(function(jsonData){

            let xValues = [];
            let yValues = [];
            let zValues = [];

            for (let i = 0; i < jsonData.length; i++) {
                xValues[i] = jsonData[i].x;
                yValues[i] = jsonData[i].y;
                zValues[i] = jsonData[i].z;
            }

            console.log(xValues.length);

            function Axes(origin, xAxis, yAxis, zAxis) {
                this.origin = origin;
                this.xAxis = xAxis;
                this.yAxis = yAxis;
                this.zAxis = zAxis;
            }

            
            const X_MAX = Math.max(...xValues);
            const Y_MAX = Math.max(...yValues);
            const Z_MAX = Math.max(...zValues);

            let axes = new Axes(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(X_MAX * d.xAxisScale + d.xAxisStart, 0, 0),
                new THREE.Vector3(0, Y_MAX * d.yAxisScale + d.yAxisStart, 0),
                new THREE.Vector3(0, 0, Z_MAX * d.zAxisScale + d.yAxisStart),
            );

            self.createPoints(jsonData);

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
                   self.createAxes(axes, xValues, yValues, zValues, font, fontTexture, X_MAX, Y_MAX, Z_MAX);
                });
            })
        });
    },

    createAxes(axes, xValues, yValues, zValues, font, fontTexture, xMax, yMax, zMax) {
        let self = this;
        let d = this.data;

        const LINE_MATERIAL = new THREE.LineBasicMaterial({color: 0x000000});
        let lines = new THREE.Geometry();
        lines.vertices.push(axes.origin, axes.xAxis);
        lines.vertices.push(axes.origin, axes.yAxis);
        lines.vertices.push(axes.origin, axes.zAxis);
        const LINE_MESH = new THREE.LineSegments(lines, LINE_MATERIAL);
        this.el.setObject3D("axes", LINE_MESH);

        const PLANE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.1, transparent: true, side: THREE.DoubleSide});
        let planeGeometries = [];
        planeGeometries.push(
            new THREE.PlaneGeometry(axes.zAxis.z, axes.yAxis.y),
            new THREE.PlaneGeometry(axes.xAxis.x, axes.zAxis.z),
            new THREE.PlaneGeometry(axes.xAxis.x, axes.yAxis.y)
        );

        let planes = [];
        for (let i = 0; i < planeGeometries.length; i++) {
            planes.push(new THREE.Mesh(planeGeometries[i], PLANE_MATERIAL));
        }

        planes[0].position.set(axes.xAxis.x / 2, axes.yAxis.y / 2, 0);

        planes[1].rotation.set(Math.PI / 2, 0, 0);
        planes[1].position.set(axes.xAxis.x / 2, 0, axes.zAxis.z / 2);

        planes[2].rotation.set(0, Math.PI / 2, 0);
        planes[2].position.set(0, axes.yAxis.y / 2, axes.zAxis.z / 2);

        for (let i = 0; i < planes.length; i++) {
           this.el.setObject3D("plane" + i, planes[i]);
        }

        function Label(text, width, position, align, rotation, textOffset, font, fontTexture, fontSize) {
                let fontGeometry = fontCreator({
                    width: width,
                    font: font,
                    letterSpacing: 1,
                    align: align, // left, right, center
                    text: text 
                });

                let mesh = new THREE.Mesh(fontGeometry, fontTexture);
                mesh.rotation.set(Math.PI, 0, 0);
                let textAnchor = new THREE.Object3D();
                textAnchor.scale.multiplyScalar(fontSize);

                textAnchor.position.set(position.x + textOffset.x, position.y + textOffset.y, position.z + textOffset.z);
                textAnchor.rotation.set(rotation.x, rotation.y, rotation.z);
                textAnchor.add(mesh);
                return textAnchor;
        }

        let labelId = 0;

        function labels(values, suffix, align, startPos, scale, offset, direction, rot, textOffset) {
            const MAX_VALUE = Math.max(...values);
            const VALUE_STEP = MAX_VALUE / 10;

            const MAX_POS = Math.max(...values) * scale + offset;
            const POS_STEP = MAX_POS / 10;

            let position = startPos;

            for (let label = 0; label <= MAX_VALUE; label += VALUE_STEP) {
                if (label != 0) {position.addScaledVector(direction, POS_STEP);}
                
                let mesh = new Label(label.toFixed(2) + suffix, 300, position, align, rot, textOffset, font, fontTexture, 0.006);

                self.el.setObject3D("label" + labelId++, mesh);
            } 
        }

        let rotX = new THREE.Vector3(-Math.PI / 2, 0, -Math.PI / 2);
        let offsetX = new THREE.Vector3(0, 0, 0);
        labels(xValues, d.xSuffix,"left", new THREE.Vector3(0, 0, zMax * d.zAxisScale), d.xAxisScale, d.xAxisStart, new THREE.Vector3(1, 0, 0), rotX, offsetX);
        
        let rotY = new THREE.Vector3(0, Math.PI / 2, 0);
        let offsetY = new THREE.Vector3(0, 0, 1.8);
        labels(yValues, d.ySuffix,"right", new THREE.Vector3(0, 0, zMax * d.zAxisScale), d.yAxisScale, d.yAxisStart, new THREE.Vector3(0, 1, 0), rotY, offsetY);
        
        let rotZ = new THREE.Vector3(-Math.PI / 2, 0, 0);
        let offsetZ = new THREE.Vector3(-1.05, 0, 0);
        labels(zValues, d.zSuffix, "right", new THREE.Vector3(xMax * d.xAxisScale, 0, 0), d.zAxisScale, d.zAxisStart, new THREE.Vector3(0, 0, 1), rotZ, offsetZ);

        let xLabel = new Label(d.xLabel, 600, new THREE.Vector3(xMax * d.xAxisScale / 2, 0, zMax * d.zAxisScale),
         "center", new THREE.Vector3(-Math.PI / 2, 0, 0), new THREE.Vector3(-1.5, 0, 1.4), font, fontTexture, 0.007);
        this.el.setObject3D("xLabel", xLabel);

        let yLabel = new Label(d.yLabel, 600, new THREE.Vector3(0, yMax * d.yAxisScale / 2, zMax * d.zAxisScale),
         "center", new THREE.Vector3(0, Math.PI / 2, Math.PI / 2), new THREE.Vector3(0, -1.5, 1.4), font, fontTexture, 0.007);
        this.el.setObject3D("yLabel", yLabel);

        let zLabel = new Label(d.zLabel, 600, new THREE.Vector3(xMax * d.xAxisScale, 0, zMax * d.zAxisScale / 2),
         "center", new THREE.Vector3(-Math.PI / 2, 0, Math.PI / 2), new THREE.Vector3(1.4, 0, 1.7), font, fontTexture, 0.007);
        this.el.setObject3D("zLabel", zLabel);

        let title = new Label(d.title, 800, new THREE.Vector3(0, yMax * d.yAxisScale, zMax * d.zAxisScale / 2),
         "center", new THREE.Vector3(0, Math.PI / 4, 0), new THREE.Vector3(0, 0.5, 1.7), font, fontTexture, 0.010);
        this.el.setObject3D("title", title);
    },

    createPoints(jsonData) {
        let d = this.data;

        const LENGTH = d.nbrOfPoints < 0 ? jsonData.length : d.nbrOfPoints;

        let geometry = new THREE.Geometry();

        let COLORS = [0xF7D969];
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
        this.points = new THREE.Points(geometry, material);

        this.el.setObject3D("points", this.points);
    },
});