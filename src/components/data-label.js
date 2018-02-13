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
        panel.setAttribute("color", "#2A363B")
        panel.setAttribute("text", {
            value: "X: 2015 \n Y: 19.01 \n Z: 19-34",
            align: "center",
            width: 20,
            zOffset: 0.004
        });
        scene.appendChild(panel);
    },
});

