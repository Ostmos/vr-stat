AFRAME.registerComponent('controller-display', {
    schema: {
        size: {type: 'number', default: 10},
        buttonDown: {type: 'boolean', default: false},
    },

    init: function() {
        var el = this.el;
        var data = this.data;
        var text = document.createElement("a-entity");
        text.className = "cont-disp";
        text.setAttribute("slice9", "width: 0.5; height: 0.3; left: 20; right: 43; top: 20; bottom: 43; src: src/assets/images/tooltip.png");
        text.setAttribute("scale", "0.2 0.2");
        text.setAttribute("position", "0 0.02 0.12");
        text.setAttribute("rotation", "-90 0 0");
        text.setAttribute("text", {
            color: "#0050",
            side: "double",
            value: "Press a bar \n to see value",
            align: "center",
            width: 1,
            font: 'roboto'
        });
        el.appendChild(text);

        window.addEventListener('keydown', function(event) {
            console.log("a-button down");
            //console.log(document.getElementById('controller1').getAttribute('controller-display').buttonDown);
            data.buttonDown = true;
        });

        window.addEventListener('keyup', function(event) {
            console.log("a-button up");
            //console.log(document.getElementById('controller1').getAttribute('controller-display').buttonDown);
            data.buttonDown = false;
        });
    }
});
