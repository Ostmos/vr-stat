const SmallText = require ( "../charts/sprite-text" ).smallText;
const MediumText = require ( "../charts/sprite-text" ).mediumText;
const Range = require ( "../charts/data-table" ).Range;

function RectilinearGrid( steps, stepLength, layout ) {

    const Origin = new THREE.Vector2( -layout.x / 2, layout.y / 2 );

    let Vertices = [];
    for ( let i = 0; i < steps.y; i++ ) {

        Vertices.push( Origin.x, 0, Origin.y - i * stepLength.y ); 
        Vertices.push( Origin.x + layout.x, 0 , Origin.y - i * stepLength.y ); 

    }
    for ( let i = 0; i < steps.x; i++ ) {

        Vertices.push( Origin.x + i * stepLength.x , 0, Origin.y ); 
        Vertices.push( Origin.x + i * stepLength.x, 0 , Origin.y - layout.y ); 

    }
    const Vertices32 = new Float32Array( Vertices );

    const Geometry = new THREE.BufferGeometry();
    Geometry.addAttribute( 'position', new THREE.BufferAttribute( Vertices32, 3 ) );
    const Material = new THREE.LineBasicMaterial( { color: 0x99AAB5 } );
    this.mesh = new THREE.LineSegments( Geometry, Material );

}

// Should share some properties with Rectilinear grid
function SimpleGrid( steps, stepLength, layout ) {

    // This could be reused
    const Origin = new THREE.Vector2( -layout.x / 2, layout.y / 2 );

    let Vertices = [];
    for ( let i = 0; i < steps; i++ ) {

        Vertices.push( Origin.x, 0, Origin.y - i * stepLength ); 
        Vertices.push( Origin.x + layout.x, 0 , Origin.y - i * stepLength ); 

    }
    Vertices.push( Origin.x, 0, Origin.y );
    Vertices.push( Origin.x, 0, Origin.y - layout.y );
    Vertices.push( Origin.x + layout.x, 0, Origin.y );
    Vertices.push( Origin.x + layout.x , 0, Origin.y - layout.y );
    const Vertices32 = new Float32Array( Vertices );

    const Geometry = new THREE.BufferGeometry();
    Geometry.addAttribute( 'position', new THREE.BufferAttribute( Vertices32, 3 ) );
    const Material = new THREE.LineBasicMaterial( { color: 0x99AAB5 } );
    this.mesh = new THREE.LineSegments( Geometry, Material );
    console.log(this.mesh);

}

function CategoricalPlane( steps, stepLength, layout ) {

    const Origin = new THREE.Vector2( -layout.x / 2, layout.z / 2 );
    const Geometry = new THREE.PlaneGeometry( layout.x, layout.z );
    const Material = new THREE.MeshBasicMaterial( { color: 0x2C2F33, side: THREE.DoubleSide } );
    this.mesh = new THREE.Mesh( Geometry, Material );
    this.mesh.rotation.set( -Math.PI / 2, 0, 0);

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
    CategoricalPlane: CategoricalPlane,
    LabelAxis: LabelAxis,
    CategoryAxis: CategoryAxis

}