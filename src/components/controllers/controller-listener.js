AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
        });

        el.addEventListener('raycaster-intersected-cleared', function() {
            var children = el.childNodes;
            console.log(el.parentNode);
            children[0].setAttribute("visible", "false");
        });

        el.addEventListener('grab-start', function() {
            console.log('grab ----');
        });

        el.addEventListener('touchstart', function(event) {
            console.log(event);
        });
    }
})