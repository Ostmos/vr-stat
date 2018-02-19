AFRAME.registerComponent('bar-chart-2', {
    schema: {
        offset: {type: 'number', default: 1},
        barSize: {type: 'number', default: 0.1},
        barPadding: {type: 'number', default: 0.1},
        panelBoxPadding: {type: 'number', default: 0.5},
        color: {type: 'color', default: '#FFF'},
        textColor: {type: 'color', default: '#000'}
    },

    init: function() {
        var data = this.data;
        var entity = this.el;

        var x = ['2013', '2014', '2015', '2016'];
        var z = ['Göteborg', 'Stockholm', 'Omrade2', 'Omrade3', 'Omrade4', 'Omrade5'];
        var values = [];
        for (var i = 0; i < x.length * z.length; i++) {
            values[i] = Math.floor(Math.random() * 10); 
        }

        const BAR_TOT_SIZE = (data.barPadding * 2) + data.barSize;
        const WIDTH = BAR_TOT_SIZE * x.length;
        const DEPTH = BAR_TOT_SIZE * z.length;

        var panelBox = createPanelBox(WIDTH, DEPTH, data.panelBoxPadding);
        entity.appendChild(panelBox);

        createBars(WIDTH, DEPTH, x.length, z.length, values, data.barSize, BAR_TOT_SIZE, panelBox);
    },
});

function createPanelBox(width, depth, padding) {
    var panelBox = document.createElement("a-box");
    panelBox.setAttribute('height', '0.03');
    panelBox.setAttribute('width', width + padding);
    panelBox.setAttribute('depth', depth + padding);
    return panelBox;
};

function createBars(width, depth, xLabelsLength, zLabelsLength, values, barSize, barTotalSize, panelBox) {
    const OFFSET = barTotalSize / 2;
    var pos = {x: 0, y: 0, z: 0}; 

    for (var i = 0; i < values.length; i++) {
        var bar = document.createElement("a-box");
        bar.setAttribute("width", barSize);
        bar.setAttribute("depth", barSize);
        bar.setAttribute("height", values[i]);

        pos.x = (pos.x + barTotalSize) % width;

        pos.y = values[i] / 2;

        if (i % xLabelsLength == 0) {
            pos.z += barTotalSize;
        }

        bar.setAttribute("position", {
            x: (pos.x - width / 2) + OFFSET, 
            y: pos.y, 
            z: (pos.z - depth / 2) - OFFSET 
        });

        panelBox.appendChild(bar);
    }
};

