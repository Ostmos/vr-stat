function TextProperties( fontFamily = "Courier New", fontSize = 64, fontColor = "black", rotation = 0 ) {

    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
    this.fontColor = fontColor;
    this.rotation = rotation;

}

TextProperties.prototype.toContextFont = function() {

    return String( this.fontSize ).concat( "px ", this.fontFamily );

}

function SpriteText( text = "Lorem", properties ) {

    const Canvas = document.createElement( "canvas" );
    const Ctx = Canvas.getContext("2d");
    let CanvasSize = 128;
    Canvas.width = CanvasSize;
    Canvas.height = CanvasSize;
    Ctx.font = properties.toContextFont(); 

    let scale = 1;
    const TextWidth = Ctx.measureText( text ).width;
    if ( TextWidth > CanvasSize ) {

        while (TextWidth > CanvasSize * scale ) {
            scale *= 2;
        }

        Canvas.width = CanvasSize * scale;
        Canvas.height = CanvasSize * scale;
        Ctx.font = properties.toContextFont();

    }

    Ctx.textAlign = "center";
    Ctx.textBaseline = "middle";
    Ctx.fillStyle = properties.fontColor;
    Ctx.fillText( text, Canvas.width / 2, Canvas.height / 2 );


    const Texture = new THREE.CanvasTexture( Canvas );
    const SpriteMaterial = new THREE.SpriteMaterial( { map: Texture, rotation: properties.rotation } );
    this.mesh = new THREE.Sprite( SpriteMaterial ); 
    this.mesh.scale.set(scale * 0.2, scale * 0.2, scale * 0.2);
   
    // Use for debug 
    // Ctx.rect(0, 0, Canvas.width, Canvas.height);
    // Ctx.stroke(); 

}

// Factory methods
function smallText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 36, "black", rotation);
    return new SpriteText( text, Properties ); 
    
}

function mediumText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 64, "black", rotation );
    return new SpriteText( text, Properties ); 

}

function largeText( text, rotation = 0 ) {

    const Properties = new TextProperties( "Courier New", 128, "black", rotation );
    return new SpriteText( text ); 

}

module.exports = {
    TextProperties: TextProperties,
    SpriteText: SpriteText,
    smallText: smallText,
    mediumText: mediumText,
    largeText: largeText
}