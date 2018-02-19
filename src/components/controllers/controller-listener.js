AFRAME.registerComponent('controller-listener', {
    dependencies: ['raycaster'],
    
    init: function() {
        var el = this.el;

        el.addEventListener('raycaster-intersected', function() {
            console.log('Hover');
            el.setAttribute('visible', 'true');
        });

        el.addEventListener('raycaster-intersected-cleared', function() {
            console.log('Not hover');
            el.setAttribute('visible', 'false');
        });

        el.addEventListener('touchstart', function(event) {
            console.log(event);
        });
    }
})