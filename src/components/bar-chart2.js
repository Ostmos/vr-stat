AFRAME.registerComponent("bar-chart2", {

    schema: {
        src: {type: "asset", default: "empty"},
        chartPadding: {type: "number", default: 0.01},
        chartHeight: {type: "number", default: 1},
        barSize: {type: "number", default: 0.1},
        barPadding: {type: "number", default: 0.05},
        scale: {type: "number", default: 1}
    },
 
    init: function () {
        var data = this.data;
        var el = this.el;

        const twitterData = JSON.parse(`{
            "stats": {
                "lengths": {"x": 4, "y": 3},
                "xLabels": [{"0": "Trump"}, {"1": "Hillary"}, {"2": "Mark"}, {"3": "Cruz"}],
                "zLabels": [{"0": "2015"}, {"1": "2016"}, {"2": "2017"}],
                "maxValue": 1231,
                "values": [
                    {"x": 0, "y": 0, "value": 50},
                    {"x": 0, "y": 1, "value": 100},
                    {"x": 0, "y": 2, "value": 23},
                    {"x": 1, "y": 0, "value": 651},
                    {"x": 1, "y": 1, "value": 19},
                    {"x": 1, "y": 2, "value": 1000},
                    {"x": 2, "y": 0, "value": 123},
                    {"x": 2, "y": 1, "value": 1012},
                    {"x": 2, "y": 2, "value": 1231},
                    {"x": 3, "y": 0, "value": 123},
                    {"x": 3, "y": 1, "value": 20},
                    {"x": 3, "y": 2, "value": 0}
                ]
            }
        }`);

        this.createChart(twitterData.stats, this.data);
    },

    createChart: function(stats, data) {
        // The grid is basically a spreadsheet(columns x rows)
        let gridBoxSize = data.barSize + data.barPadding * 2; 
        let gridWidth = stats.lengths.x * gridBoxSize; 
        let gridHeight = stats.lengths.y * gridBoxSize;

        // Chart plane
        let planeGeometry = new THREE.PlaneGeometry(
            gridWidth + data.chartPadding * 2, 
            gridHeight + data.chartPadding * 2
        );
        let planeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotation.x = Math.PI / 2;
        this.el.setObject3D("planeMesh", planeMesh);

        // Bars
        let gridStartPosition = new THREE.Vector2(-gridWidth / 2 + gridBoxSize / 2, gridHeight / 2 - gridBoxSize / 2);
        let heightRatio = 1 / stats.maxValue;
        for (let dataPoint of stats.values) {
            let barHeight = data.chartHeight * heightRatio * dataPoint.value;
            if (barHeight > 0.0001) {
                var geometry = new THREE.BoxBufferGeometry(data.barSize, barHeight, this.data.barSize);
                var material = new THREE.MeshStandardMaterial({color: 0x0AAAAAF});
                var mesh = new THREE.Mesh(geometry, material);
                
                mesh.position.set(
                    gridStartPosition.x + gridBoxSize * dataPoint.x,
                    barHeight / 2,
                    gridStartPosition.y - gridBoxSize * dataPoint.y
                );
                
                this.el.object3D.add(mesh);
            }
        }

    }

    
});