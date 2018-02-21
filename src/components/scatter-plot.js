AFRAME.registerComponent('scatter-plot', {
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
            values[i] = (Math.random() * 1000);
        }
        var maxValue = Math.max(...values);

        const BAR_TOT_SIZE = (data.barPadding * 2) + data.barSize;
        const WIDTH = BAR_TOT_SIZE * x.length;
        const DEPTH = BAR_TOT_SIZE * z.length;

        var panelBox = createPanelBox(WIDTH, DEPTH, data.panelBoxPadding, data.barSize,
            BAR_TOT_SIZE, data.textColor, x, z);
        entity.appendChild(panelBox);

        createLevelLines(WIDTH, DEPTH, maxValue, panelBox, data.textColor, y, data.barSize);

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


