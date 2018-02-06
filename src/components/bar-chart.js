AFRAME.registerComponent('bar-chart', {
    schema: {
    offset: {type: 'number', default: 1},
    color: {type: 'color', default: '#FFF'}
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D

        let testData = new DataObject();
        // http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__BE__BE0101__BE0101A/BefolkningR1860/table/tableViewLayout1/?rxid=c8454c80-d379-481b-bf82-369f75815d3a
        fetch('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningR1860', {
            method: 'post',
            headers: {
                "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8"
            },
            // For more stats use jsonObj2 instead of jsonObj
            body: JSON.stringify(jsonObj2) 
        })
        .then(response => response.json())
        .then(function(json){
            for(var i = 0; i < json.data.length; i++) {
                // This is really ineffective, will change
                var newItemY = json.data[i].key[0];
                var newItemX = json.data[i].key[1];
                if (testData.yLabels.indexOf(newItemY) === -1) {
                    testData.yLabels.unshift(newItemY);
                }
                if (testData.xLabels.indexOf(newItemX) === -1) {
                    testData.xLabels.unshift(newItemX);
                }
                testData.yValues[i] = parseInt(json.data[i].values[0]);
            }
            console.log(testData);
            callback();
        })
        .catch(function(error) {
            console.log('Request failed', error);
        })

        // Bar dimensions
        function callback() {
        const BAR_SIZE = 0.2;
        const BAR_SPACE = BAR_SIZE + 0.2;
        const BIAS = 0.01;
        var outerPlaneWidth = BAR_SPACE * testData.xLabels.length + data.offset * 2;
        var outerPlaneHeight = BAR_SPACE * testData.yLabels.length + data.offset * 2;
        
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

        var colors = [];
        for (var i = 0; i < 8; i++) {
            colors[i] = new THREE.Color(Math.random() * 0xFF0000);
        }
        var color = colors[0];

        var maxHeight = 0;
        for (var i = 0, j = 0; i < testData.getSize(); i++) {
            if (i % testData.xLabels.length == 0 && i != 0) {
                j++;   
                color = colors[j];
            }
            if (testData.yValues[i] != 0) {
                var material = new THREE.MeshBasicMaterial({color: color});
                var height = testData.yValues[i] / 50000.0;
                if (height > maxHeight) {
                    maxHeight = height;
                }
                var geometry = new THREE.BoxGeometry(BAR_SIZE, height, BAR_SIZE);
                var cube = new THREE.Mesh(geometry, material);

                cube.translateX(barPos.x + BAR_SPACE * (i % testData.xLabels.length));
                cube.translateY(height / 2 + BIAS);
                cube.translateZ(barPos.z - BAR_SPACE * j);

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
        var lineStep = maxHeight / numberOfLines;

        for (var i = 1; i <= 10; i++) {
            geometry.vertices.push(new THREE.Vector3(corner1.x, corner1.y + lineStep * i, corner1.z));
            geometry.vertices.push(new THREE.Vector3(corner2.x, corner2.y + lineStep * i, corner2.z));
            geometry.vertices.push(new THREE.Vector3(corner2.x, corner2.y + lineStep * i, corner2.z));
            geometry.vertices.push(new THREE.Vector3(corner3.x, corner3.y + lineStep * i, corner3.z));
        }
        var line = new THREE.LineSegments( geometry, material );
        object.add( line );
    }    
    },

    tick: function(time, timeDelta) {
        // This should be replaced with the value from the controllers
        const swipeLength = 0;
        
        this.el.object3D.rotateX(swipeLength);
        this.el.object3D.rotateY(swipeLength);
    }
});

// This should be moved somewhere
var jsonObj = {
	"query": [
	  {
		"code": "Alder",
		"selection": {
		  "filter": "agg:Ålder10år",
		  "values": [
			"25-34",
			"35-44"
		  ]
		}
	  },
	  {
		"code": "Tid",
		"selection": {
		  "filter": "item",
		  "values": [
			"2013",
			"2014",
			"2015",
			"2016"
		  ]
		}
	  }
	],
	"response": {
	  "format": "json"
	}
  }

var jsonObj2 = {
    "query": [
      {
        "code": "Alder",
        "selection": {
          "filter": "agg:Ålder5år",
          "values": [
            "-4",
            "5-9",
            "10-14",
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-39",
            //"40-44",
            //"45-49",
            //"50-54",
            //"55-59",
            //"60-64",
            //"65-69",
            //"70-74",
            //"75-79",
            //"80-84",
            //"85-89",
            //"90-94",
            //"95-99",
            //"100+"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  }

function DataObject() {
    this.yLabels = [];
    this.xLabels = [];
    this.yValues = []; 
    this.getSize = function() {
        return this.xLabels.length * this.yLabels.length;
    }
}