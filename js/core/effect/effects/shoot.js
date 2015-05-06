
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["shoot"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
		
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("shoot_effect", 6.0, this.scene), this.scene );

	this.lifeTime = 1000;
	this.cur = this.lifeTime*-1;
	this.run = false;
	this.lastrun = -1;
}

_effect["shoot"].prototype.start = function( arg ) {
	if (this.scene.globaltime > this.cur ) {
		
		this.bomb = arg.pos;
		this.explodesize = ( (isset(arg.s))? arg.s : 2 );
		this.self.setPos( arg.pos );
		this.ang = this.self.angle(arg.pos.x, arg.pos.z, arg.dest.x, arg.dest.z);
		this.self.setRot( 0, (180*(this.ang/Math.PI))+180, 0 );
		this.speed = 0.5;

		this.lifeTime = ((this.self.distance(arg.pos.x, arg.pos.z, arg.dest.x, arg.dest.z)-3)*40)*this.speed;
		this.cur = this.scene.globaltime+(this.lifeTime/this.scene._gamepref.gamespeed);

		this.color( 0.5, 0.5, 0.3, 1 );
		this.self.setScale( 0.15*this.explodesize, 0.05*this.explodesize, 0.05*this.explodesize );
		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["shoot"].prototype.color = function( r, g, b, a ) {
	var material = new BABYLON.StandardMaterial( "material01", this.scene );
		material.diffuseColor = new BABYLON.Color3(r, g, b);
		material.emissiveColor = new BABYLON.Color3(r, g, b);
		material.alpha = a;
	this.self.self.material = material;
}

_effect["shoot"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.scene.globaltime+(this.lifeTime*4);
		this.color( 1, 1, 1, 0 );
		this.scene.loadEffect.effect( "bomb", { "pos":this.bomb, "s":this.explodesize } );
		this.run = false;
	}
	if ( this.scene.globaltime > this.lastrun && this.lastrun != -1 ) {
		this.self.remove();
		this.scene.loadEffect.load[this.clear[0]][this.clear[1]] = null;
		this.lastrun = -1
	}
}

_effect["shoot"].prototype.think = function() {
	if (this.scene.globaltime < this.cur) {
		//this.color( 0.5, 0.5, 0.5, Math.max( 1, this.cur-this.scene.globaltime )/(this.lifeTime/this.scene._gamepref.gamespeed) );
		this.self.setPos( 
			"+"+( (Math.cos(this.ang)*this.scene._gamepref.gamespeed) * this.speed), 
			"+0",
			"+"+( (Math.sin(this.ang)*this.scene._gamepref.gamespeed) * this.speed)
		);
	} else {
		this.stop();
	}
}
