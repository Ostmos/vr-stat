AFRAME.registerComponent('spin', {
    init: function(){
        var sceneEl = document.querySelector('a-scene');
        var entEl = sceneEl.querySelector('.ent');
        var barEl = entEl.querySelector('.bar');
        var boxEl = sceneEl.querySelector('.box');
        isOff = true;

        boxEl.addEventListener('click', function (){
            if(isOff){
                isOff= !isOff;
                var b = entEl.querySelector('a-entity').getAttribute('rotation').y;
                entEl.querySelector('a-animation').setAttribute('rotation', {x: 0, y: b, z: 0});
                entEl.querySelector('a-animation').setAttribute('dur', 10000);
            }else{
                isOff= !isOff;
                console.log("off");
                var b = entEl.getAttribute('rotation').y;
                console.log(b);
                console.log(entEl.getAttribute('rotation'));
                console.log(entEl.querySelector('a-animation').getAttribute('rotation'));                          
                entEl.querySelector('a-entity').setAttribute('rotation', {x: 0, y: b, z: 0});
                entEl.querySelector('a-animation').setAttribute('dur', 0);

            };
        });
    }
});
  
// <a-box class="box" position="8 3 0" spin color="#AFAFAF"></a-box>