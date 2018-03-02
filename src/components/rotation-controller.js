AFRAME.registerComponent('rotation-controller', {
    init: function () {
        var el = this.el;

        el.addEventListener('axismove', function (evt) {
            var rotateElements = el.sceneEl.querySelectorAll('.rotate');
            rotateElements.forEach(element => {
                if (element.getAttribute('rotatable')){
                    element.setAttribute('rotation', {x: evt.detail.axis[1] * 20, y: evt.detail.axis[0] * 180, z:0});
                }
            });
        });

        window.addEventListener('keydown', function (evt) {
            if (evt.code == 'r' || evt.keyCode == '82')
            var rotateElements = el.sceneEl.querySelectorAll('.rotate');
            if (typeof rotateElements != 'undefined') {
                rotateElements.forEach(element => {
                    if (element.getAttribute('rotatable')){
                        element.setAttribute('rotation', {x: Math.random() * 20, y: Math.random() * 180, z:0});
                    }
                });
            }
        });
    }
});