function TextProperties( fontFamily = "Courier New", fontSize = 128, fontColor = "black" ) {

    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.fontColor = fontColor;

}

TextProperties.prototype.toContextFont = function() {

    return String( this.fontSize ).concat( "px ", this.fontFamily );

}

function SpriteText( text = "Lorem", properties ) {

    const Canvas = document.createElement( "canvas" );
    const Ctx = Canvas.getContext("2d");
    Canvas.width = 1024;
    Canvas.height = 1024;
    Ctx.textAlign = "center";
    Ctx.textBaseline = "middle";
    Ctx.font = properties.toContextFont(); 
    Ctx.fillStyle = properties.fontColor;
    Ctx.fillText( text, Canvas.width / 2, Canvas.height / 2 );

    const Texture = new THREE.CanvasTexture( Canvas );
    const SpriteMaterial = new THREE.SpriteMaterial( { map: Texture } );
    this.mesh = new THREE.Sprite( SpriteMaterial ); 
    this.mesh.scale.set( 0.3, 0.3, 0.3 );
   
    // Use for debug 
    // Ctx.rect(0, 0, Canvas.width, Canvas.height);
    // Ctx.stroke(); 

}

module.exports = {
    TextProperties: TextProperties,
    SpriteText: SpriteText
}