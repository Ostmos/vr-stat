AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
        });

        el.addEventListener('raycaster-intersected-cleared', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });

        el.addEventListener('axismove', function (evt) {
            console.log(evt.detail.axis[0]);
        });
    }
})