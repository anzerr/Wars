
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["heal"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
	this.speed = 10;
	
	this.p = new BABYLON.ParticleSystem("particles", 2000, scene);
	//this.p.particleTexture = new BABYLON.Texture("content/shot.png", scene);
	this.p.particleTexture = this.scene._loadTexture( "./content/line.png" );
	
	this.p.emitter = new BABYLON.Vector3(0, 0, 0);
	this.p.direction1 = new BABYLON.Vector3(0, 10, 0);
	this.p.direction2 = this.p.direction1;
	
    this.p.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    this.p.maxEmitBox = new BABYLON.Vector3(0, 0, 0); 

	this.p.color1 = new BABYLON.Color4(0, 1, 0, 1);
    this.p.color2 = new BABYLON.Color4(0, 1, 0, 1);
    this.p.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    this.p.minSize = 1;
    this.p.maxSize = 2;

    this.p.minLifeTime = 3;
    this.p.maxLifeTime = 4;

    this.p.emitRate = 1;
	
    this.p.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    this.p.gravity = new BABYLON.Vector3(0, 1, 0);

    this.p.minAngularSpeed = 0;
    this.p.maxAngularSpeed = 0;

    this.p.targetStopDuration = 7;

    this.p.minEmitPower = 0.2;
    this.p.maxEmitPower = 0.4;
    this.p.updateSpeed = 0.1;
	
	this.cur = 0;
	this.lifeTime = 1000;
	this.run = false;
	this.lastrun = -1;
}

_effect["heal"].prototype.start = function( a ) {
	var time = (new Date().getTime());
	if ( time > this.cur ) {
		this.cur = time+this.lifeTime

		this.p.emitter = new BABYLON.Vector3( a.p.x, a.p.y, a.p.z);
		this.p.direction1 = new BABYLON.Vector3( -2, 0, -2 );
		this.p.direction2 = new BABYLON.Vector3( 2, 5, 2 )
		
		this.p.color1 = new BABYLON.Color4( a.c.r, a.c.g, a.c.b, 1);
		this.p.color2 = new BABYLON.Color4( a.c.r, a.c.g, a.c.b, 1);

		this.p.start();
	
		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["heal"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.time+(this.lifeTime*2);
		this.run = false;
	}
	if ( this.time > this.lastrun && this.lastrun != -1 ) {
		this.scene.loadEffect.load[this.clear[0]][this.clear[1]] = null;
		this.lastrun = -1
	}
}

_effect["heal"].prototype.think = function() {
	this.time = (new Date().getTime());
	if ( this.time < this.cur ) {
		// NONE
	} else {
		this.stop();
	}
}
