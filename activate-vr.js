AFRAME.registerComponent('activate-vr', {
    init: function(){
        this.el.sceneEl.enterVR();
        }
});