AFRAME.registerComponent('chart-controller-listener', {
    
    init: function() {

        const el = this.el;

        el.addEventListener('rotation', function ( evt ) {

            el.setAttribute("rotation", {x: 0, y: evt.detail.axis[0] * 180, z: 0});

        });
        

    }
})
