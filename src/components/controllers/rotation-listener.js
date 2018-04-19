AFRAME.registerComponent('rotation-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('axismove', function (evt) {
            el.setAttribute("rotation", {x: 0, y: evt.detail.axis[0] * 180, z: 0});
        });
    }
})
