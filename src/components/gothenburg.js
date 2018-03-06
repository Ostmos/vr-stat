AFRAME.registerComponent('gothenburg', {
    barSize: { type: 'number', default: 0.05 },
    schema: {

    },
    init: function () {
        var data = this.data;
        var entity = this.el;
        var object = this.el.object3D
        
        var panel = createPanel(5,5);
        entity.appendChild(panel);
    },
});

function createPanel(WIDTH, DEPTH){
    var gbg = document.createElement("a-image");
    gbg.setAttribute('src', 'src/assets/images/gbg.png');
    gbg.setAttribute('width',WIDTH);
    gbg.setAttribute('height',DEPTH);
    gbg.setAttribute('rotation','270');
    gbg.setAttribute("position", {x: 0, y: 1, z: 0});
    return gbg;
}

function createBar(barSize, barHeight){
    var bar = document.createElement("a-box");
    bar.setAttribute("width", barSize);
    bar.setAttribute("depth", barSize);
    bar.setAttribute("height", barHeight);
    bar.setAttribute("transparent", "true");
    bar.setAttribute("opacity", "0.9");
    bar.setAttribute("color", "#355C7D");
}