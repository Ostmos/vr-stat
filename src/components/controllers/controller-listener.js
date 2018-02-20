AFRAME.registerComponent('controller-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function() {
            console.log('hover start');
            el.setAttribute("visible", "false");
        });

        el.addEventListener('hover-end', function() {
            console.log('hover end');
            el.setAttribute("visible", "true");
        });

        el.addEventListener('grab-start', function() {
            console.log('grab ----');
        });

        el.addEventListener('touchstart', function(event) {
            console.log(event);
        });
    }
})