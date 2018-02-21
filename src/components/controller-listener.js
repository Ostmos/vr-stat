AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function(evt) {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
            console.log(evt);
        });

        el.addEventListener('hover-end', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });

        el.addEventListener('click', function() {
            var contDisp = document.getElementsByClassName('cont-disp')[0];
            contDisp.setAttribute("text", {
                value: "x: " + el.getAttribute('labelX') + "\n " +
                       "y: " + el.getAttribute('labelY') + "\n " +
                       "z: " + el.getAttribute('labelZ'), 
                color: "#0050"
            });

        });
    }
});
