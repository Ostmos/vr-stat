AFRAME.registerComponent('bar-chart', {
    schema: {
        offset: { type: 'number', default: 1 },
        barSize: { type: 'number', default: 0.05 },
        barPadding: { type: 'number', default: 0.05 },
        panelBoxPadding: { type: 'number', default: 0 },
        color: { type: 'color', default: '#FFF' },
        textColor: { type: 'color', default: '#000000' },
        title: { type: 'string', default: '' }
    },

    init: function () {
        var data = this.data;
        var entity = this.el;
        var object = this.el.object3D

        //var z = ['2013', '2014', '2015', '2016', '2017'];
        //var x = ['Göteborg', 'Stockholm', 'Omrade2', 'Omrade3', 'Omrade4', 'Omrade5', 'Omrdae8', 'Omrdae9'];
        var y = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        var x = ['Sydsverige', 'Smaland med oarna', 'Norra mellansverige', 'Vastsverige', 'Ostra mellansverige', 'Stockholms lan', 'Ovre Norrland', 'Mellersta Norrland'];
        var z = ['2017K4', '2016K4', '2017K3', '2016K1', '2016K3', '2017K2', '2016K2', '2017K1'];
        var values =  [142, 543, 475, 369, 159, 544, 455, 373, 206, 694, 661, 407, 201, 639, 705, 436, 176, 425, 480, 314, 184, 396, 480, 337, 197, 416, 455, 352, 192, 398, 424, 397, 237, 666, 652, 454, 250, 685, 619, 456, 261, 493, 576, 450, 251, 507, 586, 427, 123, 240, 280, 191, 135, 197, 266, 224, 84, 224, 303, 176, 77, 192, 329, 166];
        
        //var values = [];
        //for (var i = 0; i < x.length * z.length; i++) {
        //    values[i] = (Math.random() * 1000);
        //}
        var maxValue = Math.max(...values);



        const BAR_TOT_SIZE = (data.barPadding * 2) + data.barSize;
        const WIDTH = BAR_TOT_SIZE * x.length;
        const DEPTH = BAR_TOT_SIZE * z.length;
        const MAX_HEIGHT = 1;

        setTitle(this.el, data.title, MAX_HEIGHT, DEPTH);

        var panelBox = createPanelBox(WIDTH, DEPTH, data.panelBoxPadding, data.barSize,
            BAR_TOT_SIZE, data.textColor, x, z);
        entity.appendChild(panelBox);



        createLevelLines(WIDTH, DEPTH, maxValue, MAX_HEIGHT, panelBox, data.textColor, y, data.barSize);

        //createBars(WIDTH, DEPTH, x.length, z.length, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor);
        createBars(WIDTH, DEPTH, x, z, values, data.barSize, BAR_TOT_SIZE, panelBox, data.textColor, maxValue);
    },
});

function createPanelBox(width, depth, padding, barSize, barTotalSize, textColor, xLabels, zLabels) {
    var panelBox = document.createElement("a-box");
    panelBox.setAttribute('height', '0.03');
    panelBox.setAttribute('width', width + padding);
    panelBox.setAttribute('depth', depth + padding);
    panelBox.setAttribute('color', "#2A363B");
    panelBox.setAttribute('transparent', 'true');
    panelBox.setAttribute('opacity', '0.5');

    for (var i = 0; i < zLabels.length; i++) {
        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", zLabels[i]);
        label.setAttribute("rotation", "-90 0 0");
        label.setAttribute("color", textColor);
        label.setAttribute("position", {
            x: width / 2, y: 0.00, z: depth / 2 - barTotalSize / 2 - barTotalSize * i
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
            x: width / 2 - barTotalSize / 2 - barTotalSize * i, y: 0.00, z: width / 2
        });
        panelBox.appendChild(label);
    }

    var label = document.createElement("a-text");
    label.setAttribute("width", barSize * 25);
    label.setAttribute("value", "Number of sold vacation properties");
    label.setAttribute("rotation", "0 90 90");
    label.setAttribute("color", textColor);
    label.setAttribute("align", "right")
    label.setAttribute("position", {
        x: -width / 2, y: width / 1.2, z: width / 2 + barTotalSize * 2
    });
    panelBox.appendChild(label);

    return panelBox;
};


function createLevelLines(width, depth, maxValue, maxHeight, panelBox, textColor, yLabels, barSize) {
    var corner1 = new THREE.Vector3(-width / 2, 0, depth / 2);
    var corner2 = new THREE.Vector3(-width / 2, 0, -depth / 2);
    var corner3 = new THREE.Vector3(width / 2, 0, -depth / 2);
    const numberOfLines = 10;

    var lineStep = maxHeight / numberOfLines;
    var labelStep = maxValue / numberOfLines
    var lines = document.createElement("a-entity");
    for (var i = 1; i <= 10; i++) {
        var line = document.createElement("a-entity");
        var c1 = corner1.x + ", " + corner1.y + lineStep * i + ", " + corner1.z + ";";
        var c2 = corner2.x + ", " + corner2.y + lineStep * i + ", " + corner2.z + ";";
        var c3 = corner3.x + ", " + corner3.y + lineStep * i + ", " + corner3.z + ";";
        var color = "color: black"; 
        var lineAtribute_1 = "start :" + c1 + "end: "+ c2 + color;
        var lineAtribute_2 = "start :" + c3 + "end: "+ c2 + color;
        line.setAttribute("line__1", lineAtribute_1);
        line.setAttribute("line__2", lineAtribute_2);
        lines.appendChild(line);

        var label = document.createElement("a-text");
        label.setAttribute("width", barSize * 25);
        label.setAttribute("value", Math.floor(labelStep * i));
        label.setAttribute("rotation", "0 90 0");
        label.setAttribute("align", "right")
        label.setAttribute("color", textColor);
        label.setAttribute("position", {
            x: corner1.x, y: corner1.y + lineStep * i, z: corner1.z + 0.01
        });
        lines.appendChild(label);
    }
    panelBox.appendChild(lines);
}

function createBars(width, depth, xLabels, zLabels, values, barSize, barTotalSize, panelBox, textColor, maxValue) {
    const OFFSET = barTotalSize / 2;
    var color_1 = ["#E1F5C4", "#ECE473", "#F9D423", "#F6903D", "#F05053"]
    var c = color_1;
    var pos = {x: 0, y: 0, z: 0}; 
    var z = 0;
    var labX, labY, labZ;
    for (var i = 0; i < values.length; i++) {
        var val = (values[i] / maxValue);
        var bar = document.createElement("a-box");

        bar.setAttribute("width", barSize);
        bar.setAttribute("depth", barSize);
        bar.setAttribute("height", val);
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

        pos.y = val / 2;


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
        label.setAttribute("color", textColor);
        label.setAttribute("align", "center");
        label.setAttribute("position", {
            x: 0, y: val / 2 + barSize / 2, z: 0
        });
        label.setAttribute("visible", "false");
        
        bar.appendChild(label);

        panelBox.appendChild(bar);
    }
};
function setTitle(el, title, height, depth){
    var titleText = document.createElement('a-text');
    titleText.setAttribute("width", 2);
    titleText.setAttribute("align", "center");
    titleText.setAttribute("value", title);
    titleText.setAttribute("position", {y:height, z:-depth/2});
    el.appendChild(titleText);
};
