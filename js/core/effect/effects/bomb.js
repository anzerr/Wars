
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["bomb"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
		
	this.self = new _baseEnt( BABYLON.Mesh.CreateSphere("bomb_effect", 10.0, 10, this.scene), this.scene );

	this.p = new BABYLON.ParticleSystem("particles", 2000, scene);
	//this.p.particleTexture = new BABYLON.Texture("content/shot.png", scene);
	this.p.particleTexture = this.scene._loadTexture( "./content/box.png" );
	
	this.p.emitter = new BABYLON.Vector3(0, 0, 0);
	this.p.direction1 = new BABYLON.Vector3(0, 10, 0);
	this.p.direction2 = this.p.direction1;
	
    this.p.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    this.p.maxEmitBox = new BABYLON.Vector3(0, 0, 0); 

	this.p.color1 = new BABYLON.Color4(1, 0.5, 0, 1);
    this.p.color2 = new BABYLON.Color4(1, 0.5, 0, 1);
    this.p.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    this.p.minSize = 3;
    this.p.maxSize = 4;

    this.p.minLifeTime = 5;
    this.p.maxLifeTime = 10;

    this.p.emitRate = 5;
	
    this.p.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    this.p.gravity = new BABYLON.Vector3(0, -2, 0);

    this.p.minAngularSpeed = 1;
    this.p.maxAngularSpeed = 2;

    this.p.targetStopDuration = 1;

    this.p.minEmitPower = 0.5;
    this.p.maxEmitPower = 1.5;
    this.p.updateSpeed = 0.1;

	this.lifeTime = 1000;
	this.cur = this.lifeTime*-1;
	this.run = false;
	this.lastrun = -1;

}

_effect["bomb"].prototype.start = function( arg ) {
	if (this.scene.globaltime > this.cur ) {

		this.explodesize = ( (isset(arg.s))? arg.s : 10 );

		this.cur = this.scene.globaltime+(this.lifeTime/this.scene._gamepref.gamespeed);
		this.self.setPos( arg.pos );
		this.self.setScale(0.1,0.1,0.1);

		this.p.minSize = 0.3*this.explodesize;
		this.p.maxSize = 0.4*this.explodesize;

		this.p.minLifeTime = 0.5*this.explodesize;
		this.p.maxLifeTime = 1*this.explodesize;

		this.p.minEmitPower = 0.05*this.explodesize;
		this.p.maxEmitPower = 0.15*this.explodesize;
	
		this.p.emitter = new BABYLON.Vector3( arg.pos.x, arg.pos.y+(0.3*this.explodesize), arg.pos.z);
		this.p.direction1 = new BABYLON.Vector3( -10, 5, -10 );
		this.p.direction2 = new BABYLON.Vector3( 10, 7, 10 )

		this.scene.sound.play( "explode_"+(1+Math.round(Math.random()*3))+".mp3", "fx", 0.05*this.explodesize );

		this.p.start();

		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["bomb"].prototype.color = function( r, g, b, a ) {
	var material = new BABYLON.StandardMaterial( "material01", this.scene );
		material.diffuseColor = new BABYLON.Color3(r, g, b);
		material.emissiveColor = new BABYLON.Color3(r, g, b);
		material.alpha = a;
	this.self.self.material = material;
}

_effect["bomb"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.scene.globaltime+(this.lifeTime*2);
		this.color( 0, 0, 0, 0 );
		this.run = false;
	}
	if ( this.scene.globaltime > this.lastrun && this.lastrun != -1 ) {
		this.self.remove();
		this.scene.loadEffect.load[this.clear[0]][this.clear[1]] = null;
		this.lastrun = -1
	}
}

_effect["bomb"].prototype.think = function() {
	if (this.scene.globaltime < this.cur) {
		this.color( 1, 0.5, 0, Math.max( 1, this.cur-this.scene.globaltime )/(this.lifeTime/this.scene._gamepref.gamespeed) );
		var add = ( (0.005*this.explodesize) * this.scene._gamepref.gamespeed );
		this.self.setScale( "+"+add, "+"+add, "+"+add );	
	} else {
		this.stop();
	}
}
