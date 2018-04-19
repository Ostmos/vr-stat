AFRAME.registerComponent('bar-listener', {
    schema: {
        isHovering: {type: 'boolean', default: false}
    },


    init: function() {
        var el = this.el;
        el.addEventListener('hover-start', function(evt) {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
            console.log("Inne i hover");
            console.log(document.getElementById('controller1').getAttribute("controller-display").buttonDown);
            if(document.getElementById('controller1').getAttribute("controller-display").buttonDown){
                getValues();
                console.log("display changed");
            }
        });

        el.addEventListener('hover-end', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });

    
    },
    
    getValues: function(){
        
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
    }

});
