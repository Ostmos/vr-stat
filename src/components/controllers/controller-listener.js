AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function(evt) {
            console.log(evt);
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
        });

        el.addEventListener('hover-end', function(evt) {
            console.log(evt);
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });
    }
})