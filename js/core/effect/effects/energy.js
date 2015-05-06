
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["energy"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
		
	this.self = new _baseEnt( BABYLON.Mesh.CreatePlane("energy_effect", 6.0, this.scene), this.scene );
	this.lifeTime = 5000;
	this.cur = this.lifeTime*-1;
	this.run = false;
	this.lastrun = -1;
}

_effect["energy"].prototype.start = function( arg ) {
	if (this.scene.globaltime > this.cur) {
		this.lifeTime = 4000 + Math.round(Math.random() * 4000);
		this.cur = this.scene.globaltime+(this.lifeTime/this.scene._gamepref.gamespeed);

		this.self.setPos( arg.pos.x, -0.75, arg.pos.z );
		this.self.setRot(90,0,0);

		this.dir = 1+Math.round(Math.random()*3);
		this.self.setScale( 1.5, 1.5, 1 );
		this.change = 31;
		this.changecur = this.change;
		this.speed = 1;//1+Math.round( Math.random()* 2 );
		this.colors = arg.color;

		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["energy"].prototype.color = function( r, g, b, a ) {
	var material = new BABYLON.StandardMaterial( "material01", this.scene );
		material.diffuseColor = new BABYLON.Color3(r, g, b);
		material.alpha = a;
	this.self.self.material = material;
}

_effect["energy"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.scene.globaltime + (this.lifeTime * 2);
		this.color( 0, 0, 0, 0 );
		this.run = false;
	}
	if (this.scene.globaltime > this.lastrun && this.lastrun != -1) {
		this.self.remove();
		 this.scene.loadEffect.load[this.clear[0]][this.clear[1]] = null
		this.lastrun = -1
	}
}

_effect["energy"].prototype.think = function() {
	if (this.scene.globaltime < this.cur) {
		if ( this.changecur <= 0 ) {
			this.dir = ( ( this.dir == 1 || this.dir == 2)? (3+Math.round(Math.random()*1)) : (1+Math.round(Math.random()*1)) );
			//this.self.setScale( ( (this.dir == 1 || this.dir == 2)?2:0.2), ( (this.dir == 3 || this.dir == 4)?2:0.2) , 1 );
			this.changecur = this.change;
		}
		this.self.setPos( 
			"+"+( (this.dir == 1)?-1*this.speed: ( (this.dir == 2)?this.speed:0) ), 
			"+0", 
			"+"+( (this.dir == 3)?-1*this.speed: ( (this.dir == 4)?this.speed:0) ) 
		);
		this.color( this.colors.r, this.colors.g, this.colors.b, 
			Math.max( 1, (this.cur-this.scene.globaltime) )/(this.lifeTime/this.scene._gamepref.gamespeed)
		);
		this.changecur += -1;
	} else {
		this.stop();
	}
}
