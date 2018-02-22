AFRAME.registerComponent('bar-listener', {
    
    init: function() {
        var el = this.el;

        el.addEventListener('hover-start', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "true");
        });

        el.addEventListener('hover-end', function() {
            var children = el.childNodes;
            children[0].setAttribute("visible", "false");
        });
    }
});

//el.addEventListener('click', function() {
//    var children = el.childNodes;
//    children[0].setAttribute("visible", "true");
//    var contDisp =  document.getElementsByClassName('cont-disp')[0];

//    contDisp.setAttribute("text", {
//        value: el.getAttribute('labelX') + "\n " +
//               el.getAttribute('labelY') + "\n " +
//               el.getAttribute('labelZ'), 
//        color: "red"
//    });
//});