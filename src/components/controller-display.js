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
            console.log("a-button down");


        

       var arr = document.querySelector('[scatter-plot]').object3D.children[0];
       let intersections = el.components.raycaster.raycaster.intersectObject(arr);
       //el.components.raycaster.objects = arr;
       var value =  arr.geometry.vertices[intersections[0].index];

       text.setAttribute("text", {
         value: "x: " + value.x + "\n " +
                "y: " + value.y + "\n " +
                "z: " + value.z + "\n ",
            color: "#0050"
        });

        console.log(document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisScale - document.querySelector('[scatter-plot]').components['scatter-plot'].data.zAxisStart);

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
