
var _nexus = function( scene, nexus, mob, id ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("nexus", 6.0, scene), scene );
	this.self.setScale(1,3,1);
	this.id = id;
	this.mobCount = 0;
	this.Cap = 200;
	this.cur = 0;
	
	this.mob = mob;
	this.nexus = nexus;
	this.scene = scene;

	this.hp = 10;
}
 
_nexus.prototype.Spawn = function( num, size ) {
	num = Math.min( this.Cap-this.mobCount, num );
	var row = Math.floor( Math.sqrt(num/2) );

	for (var v = 0; v < num; v++) {
		if (this.mobCount < this.Cap) {
			var i = 0; while (typeof(this.mob[(i = i + 1)]) != "undefined");
			this.mob[i] = new _mob( this.scene, this.nexus, this.mob, this.id, i );
				this.mob[i].self.setPos( this.nexus[this.id].self.getPos() );
				this.mob[i].self.setPos( 
					( (v%2==0)? '+' : '-' )+( 20+((v/2)*size)-(Math.floor((v/2)/row)*(row*size)) ), 
					"-4", 
					( (this.id==1)? '+' : '-' )+( Math.floor((v/2)/row)*size ) 
				);
			this.mobCount += 1;
		}
	}
}

_nexus.prototype.def_think = function( a ) {
	//console.log(a);
}

_nexus.prototype.Think = function( ) {
	var time = (new Date().getTime());
	if ( time > this.cur+((1000*5)/this.scene.game_tickrate) ) {
		this.cur = time;
		
		this.Spawn( 50, 20 );
	}
}
