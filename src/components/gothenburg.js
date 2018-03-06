AFRAME.registerComponent('gothenburg', {
    schema: {
        barSize: { type: 'number', default: 0.1 },
        barPosX: { type: 'number', default: 0 },
        barPosY: { type: 'number', default: 0 },
        barPosZ: { type: 'number', default: 0 },
        WIDTH: { type: 'number', default: 5 },
        DEPTH: { type: 'number', default: 5 },
        textSize: { type: 'number', default: 10 },
        labelSize: { type: 'number', default: 2 },
        title: {type: 'string', default: 'Default title'},

    },
    init: function () {
        var data = this.data;
        var entity = this.el;
        var object = this.el.object3D

        //create functions for setting value of each bar
        var barHeight = 1;  
        var MAX_HEIGHT = 1;

        var panel = createPanel(data.WIDTH, data.DEPTH);
        setTitle(panel, data.title, MAX_HEIGHT, data.DEPTH, data.textSize);

        var westGothenburg = createBar(data.barSize, barHeight, -data.DEPTH/4, -data.WIDTH/5, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("West Gothenburg", data.labelSize, barHeight, data.barSize, westGothenburg);
        var askim = createBar(data.barSize, barHeight, data.DEPTH/16, -data.WIDTH/5, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Askim", data.labelSize, barHeight, data.barSize, askim);
        var majorna = createBar(data.barSize, barHeight, data.DEPTH/20, data.WIDTH/50, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Majorna", data.labelSize, barHeight, data.barSize, majorna);
        var centrum = createBar(data.barSize, barHeight, data.DEPTH/9.6, data.WIDTH/20, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Centrum", data.labelSize, barHeight, data.barSize, centrum);
        var lundby = createBar(data.barSize, barHeight, data.DEPTH/30, data.WIDTH/9, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Lundby", data.labelSize, barHeight, data.barSize, lundby);
        var orgryte = createBar(data.barSize, barHeight, data.DEPTH/5, data.WIDTH/12, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Örgryte", data.labelSize, barHeight, data.barSize, orgryte);
        var eastGothenburg = createBar(data.barSize, barHeight, data.DEPTH/4.5, data.WIDTH/5, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("East Gothenburg", data.labelSize, barHeight, data.barSize, eastGothenburg);
        var angered = createBar(data.barSize, barHeight, data.DEPTH/3, data.WIDTH/2.8, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("Angered", data.labelSize, barHeight, data.barSize, angered);
        var westHisingen = createBar(data.barSize, barHeight, -data.WIDTH/6, data.WIDTH/7, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("West Hisingen", data.labelSize, barHeight, data.barSize, westHisingen);
        var northHisingen = createBar(data.barSize, barHeight, data.WIDTH/14, data.WIDTH/3.2, data.barPosZ, data.WIDTH, data.DEPTH, panel);
        createLabel("North Hisingen", data.labelSize, barHeight, data.barSize, northHisingen);

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

function createBar(barSize, barHeight, barPosX, barPosY, barPosZ, WIDTH, DEPTH, el){
    var bar = document.createElement("a-box");
    bar.setAttribute('height', barHeight);
    bar.setAttribute('width', barSize);
    bar.setAttribute('depth', barSize);
    bar.setAttribute("position", {
        x: barPosX,
        y: barPosY,
        z: barPosZ + barHeight/2
    });
    bar.setAttribute('rotation', '90')
    bar.setAttribute("transparent", "true");
    bar.setAttribute("opacity", "0.9");
    bar.setAttribute("hoverable","");
    bar.setAttribute("bar-listener","");
    bar.setAttribute("color", "#355C7D");
    el.appendChild(bar);
    return bar;
}

function createLabel(title, textSize, barHeight, barSize, el){
    var text = document.createElement("a-text");
    text.setAttribute("value", title);
    text.setAttribute("width", textSize);
    text.setAttribute("align", "center");
    text.setAttribute("rotation", {x:270 ,y:0, z:0});
    text.setAttribute("position", {y:-barHeight/2 , z:barSize});
    text.setAttribute("color", "#000");
    el.appendChild(text);
}

function setTitle(el, title, height, depth, size){
    var titleText = document.createElement('a-text'); 
    titleText.setAttribute("wrap-pixels", 750);
    titleText.setAttribute("width", size);
    titleText.setAttribute("align", "center");
    titleText.setAttribute("value", title);
    titleText.setAttribute("rotation", {x:90});
    titleText.setAttribute("position", {y: depth/2, z:height *1.2});
    titleText.setAttribute("color", "#000");
    el.appendChild(titleText);
};