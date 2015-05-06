
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["dead"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
		
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("death_effect", 6.0, this.scene), this.scene );
	this.lifeTime = 5000;
	this.cur = this.lifeTime*-1;
	this.run = false;
	this.lastrun = -1;
}

_effect["dead"].prototype.start = function( arg ) {
	if (this.scene.globaltime > this.cur ) {
		this.cur = this.scene.globaltime+(this.lifeTime/this.scene._gamepref.gamespeed);
		this.scene.sound.play( "death_"+(1+Math.round(Math.random()*0))+".mp3", "fx", 0.25 );
		this.self.setPos( arg.pos );
		this.self.setScale(0.2,0.2,0.2);
		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["dead"].prototype.color = function( r, g, b, a ) {
	var material = new BABYLON.StandardMaterial( "material01", this.scene );
		material.diffuseColor = new BABYLON.Color3(r, g, b);
		material.emissiveColor = new BABYLON.Color3(r, g, b);
		material.alpha = a;
	this.self.self.material = material;
}

_effect["dead"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.scene.globaltime+(this.lifeTime*2);
		this.color( 1, 1, 1, 0 );
		this.run = false;
	}
	if ( this.scene.globaltime > this.lastrun && this.lastrun != -1 ) {
		this.self.remove();
		this.scene.loadEffect.load[this.clear[0]][this.clear[1]] = null;
		this.lastrun = -1
	}
}

_effect["dead"].prototype.think = function() {
	if (this.scene.globaltime < this.cur) {
		this.color( 0.5, 0.5, 0.5, Math.max( 1, this.cur-this.scene.globaltime )/(this.lifeTime/this.scene._gamepref.gamespeed) );
		this.self.setPos( "+0", "+"+(0.25*this.scene._gamepref.gamespeed), "+0" );
	} else {
		this.stop();
	}
}
