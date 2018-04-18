AFRAME.registerComponent('bar-chart-listener', {
    schema: {
        isHovering: {type: 'boolean', default: false}
    },


    init: function() {
        var el = this.el;
        var data = this.data;
        el.addEventListener('hover-start', function(evt) {
            //var children = el.childNodes;
            //children[0].setAttribute("visible", "true");
            console.log("hej");
	    
            data.isHovering = true;
        });

        el.addEventListener('hover-end', function() {
            //var children = el.childNodes;
            //children[0].setAttribute("visible", "false");
            data.isHovering = false;
        });

        el.addEventListener('raycaster-intersected', function(evt) {
            //var children = el.childNodes;
            //children[0].setAttribute("visible", "false");
            console.log(evt);
            console.log("hej!");
        });
    
    },

    getValues: function(){
        // This function needs to be fixed! How do we get the values from 
        var contDisp = document.getElementById('controller1').getAttribute("controller-display");
        if(contDisp != undefined){
            if(el.parentNode.parentNode.getAttribute('bar-chart')){
                contDisp.setAttribute("text", {
                    value: "x: " + el.getAttribute('labelX') + "\n " +
                           "y: " + el.getAttribute('labelY') + "\n " +
                           "z: " + el.getAttribute('labelZ'), 
                    color: "#0050"
                });
            }else if(el.parentNode.parentNode.getAttribute('scatter-plot-2')){
                contDisp.setAttribute("text", {
                    value: "x: " + el.getAttribute('labelX') + "\n " +
                           "y: " + el.getAttribute('labelY') + "\n " +
                           "z: " + el.getAttribute('labelZ') + "\n " +
                           "val:"+ el.getAttribute("labelVal"),
                    color: "#0050"
                });
            }
        }
    },
    tick: function(){
        if(document.getElementById("controller1").getAttribute('controller-display').buttonDown &&  data.isHovering){
            console.log("spara värderna");
        }
    }

});
