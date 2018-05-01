const SmallText = require ( "../text/sprite-text" ).smallText;
const MediumText = require ( "../text/sprite-text" ).mediumText;
const Range = require ( "../data/data-table" ).Range;

function RectilinearGrid( steps, stepLength, size ) {

    const origin = new THREE.Vector2( -size.x / 2, size.y / 2 );

    const vertices = [];
    for ( let i = 0; i < steps.y; i++ ) {

        vertices.push( origin.x, 0, origin.y - i * stepLength.y ); 
        vertices.push( origin.x + size.x, 0 , origin.y - i * stepLength.y ); 

    }
    for ( let i = 0; i < steps.x; i++ ) {

        vertices.push( origin.x + i * stepLength.x , 0, origin.y ); 
        vertices.push( origin.x + i * stepLength.x, 0 , origin.y - size.y ); 

    }
    const vertices32 = new Float32Array( vertices );

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute( "position", new THREE.BufferAttribute( vertices32, 3 ) );
    const material = new THREE.LineBasicMaterial( { color: 0x99AAB5 } );
    this.mesh = new THREE.LineSegments( geometry, material );

}

// Should share some properties with Rectilinear grid
function SimpleGrid( steps, stepLength, size ) {

    // This could be reused
    const origin = new THREE.Vector2( -size.x / 2, size.y / 2 );

    const vertices = [];
    for ( let i = 0; i < steps; i++ ) {

        vertices.push( origin.x, 0, origin.y - i * stepLength ); 
        vertices.push( origin.x + size.x, 0 , origin.y - i * stepLength ); 

    }
    vertices.push( origin.x, 0, origin.y );
    vertices.push( origin.x, 0, origin.y - size.y );
    vertices.push( origin.x + size.x, 0, origin.y );
    vertices.push( origin.x + size.x , 0, origin.y - size.y );
    const vertices32 = new Float32Array( vertices );

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute( "position", new THREE.BufferAttribute( vertices32, 3 ) );
    const material = new THREE.LineBasicMaterial( { color: 0x99AAB5 } );
    this.mesh = new THREE.LineSegments( geometry, material );

}


function LabelAxis( start, direction, labelOffset, steps, stepLength, length, range, suffix ) {

    // Put this somewhere else
    this.middle = start.clone().add( direction.clone().multiplyScalar( length / 2 ) );

    const LabelValueStep = ( range.end - range.start ) / ( steps - 1 ); 

    let currentValue = range.start;
    let text = "";
    let scaledDirection = direction.multiplyScalar( stepLength );
    let point = start.add( labelOffset );


    this.mesh = new THREE.Group(); 

    for( let i = 0; i < steps; i++ ) {
        
        text = ( currentValue ).toFixed( 2 ).concat( suffix );
        let spriteText = SmallText( text );
        spriteText.mesh.position.set( point.x, point.y, point.z );
        this.mesh.add( spriteText.mesh );
        point.add( direction );
        currentValue += LabelValueStep;

    }

}

LabelAxis.prototype.setTitle = function( title, offset, rotation ) {

    const Text = new MediumText( title, rotation ).mesh; 
    const Position = this.middle.add( offset );
    Text.position.set( Position.x, Position.y, Position.z );
    this.mesh.add( Text );

}

function CategoryAxis( start, direction, stepLength, length, categories, labelOffset ) {

    // Put this somewhere else
    this.middle = start.clone().add( direction.clone().multiplyScalar( length / 2 ) );

    let scaledDirection = direction.multiplyScalar( stepLength );
    let point = start.add( labelOffset );

    this.mesh = new THREE.Group(); 

    for( let i = 0; i < categories.length; i++ ) {
        
        let spriteText = SmallText( categories[ i ] );
        spriteText.mesh.position.set( point.x, point.y, point.z );
        this.mesh.add( spriteText.mesh );
        point.add( direction );

    }

}

CategoryAxis.prototype.setTitle = function( title, offset, rotation ) {

    const Text = new MediumText( title, rotation ).mesh; 
    const Position = this.middle.add( offset );
    Text.position.set( Position.x, Position.y, Position.z );
    this.mesh.add( Text );

}

module.exports =  {

    RectilinearGrid: RectilinearGrid,
    SimpleGrid: SimpleGrid, 
    LabelAxis: LabelAxis,
    CategoryAxis: CategoryAxis

}