AFRAME.registerComponent("rotation-observer", {
    init: function () {
        let el = this.el;
        let hovering = false;

        el.addEventListener('hover-start', function(event) {
            hovering = true;
        });

        el.addEventListener('hover-end', function(event) {
            hovering = false;
        });

        this.el.sceneEl.addEventListener('rotation', function(event) {
            if (hovering) {
                el.object3D.rotation.set(
                    THREE.Math.degToRad(event.detail.y * 35),
                    THREE.Math.degToRad(event.detail.x * 180),
                    0
                );
            }
        });
    },
});