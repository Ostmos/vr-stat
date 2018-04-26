AFRAME.registerComponent("chart-controller", {

    // TODO 
    /*
    Config: 
        mouse + keyboard
        oculus-touch-controllers        
    */

    init: function () {

        let el = this.el;

        el.addEventListener( "axismove", function (evt) {

            el.emit("rotation", {x: evt.detail.axis[0], y: evt.detail.axis[1], z: evt.detail.axis[2]});

        });

        el.addEventListener( "triggerdown", function (evt) {


        } );

        el.addEventListener( "click", function() {

            console.log("a");

        } );

    },
});