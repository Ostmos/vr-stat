AFRAME.registerComponent('activate-vr', {
    init: function(){
        sceneEl.addEventListener('vrdisplayactivate', function (){
            this.el.sceneEl.enterVR();
          });
    }
});