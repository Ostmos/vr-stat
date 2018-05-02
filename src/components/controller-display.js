AFRAME.registerComponent('controller-display', {
    schema: {
        size: {type: 'number', default: 10},
        buttonDown: {type: 'boolean', default: false},
    },

    init: function() {  
        var el = this.el;
        var data = this.data;
        var text = document.createElement("a-entity");
        text.className = "cont-disp";
        text.setAttribute("slice9", "width: 0.5; height: 0.3; left: 20; right: 43; top: 20; bottom: 43; src: src/assets/images/tooltip.png");
        text.setAttribute("scale", "0.2 0.2");
        text.setAttribute("position", "0 0.02 0.12");
        text.setAttribute("rotation", "-90 0 0");
        text.setAttribute("text", {
            color: "#0050",
            side: "double",
            value: "Press a bar \n to see value",
            align: "center",
            width: 1,
            font: 'roboto'
        });
        el.appendChild(text);

        var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        el.addElament3D( "plane", plane );

        window.addEventListener('abuttondown', function(event) {
        
        var allPoints = document.querySelector('[scatter-plot]').object3D.children[0];
        var intersections = el.components.raycaster.raycaster.intersectObject(allPoints);

        if(intersections.length > 0){

                var value =  allPoints.geometry.vertices[intersections[0].index];

                var scaleX = document.querySelector('[scatter-plot]').components['scatter-plot'].data.xAxisScale;
                var scaleY = document.querySelector('[scatter-plot]').components['scatter-plot'].data.yAxisScale;
                var scaleZ = document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisScale;

                var startX = document.querySelector('[scatter-plot]').components['scatter-plot'].data.xAxisStart;
                var startY = document.querySelector('[scatter-plot]').components['scatter-plot'].data.yAxisStart;
                var startZ = document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisStart;
                
                
                text.setAttribute("text", {
                    value:  "x: " + (value.x / scaleX - startX).toFixed(2) + "\n " +
                            "y: " + (value.y / scaleY - startY).toFixed(2) + "\n " +
                            "z: " + (value.z / scaleZ - startZ).toFixed(2) + "\n ",
                        color: ' #e0e0e0' 
                    });
        }

        var allBars   = document.querySelector('[bar-chart]').object3D.children.filter(isBar);
        var allLabels = document.querySelector('[bar-chart]').object3D.children.filter(isLabel);

        var barLabelPairs = makePair(allBars, allLabels);

        var barsIntersected = el.components.raycaster.raycaster.intersectObjects(allBars);

        if(barsIntersected.length > 0){
            var intersectedBar = barsIntersected[0].object; 

            for(var b = 0; b < barLabelPairs.length; b++){
                var currentBar   = barLabelPairs[b][0];
                var currentBarHeight = currentBar.geometry.parameters.height;

                var currentlabel = barLabelPairs[b][1].value;

                if(currentBar.uuid === intersectedBar.uuid){
                    var scaleY = document.querySelector('[bar-chart]').components['bar-chart'].data.yScale;
                    text.setAttribute("text", {
                        value: currentlabel + ' : ' + (currentBarHeight / scaleY).toFixed(1), 
                            color: ' #e0e0e0' 
                        });
                }
            }
        }
        });
    }
});

function makePair(bars, labels){
    var barLabelPairs = [];
    for(var i = 0; i < bars.length; i++){
        barLabelPairs.push([bars[i], labels[i]]);
    }
    return barLabelPairs;
}

function isBar(component) {
    return (component.name === "bar");
}
function isLabel(component){
    return (component.name === "label");
}