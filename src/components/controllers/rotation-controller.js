AFRAME.registerComponent('rotation-controller', {
    init: function () {
        var el = this.el;

        el.addEventListener('axismove', function (evt) {
            el.sceneEl.querySelector('#bc').setAttribute('rotation', {x: 0, y: evt.detail.axis[0] * 180, z:0});
        });
    }
});