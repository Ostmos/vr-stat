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


        window.addEventListener('keydown', function(event) {
        
        var allPoints = document.querySelector('[scatter-plot]').object3D.children[0];
        if(allPoints.length > 0){
                var intersections = el.components.raycaster.raycaster.intersectObject(allPoints);

                var value =  allPoints.geometry.vertices[intersections[0].index];

                var scaleX = document.querySelector('[scatter-plot]').components['scatter-plot'].data.xAxisScale;
                var scaleY = document.querySelector('[scatter-plot]').components['scatter-plot'].data.yAxisScale;
                var scaleZ = document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisScale;

                var startX = document.querySelector('[scatter-plot]').components['scatter-plot'].data.xAxisStart;
                var startY = document.querySelector('[scatter-plot]').components['scatter-plot'].data.yAxisStart;
                var startZ = document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisStart;
                
                
                text.setAttribute("text", {
                    value:  "x: " + (value.x / scaleX - startX) + "\n " +
                            "y: " + (value.y / scaleY - startY) + "\n " +
                            "z: " + (value.z / scaleZ - startZ) + "\n ",
                        color: "#0050"
                    });
        }
        function isBar(component) {
            return (component.name === "bar");
        }
        function isLabel(component){
            return (component.name === "label");
        }
        var allBars   = document.querySelector('[bar-chart]').object3D.children.filter(isBar);
        var allLabels = document.querySelector('[bar-chart]').object3D.children.filter(isLabel);

        function makePair(bars, labels){
            var barLabelPairs = [];
            for(var i = 0; i < allBars.length; i++){
                barLabelPairs.push([allBars[i], allLabels[i]]);
            }
            return barLabelPairs;
        }

        var barLabelPairs = makePair(allBars, allLabels);

        if(allBars.length > 0){
            var intersections = el.components.raycaster.raycaster.intersectObjects(allBars);

            var intersectedBar = intersections[0].object; 

            console.log(intersections[0].object.uuid);

            for(var b = 0; b < barLabelPairs.length; b++){
                console.log(barLabelPairs[b][0].uuid);
                if(barLabelPairs[b][0].uuid === intersectedBar.uuid){
                    var scaleY = document.querySelector('[bar-chart]').components['bar-chart'].data.yScale;
                    text.setAttribute("text", {
                        value: barLabelPairs[b][1].value + ' : ' + (barLabelPairs[b][0].geometry.parameters.height / scaleY).toFixed(1), 
                            color: "#0050"
                        });
                }
            }

            var value = intersections[0].object.geometry.parameters.height;
            console.log(value);
        }



        
        //console.log(intersections[0].index);

		//console.log(rightControllers[i].components.raycaster.raycaster.intersectObjects(diagrams));
		/*if(hovered){
		    var contDisp = document.getElementById('controller1').components["controller-display"];
		    
		    if(contDisp != undefined){
			if(el.parentNode.parentNode.getAttribute('bar-chart')){
			    contDisp.setAttribute("text", {
				// Change these to the intersected object's values
				// Some similar method as:
				//             rightControllers[i].components['raycaster'].intersectedEls[0].x.y.z...
				value: "x: " + el.getAttribute('labelX') + "\n " +
				    "y: " + el.getAttribute('labelY') + "\n " +
				    "z: " + el.getAttribute('labelZ'), 
				color: "#0050"
			    });
			}else if(el.parentNode.parentNode.getAttribute('scatter-plot-2')){
			    contDisp.setAttribute("text", {
				// Change these to the intersected object's values
				// Some similar method as:
				//             rightControllers[i].components['raycaster'].intersectedEls[0].x.y.z...
				value: "x: " + el.getAttribute('labelX') + "\n " +
				    "y: " + el.getAttribute('labelY') + "\n " +
				    "z: " + el.getAttribute('labelZ') + "\n " +
				    "val:"+ el.getAttribute("labelVal"),
				color: "#0050"
			    });
			}
		    }
		    
        }*/
	    //}

            data.buttonDown = true;
        });

        window.addEventListener('keyup', function(event) {
            console.log("a-button up" + event.keyCode);
            //console.log(document.getElementById('controller1').getAttribute('controller-display').buttonDown);
            data.buttonDown = false;
        });
    }
});
