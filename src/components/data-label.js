AFRAME.registerComponent('data-label', {
    schema: {
        size: {type: 'number', default: 1},
    },

    init: function() {
        var data = this.data;
        var scene = this.el;

        var panel = document.createElement("a-plane");
        panel.setAttribute("width", "4");
        panel.setAttribute("height", "3.5");
        panel.setAttribute("color", "#2A363B");
        panel.setAttribute("text", {
            value: "X: 2015 \n Y: 19.01 \n Z: 19-34",
            align: "center",
            width: 20,
            zOffset: 0.004, 
        });
        panel.setAttribute("visible", false);
        panel.setAttribute("position", "0 5 0");

        var bar = document.createElement("a-box");
        bar.setAttribute("width", "1");
        bar.setAttribute("height", "5");
        bar.setAttribute("color", "#2A363B");
        bar.appendChild(panel);
        scene.appendChild(bar);

        scene.addEventListener('mouseenter', function () {
            bar.setAttribute("color", "#8A363B");
            panel.setAttribute('visible', true);
        });

        scene.addEventListener('mouseleave', function () {
            panel.setAttribute('visible', false);
            bar.setAttribute("color", "#2A363B");
        });

    },
});

