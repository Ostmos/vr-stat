AFRAME.registerComponent('controller-listener', {
    
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
    }
})