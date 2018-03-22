var fontCreator = require('three-bmfont-text');
var fontLoader = require('load-bmfont');
var SDFShader = require('../shaders/sdf');

var bar;

AFRAME.registerComponent("bar-chart", {


    schema: {
        src: {type: "asset", default: "empty"},

        title: {type: "string", default: ""},
        xLabel: {type: "string", default: ""},
        yLabel: {type: "string", default: ""},

        scale: {type: "number", default: 1},
        barWidth: {type: "number", default: 0.3},
        barPadding: {type: "number", default: 0.1},
        fontSize: {type: "number", default: 2}
    },
 
    init: function () {
        var self = this;

        fetch(this.data.src)
        .then((response) => response.json())
        .then(function(jsonData){
            self.createChart(jsonData);
        });
    },

    createChart: function(bars) {
        var data = this.data;

        let xLabels = [];
        let yValues = [];

        for (let i = 0; i < bars.length; i++) {
            xLabels[i] = bars[i].x;
            yValues[i] = bars[i].y;
        }

        // Plane
        const BAR_TOTAL_SIZE = data.barWidth + data.barPadding * 2;
        const PANEL_WIDTH = bars.length * BAR_TOTAL_SIZE;
        const PANEL_DEPTH = BAR_TOTAL_SIZE;
        const PLANE_GEOMETRY = new THREE.PlaneGeometry(PANEL_WIDTH, PANEL_DEPTH);
        const PLANE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xACDBC9, side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(PLANE_GEOMETRY, PLANE_MATERIAL);
        planeMesh.rotation.x = Math.PI / 2;
        this.el.setObject3D("planeMesh", planeMesh);
        
        // Bars
        const PANEL_START_POS = -PANEL_WIDTH / 2 + BAR_TOTAL_SIZE / 2; 
        for(let i = 0; i < bars.length; i++){
            const BAR_GEOMETRY = new THREE.BoxBufferGeometry(data.barWidth, bars[i].y * data.scale, data.barWidth);
            const BAR_MATERIAL = new THREE.MeshStandardMaterial({color: 0xF48B94});
            let barMesh = new THREE.Mesh(BAR_GEOMETRY, BAR_MATERIAL);
            barMesh.position.set(PANEL_START_POS + BAR_TOTAL_SIZE * i, bars[i].y / 2 * data.scale, 0);
            this.el.setObject3D("bar" + i, barMesh);
        }

        this.createLabels(xLabels, yValues, BAR_TOTAL_SIZE, PANEL_WIDTH);
    },

    createLabels: function(xLabels, yValues, barSize, planeWidth) {
        // Font
        var self = this;
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load('./src/assets/fonts/dejavu/DejaVu-sdf.png', function (texture) {
            texture.needsUpdate = true;
            texture.anisotropy = 16;

            var material = new THREE.RawShaderMaterial(SDFShader({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                color: 0x00000 
            }))
            
            fontLoader('./src/assets/fonts/dejavu/DejaVu-sdf.fnt', function(err, font) {
                const TEXT_WIDTH = 300;
                for (let i = 0; i < xLabels.length; i++) {
                    var geometry = fontCreator({
                        width: TEXT_WIDTH,
                        font: font,
                        letterSpacing: 1,
                        align: "left",
                        text: xLabels[i]
                    })
                    var mesh = new THREE.Mesh(geometry, material);
                    var textAnchor = new THREE.Object3D();
                    textAnchor.scale.multiplyScalar(-0.004);
                    textAnchor.position.set((-planeWidth / 2 + barSize / 2) + barSize * i, 0, barSize / 2);
                    textAnchor.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
                    textAnchor.add(mesh);

                    self.el.setObject3D('mesh' + i, textAnchor);
                }
            });
        })
    },


    /*createChart: function(stats, data) {
        // The grid is basically a spreadsheet(columns x rows)
        /*let gridBoxSize = data.barSize + data.barPadding * 2; 
        let gridWidth = stats.lengths.x * gridBoxSize; 
        let gridHeight = gridBoxSize;

        let totalGridWidth = gridWidth + data.chartPadding * 2;
        let totalGridHeight = gridHeight + data.chartPadding * 2;

        // Chart plane
        let planeGeometry = new THREE.PlaneGeometry(
            totalGridWidth,
            totalGridHeight
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = Math.PI / 2;
        this.el.setObject3D("planeMesh", planeMesh);

        // Bars
        let gridStartPosition = new THREE.Vector2(-gridWidth / 2 + gridBoxSize / 2, 0);
        let heightRatio = 1 / stats.maxValue;
        var barId = 0;
        for (let dataPoint of stats.values) {
            let barHeight = data.chartHeight * heightRatio * dataPoint.value;
            if (barHeight > 0.0001) {
                var geometry = new THREE.BoxBufferGeometry(data.barSize, barHeight, this.data.barSize);
                var material = new THREE.MeshStandardMaterial({color: 0xFF847C});
                var mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(
                    gridStartPosition.x + gridBoxSize * dataPoint.x,
                    barHeight / 2,
                    gridStartPosition.y
                );
                this.el.setObject3D("bar" + barId++ , mesh);
            }
        }

        let index = 0;
        for (let indexValuePair of stats.xLabels) {
            var label = this.createLabel(
                indexValuePair.value, {x: -90, y: 90, z: 0},
                {x: (-totalGridWidth / 2 + gridBoxSize / 2) + (gridBoxSize * index++), y: 0, z: totalGridWidth / 2},
                "right");
            this.el.appendChild(label);
        }

        let lineMaterial = new THREE.LineBasicMaterial({color: 0x2A363B});
        var lineGeometry = new THREE.Geometry();

        let leftCorner = new THREE.Vector3(-gridWidth / 2, 0, -gridHeight / 2);
        let rightCorner = new THREE.Vector3(gridWidth / 2, 0, -gridHeight / 2);

        let linestep = 0.1;
        for (i = 0; i < 11; i++) {
            lineGeometry.vertices.push(new THREE.Vector3(leftCorner.x, linestep * i, leftCorner.z));
            lineGeometry.vertices.push(new THREE.Vector3(rightCorner.x, linestep * i, rightCorner.z));
            var lineLabel = this.createLabel(i, {x: 0, y: 0, z: 0}, {x:leftCorner.x, y: linestep * i, z: rightCorner.z}, "right");
            this.el.appendChild(lineLabel);
        }
        
        let line = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.el.setObject3D("lines", line);
    },*/

    createLabel: function(text, rotation, position, alignment) {
        var label = document.createElement("a-text");
        label.setAttribute("width", this.data.fontSize);
        label.setAttribute("value", text),
        label.setAttribute("color", "#000000");
        label.setAttribute("side", "double");
        label.setAttribute("rotation", rotation);
        label.setAttribute("position", position);
        label.setAttribute("align", alignment);
        return label;
    }
    
});