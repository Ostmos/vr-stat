AFRAME.registerComponent('bar-chart-listener', {
    
    init: function() {
        var el = this.el;
        
        el.addEventListener('grab-start', function() {
            el.setAttribute('rotatable');
        });

        el.addEventListener('grab-end', function() {
            el.removeAttribute('rotatable');
        });
    }
});