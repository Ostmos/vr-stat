AFRAME.registerComponent("rotation-observer", {
    init: function () {
        let el = this.el;
        let grabbed = false;

        el.addEventListener('grab-start', function(event) {
            grabbed = true;
        });

        el.addEventListener('grab-end', function(event) {
            grabbed = false;
        });

        this.el.sceneEl.addEventListener('rotation', function(event) {
            console.log('xd');
            if (true) {
                el.object3D.rotation.set(
                    THREE.Math.degToRad(event.detail.y * 35),
                    THREE.Math.degToRad(event.detail.x * 180),
                    0
                );
            }
        });
    },
});