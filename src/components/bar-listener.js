AFRAME.registerComponent('bar-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
        });

        el.addEventListener('hover-end', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });

        el.addEventListener('click', function() {
            var contDisp = document.getElementsByClassName('cont-disp')[0];
            if(contDisp != undefined){
                console.log(el.parentNode.parentNode.getAttribute('bar-chart') != null);
                if(el.parentNode.parentNode.getAttribute('bar-chart')){
                    contDisp.setAttribute("text", {
                        value: "x: " + el.getAttribute('labelX') + "\n " +
                               "y: " + el.getAttribute('labelY') + "\n " +
                               "z: " + el.getAttribute('labelZ'), 
                        color: "#0050"
                    });
                }else if(el.parentNode.parentNode.getAttribute('scatter-plot') != null){
                    contDisp.setAttribute("text", {
                        value: "x: " + el.getAttribute('labelX') + "\n " +
                               "y: " + el.getAttribute('labelY') + "\n " +
                               "z: " + el.getAttribute('labelZ'), 
                        color: "#0050"
                    });
                }
            }
        });
    
    }   

});
