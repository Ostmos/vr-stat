AFRAME.registerComponent('bar-chart', {
    schema: {
    outerPlaneSize: {type: 'number', default: 10},
    offset: {type: 'number', default: 1},
    color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D

        var innerPlaneSize = data.outerPlaneSize - data.offset * 2;

        // Outer plane
        var outerPlaneGeometry = new THREE.PlaneGeometry(data.outerPlaneSize, data.outerPlaneSize);
        outerPlaneGeometry.rotateX(Math.PI / 2);
        var outerPlaneMaterial = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
        var outerPlane = new THREE.Mesh(outerPlaneGeometry, outerPlaneMaterial);
        
        object.add(outerPlane);

        // Test data
        var heights = new Array(400);
        for (var i = 0; i < 400; i++) {
            heights[i] = Math.floor(Math.random() * Math.floor(data.outerPlaneSize));
        }

        // Bars
        var barWidth = (innerPlaneSize / Math.sqrt(heights.length));
        var barPos = new THREE.Vector3(
            -innerPlaneSize / 2 + barWidth / 2,
            0, 
            innerPlaneSize / 2 - barWidth / 2,
        );

        for (var i = 0, j = 0; i < heights.length; i++) {
            if (i % Math.sqrt(heights.length) == 0 && i != 0) {
                j++;   
            }
            if (heights[i] != 0) {
                var color = new THREE.Color(Math.random() * 0xFF0000);
                var material = new THREE.MeshBasicMaterial({color: color});
                var geometry = new THREE.BoxGeometry(barWidth, heights[i], barWidth);
                var cube = new THREE.Mesh(geometry, material);

                cube.translateX(barPos.x + barWidth * (i % 20));
                cube.translateY(heights[i] / 2);
                cube.translateZ(barPos.z - barWidth * j);

                object.add(cube);
            }
        }

        // Lines
        const lengthToCorners = data.outerPlaneSize / 2;

        var corner1 = new THREE.Vector3(-lengthToCorners, 0, lengthToCorners);
        var corner2 = new THREE.Vector3(-lengthToCorners, 0, -lengthToCorners);
        var corner3 = new THREE.Vector3(lengthToCorners, 0, -lengthToCorners);

        var material = new THREE.LineBasicMaterial({color: 0x2A363B});
        var geometry = new THREE.Geometry();
        
        const numberOfLines = 10;
        var lineStep = Math.max(...heights) / numberOfLines;

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