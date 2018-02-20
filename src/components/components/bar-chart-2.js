AFRAME.registerComponent('bar-chart-2', {
    schema: {
        offset: { type: 'number', default: 1 },
        barSize: { type: 'number', default: 0.05 },
        barPadding: { type: 'number', default: 0.05 },
        panelBoxPadding: { type: 'number', default: 0 },
        color: { type: 'color', default: '#FFF' },
        textColor: { type: 'color', default: '#000000' }
    },

    init: function () {
        var data = this.data;
        var entity = this.el;
        var object = this.el.object3D

        var z = ['2013', '2014', '2015', '2016'];
        var x = ['Göteborg', 'Stockholm', 'Omrade2', 'Omrade3', 'Omrade4', 'Omrade5'];
        var y = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        var values = [];
        for (var i = 0; i < x.length * z.length; i++) {
            values[i] = (Math.random());
        }

        const BAR_TOT_SIZE = (data.barPadding * 2) + data.barSize;
        const WIDTH = BAR_TOT_SIZE * x.length;
        const DEPTH = BAR_TOT_SIZE * z.length;

        //  geometry="primitive: box; width: 0.5; height: 0.5; depth: 0.5
        entity.parentNode.setAttribute("geometry", "primitive: box; width: 0.5; height: 0.5; depth: 0.5");

        var panelBox = createPanelBox(WIDTH, DEPTH, data.panelBoxPadding, data.barSize,
            BAR_TOT_SIZE, data.textColor, x, z);
        entity.appendChild(panelBox);

        createLevelLines(WIDTH, DEPTH, panelBox, data.textColor, y, data.barSize);

        //createBars(WIDTH, DEPTH, x.length, z.length, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor);
        createBars(WIDTH, DEPTH, x, z, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor);
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
            x: width / 2, y: 0.00, z: ((depth / 2) - barTotalSize / 2) - barTotalSize * i
        });
        panelBox.appendChild(label);
    }

    for (var i = 0; i < xLabels.length; i++) {
        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", xLabels[i]);
        label.setAttribute("rotation", "-90 90 0");
        label.setAttribute("color", textColor);
        label.setAttribute("position", {
            x: ((width / 2) - barTotalSize / 2) - barTotalSize * i, y: 0.00, z: width / 2 + barTotalSize / 1.2
        });
        panelBox.appendChild(label);
    }

    return panelBox;
};


function createLevelLines(width, depth, panelBox, textColor, yLabels, barSize) {
    var corner1 = new THREE.Vector3(-width / 2, 0, depth / 2);
    var corner2 = new THREE.Vector3(-width / 2, 0, -depth / 2);
    var corner3 = new THREE.Vector3(width / 2, 0, -depth / 2);
    const numberOfLines = 10;
    const maxHeight = 1
    var lineStep = maxHeight / numberOfLines;
    var lines = document.createElement("a-entity");
    for (var i = 1; i <= 10; i++) {
        var line = document.createElement("a-entity");
        var c1 = corner1.x + ", " + corner1.y + lineStep * i + ", " + corner1.z + ";";
        var c2 = corner2.x + ", " + corner2.y + lineStep * i + ", " + corner2.z + ";";
        var c3 = corner3.x + ", " + corner3.y + lineStep * i + ", " + corner3.z + ";";
        var color = "color: red"; 
        var lineAtribute_1 = "start :" + c1 + "end: "+ c2 + color;
        var lineAtribute_2 = "start :" + c3 + "end: "+ c2 + color;
        line.setAttribute("line__1", lineAtribute_1);
        line.setAttribute("line__2", lineAtribute_2);
        lines.appendChild(line);

        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", yLabels[i-1]);
        label.setAttribute("rotation", "0 90 0");
        label.setAttribute("color", textColor);
        label.setAttribute("position", {
            x: corner1.x, y: (corner1.y + lineStep * i), z: (corner1.z + 0.1)
        });
        lines.appendChild(label);
    }
    panelBox.appendChild(lines);
}

function createBars(width, depth, xLabels, zLabels, values, barSize, barTotalSize, panelBox, textColor) {
    const OFFSET = barTotalSize / 2;
    var pos = {x: 0, y: 0, z: 0}; 
    var z = 0;
    var labX, labY, labZ;
    for (var i = 0; i < values.length; i++) {
        var bar = document.createElement("a-box");


        bar.setAttribute("width", barSize);
        bar.setAttribute("depth", barSize);
        bar.setAttribute("height", values[i]);
        bar.setAttribute("color", "#F9D423");
        bar.setAttribute("transparent", "true");
        bar.setAttribute("opacity", "0.9");

        labY = Math.floor(values[i] * 100);
        labX = xLabels[i % xLabels.length];
        if(i % xLabels.length == 0 && i != 0){
            ++z;
        }  
        labZ = zLabels[z]; 

        bar.setAttribute("labelX", labX);
        bar.setAttribute("labelY", labY);
        bar.setAttribute("labelZ", labZ);

        bar.setAttribute("hoverable","");
        bar.setAttribute("controller-listener","");

        pos.x = (pos.x + barTotalSize) % width;

        pos.y = values[i] / 2;


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
        var val = values[i] * 100;
        label.setAttribute("value", Math.floor(val));
        label.setAttribute("rotation", "0 0 0")
        label.setAttribute("color", textColor);
        label.setAttribute("align", "center");
        label.setAttribute("position", {
            x: 0, y: values[i] / 2 + barSize / 2, z: 0
        });
        label.setAttribute("visible", "false");
        
        bar.appendChild(label);

        panelBox.appendChild(bar);
    }
};

