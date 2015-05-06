
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["dead"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
		
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("death_effect", 6.0, this.scene), this.scene );
	this.cur = 0;
	this.lifeTime = 5000;
	this.run = false;
	this.lastrun = -1;
}

_effect["dead"].prototype.start = function( pos ) {
	var time = (new Date().getTime());
	if ( time > this.cur ) {
		this.cur = time+this.lifeTime
		this.self.setPos( pos );
		this.self.setScale(0.2,0.2,0.2);
		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["dead"].prototype.color = function( r, g, b, a ) {
	var material = new BABYLON.StandardMaterial( "material01", this.scene );
		material.diffuseColor = new BABYLON.Color3(r, g, b);
		material.alpha = a;
	this.self.self.material = material;
}

_effect["dead"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.time+(this.lifeTime*2);
		this.color( 1, 1, 1, 0 );
		this.run = false;
	}
	if ( this.time > this.lastrun && this.lastrun != -1 ) {
		this.self.remove();
		delete this.scene.loadEffect.load[this.clear[0]][this.clear[1]];
		this.lastrun = -1
	}
}

_effect["dead"].prototype.think = function() {
	this.time = (new Date().getTime());
	if ( this.time < this.cur ) {
		this.color( 1, 1, 1, Math.max( 1, this.cur-this.time )/this.lifeTime );
		this.self.setPos( "+0", "+0.25", "+0" );
	} else {
		this.stop();
	}
}
