var fontCreator = require('three-bmfont-text');
var fontLoader = require('load-bmfont');
var SDFShader = require('../shaders/sdf');

AFRAME.registerComponent("bar-chart", {

    schema: {
        src: {type: "asset", default: "empty"},

        title: {type: "string", default: ""},
        xLabel: {type: "string", default: ""},
        yLabel: {type: "string", default: ""},
        suffix: {type: "string", default: ""},

        yScale: {type: "number", default: 1.0},
        scale: {type: "number", default: 1.0},
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

        let scale = this.data.scale;
        this.el.object3D.scale.set(scale, scale, scale);
    },

    createChart: function(bars) {
        var data = this.data;

        // Values
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
        const PANEL_START_POS = -PANEL_WIDTH / 2 + BAR_TOTAL_SIZE / 2; 
        const PLANE_GEOMETRY = new THREE.PlaneGeometry(PANEL_WIDTH, PANEL_DEPTH);
        const PLANE_MATERIAL = new THREE.MeshBasicMaterial({color: 0xACDBC9, side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(PLANE_GEOMETRY, PLANE_MATERIAL);
        planeMesh.rotation.x = Math.PI / 2;
        this.el.setObject3D("planeMesh", planeMesh);

        // Load texture
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
                self.createBars(yValues, PANEL_START_POS, BAR_TOTAL_SIZE, PANEL_WIDTH, font, fontTexture);
                self.createLabels(xLabels, BAR_TOTAL_SIZE, PANEL_WIDTH, font, fontTexture);
                self.createTitle(Math.max(...yValues), PANEL_WIDTH, font, fontTexture);
                self.createYAxis(Math.max(...yValues), PANEL_WIDTH, font, fontTexture);
            });
        })
        
    },

    createBars: function(yValues, startPos, totalBarSize, panelWidth, font, fontTexture){
        let data = this.data;

        for(let i = 0; i < yValues.length; i++){
            const BAR_GEOMETRY = new THREE.BoxBufferGeometry(data.barWidth, yValues[i] * data.yScale, data.barWidth);
            const BAR_MATERIAL = new THREE.MeshStandardMaterial({color: 0xF48B94});
            let barMesh = new THREE.Mesh(BAR_GEOMETRY, BAR_MATERIAL);
            barMesh.position.set(startPos + totalBarSize * i, yValues[i] / 2 * data.yScale, 0);
            this.el.setObject3D("bars" + i, barMesh);

            var fontGeometry = fontCreator({
                width: 200,
                font: font,
                letterSpacing: 1,
                align: "center",
                text: yValues[i] + data.suffix
            })

            var mesh = new THREE.Mesh(fontGeometry, fontTexture);
            mesh.rotation.set(Math.PI, 0, 0);
            mesh.scale.multiplyScalar(0.004);
            mesh.position.set(-totalBarSize / 1.3, yValues[i] / 2 * data.yScale + 0.05, 0);
            barMesh.add(mesh);
        }
    },

    createLabels: function(xLabels, barSize, planeWidth, font, fontTexture) {
        for (let i = 0; i < xLabels.length; i++) {
            var fontGeometry = fontCreator({
                width: 300,
                font: font,
                letterSpacing: 1,
                align: "right",
                text: xLabels[i]
            })

            var mesh = new THREE.Mesh(fontGeometry, fontTexture);
            var textAnchor = new THREE.Object3D();
            textAnchor.scale.multiplyScalar(0.004);
            // 1.2 is magic, should fix that
            textAnchor.position.set((-planeWidth / 2 + barSize / 2) + barSize * i, 0, barSize / 2 + 1.2);
            textAnchor.rotation.set(Math.PI / 2, 0, -Math.PI / 2);
            textAnchor.add(mesh);
            this.el.setObject3D('xLabel' + i, textAnchor);
        }
    },

    createTitle: function(yMax, panelWidth, font, fontTexture) {
        var fontGeometry = fontCreator({
            width: 1000,
            font: font,
            letterSpacing: 1,
            align: "left",
            text: this.data.title
        })
        var mesh = new THREE.Mesh(fontGeometry, fontTexture);
        mesh.rotation.set(Math.PI, 0, 0);
        mesh.scale.multiplyScalar(0.006);
        const TITLE_OFFSET = 0.7;
        mesh.position.set(-panelWidth / 2, yMax * this.data.yScale + TITLE_OFFSET, 0);
        this.el.setObject3D('title', mesh);
    },

    createYAxis: function(yMax, panelWidth, font, fontTexture) {
        let CEIL = Math.ceil(yMax / 10) * 10;
        const LINE_STEP = 10; 
        for (let i = 0; i <= CEIL; i+= LINE_STEP) {
            var fontGeometry = fontCreator({
                width: 300,
                font: font,
                letterSpacing: 1,
                align: "right",
                text: String(i) + this.data.suffix  
            })
            var mesh = new THREE.Mesh(fontGeometry, fontTexture);
            mesh.rotation.set(Math.PI, 0, 0);
            mesh.scale.multiplyScalar(0.004);
            mesh.position.set(-panelWidth / 2 - 1.2, i * this.data.yScale, 0);
            this.el.setObject3D('yLabel' + i, mesh);
        }

        let material = new THREE.LineBasicMaterial({color: 0x2A363B});
        let lines = new THREE.Geometry();
        lines.vertices.push(new THREE.Vector3(-panelWidth / 2, 0, 0));
        lines.vertices.push(new THREE.Vector3(-panelWidth / 2, (CEIL + LINE_STEP / 2) * this.data.yScale, 0));
        let line = new THREE.LineSegments(lines, material);
        this.el.setObject3D('yAxis', line);
    }

});