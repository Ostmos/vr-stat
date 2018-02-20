AFRAME.registerComponent('controller-display', {
    schema: {
        size: {type: 'number', default: 10},
    },

    init: function() {
        var data = this.data;
        var object = this.el.object3D;


        var display = new THREE.PlaneGeometry(0.4, 0.2);
        var material = new THREE.MeshBasicMaterial({color: 0x2A363B, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(display, material);

        var text = document.createElement("a-entity");
        text.className = "cont-disp";
        text.setAttribute("text", {
            color: "#000",
            side: "double",
            value: "value: ",
            align: "center",
            width: 1,
            font: 'roboto'
        });
        this.el.appendChild(text);
        object.add(plane);
    }
});