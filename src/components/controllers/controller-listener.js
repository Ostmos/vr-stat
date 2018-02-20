AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;


        el.addEventListener('hover-start', function(evt) {
            console.log(evt);
        /*el.addEventListener('click', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
            var contDisp =  document.getElementsByClassName('cont-disp')[0];

            contDisp.setAttribute("text", {
                value: el.getAttribute('labelX') + "\n " +
                       el.getAttribute('labelY') + "\n " +
                       el.getAttribute('labelZ'), 
                color: "red"
            */});
        });

        el.addEventListener('hover-end', function(evt) {
            console.log(evt);
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });
    }
})