AFRAME.registerComponent('bar-chart', {
    schema: {
    offset: {type: 'number', default: 1},
    color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D

        // Test data
        testData = {
            yLabels: ["Reg1", "Reg2", "Reg3", "Reg4", "Reg5", "Reg6"],
            xLabels: ["2015", "2016", "2017", "2018"],
            yRange: [0, 100],
            yValues: [],
            getSize: function() {
                return this.xLabels.length * this.yLabels.length;
            }
        };

        for (var i = 0; i < testData.getSize(); i++) {
            testData.yValues[i] = Math.floor(Math.random() * 10);
        }

            // Bar dimensions
        const BAR_SIZE = 1;
        const BIAS = 0.01;
        var outerPlaneWidth = BAR_SIZE * testData.xLabels.length + data.offset * 2;
        var outerPlaneHeight = BAR_SIZE * testData.yLabels.length + data.offset * 2;

        // Outer plane
        var outerPlaneGeometry = new THREE.PlaneGeometry(outerPlaneWidth, outerPlaneHeight);
        outerPlaneGeometry.rotateX(Math.PI / 2);
        var outerPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
        var outerPlane = new THREE.Mesh(outerPlaneGeometry, outerPlaneMaterial);

        object.add(outerPlane);

        var innerPlaneWidth = outerPlaneWidth - data.offset * 2;
        var innerPlaneHeight = outerPlaneHeight - data.offset * 2;

        var barPos = new THREE.Vector3(
            -innerPlaneWidth / 2 + BAR_SIZE / 2,
            0, 
            innerPlaneHeight / 2 - BAR_SIZE / 2,
        );

        
        for (var i = 0, j = 0; i < testData.getSize(); i++) {
            if (i % testData.xLabels.length == 0 && i != 0) {
                j++;   
            }
            if (testData.yValues[i] != 0) {
                var color = new THREE.Color(Math.random() * 0xFF0000);
                var material = new THREE.MeshBasicMaterial({color: color});
                var geometry = new THREE.BoxGeometry(BAR_SIZE, testData.yValues[i], BAR_SIZE);
                var cube = new THREE.Mesh(geometry, material);

                cube.translateX(barPos.x + BAR_SIZE * (i % testData.xLabels.length));
                cube.translateY(testData.yValues[i] / 2 + BIAS);
                cube.translateZ(barPos.z - BAR_SIZE * j);

                object.add(cube);
            }
        }

        // Lines
        var corner1 = new THREE.Vector3(-outerPlaneWidth / 2, 0, outerPlaneHeight / 2);
        var corner2 = new THREE.Vector3(-outerPlaneWidth / 2, 0, -outerPlaneHeight / 2);
        var corner3 = new THREE.Vector3(outerPlaneWidth / 2, 0, -outerPlaneHeight / 2);

        var material = new THREE.LineBasicMaterial({color: 0x2A363B});
        var geometry = new THREE.Geometry();
        
        const numberOfLines = 10;
        var lineStep = Math.max(...testData.yValues) / numberOfLines;

        for (var i = 1; i <= 10; i++) {
            geometry.vertices.push(new THREE.Vector3(corner1.x, corner1.y + lineStep * i, corner1.z));
            geometry.vertices.push(new THREE.Vector3(corner2.x, corner2.y + lineStep * i, corner2.z));
            geometry.vertices.push(new THREE.Vector3(corner2.x, corner2.y + lineStep * i, corner2.z));
            geometry.vertices.push(new THREE.Vector3(corner3.x, corner3.y + lineStep * i, corner3.z));
        }
        var line = new THREE.LineSegments( geometry, material );
        object.add( line );
    },

    tick: function(time, timeDelta) {
        // This should be replaced with the value from the controllers
        const swipeLength = 0.001;
        
        this.el.object3D.rotateX(swipeLength);
        this.el.object3D.rotateY(swipeLength);
    }
});