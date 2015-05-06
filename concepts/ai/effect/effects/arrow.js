
if ( typeof(_effect) == "undefined") { var _effect = []; }

_effect["arrow"] = function( a, b ) {
	this.scene = a;
	this.clear = b;
	this.speed = 10;
	
	this.p = new BABYLON.ParticleSystem("particles", 2000, scene);
	//this.p.particleTexture = new BABYLON.Texture("content/shot.png", scene);
	this.p.particleTexture = this.scene._loadTexture( "content/shot.png" );
	
	this.p.emitter = new BABYLON.Vector3(0, 0, 0);
	this.p.direction1 = new BABYLON.Vector3(0, 10, 0);
	this.p.direction2 = this.p.direction1;
	
    this.p.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    this.p.maxEmitBox = new BABYLON.Vector3(0, 0, 0); 

	this.p.color1 = new BABYLON.Color4(1, 1, 0, 1);
    this.p.color2 = new BABYLON.Color4(1, 1, 0, 1);
    this.p.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    this.p.minSize = 0.75;
    this.p.maxSize = 0.75;

    this.p.minLifeTime = (1/this.speed)/this.scene.game_tickrate;
    this.p.maxLifeTime = this.p.minLifeTime;

    this.p.emitRate = 50;
	
    this.p.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    this.p.gravity = new BABYLON.Vector3(0, 0, 0);

    this.p.minAngularSpeed = 0;
    this.p.maxAngularSpeed = 0;

    this.p.targetStopDuration = 0.1;

    this.p.minEmitPower = this.speed*this.scene.game_tickrate;
    this.p.maxEmitPower = this.p.minEmitPower;
    this.p.updateSpeed = 0.01;
	
	this.cur = 0;
	this.lifeTime = 1000;
	this.run = false;
	this.lastrun = -1;
}

_effect["arrow"].prototype.start = function( a ) {
	var time = (new Date().getTime());
	if ( time > this.cur ) {
		this.cur = time+this.lifeTime

		this.p.emitter = new BABYLON.Vector3(a.p1.x, a.p1.y, a.p1.z);
		this.p.direction1 = new BABYLON.Vector3( a.p2.x-a.p1.x, a.p2.y-a.p1.y, a.p2.z-a.p1.z );
		this.p.direction2 = this.p.direction1;
		
		this.p.color1 = new BABYLON.Color4(((a.t==0)?0:1), ((a.t==0)?1:0), 0, 1);
		this.p.color2 = new BABYLON.Color4(((a.t==0)?0:1), ((a.t==0)?1:0), 0, 1);
		
		this.p.minLifeTime = (1/this.speed)/this.scene.game_tickrate;
		this.p.maxLifeTime = this.p.minLifeTime;

		this.p.minEmitPower = this.speed*this.scene.game_tickrate;
		this.p.maxEmitPower = this.p.minEmitPower;
		
		this.p.start();
	
		this.run = true;
		
		return (true);
	}
	return (false);
}

_effect["arrow"].prototype.stop = function( ) {
	if ( this.run == true ) {
		this.lastrun = this.time+(this.lifeTime*2);
		this.run = false;
	}
	if ( this.time > this.lastrun && this.lastrun != -1 ) {
		delete this.scene.loadEffect.load[this.clear[0]][this.clear[1]];
		this.lastrun = -1
	}
}

_effect["arrow"].prototype.think = function() {
	this.time = (new Date().getTime());
	if ( this.time < this.cur ) {
		// NONE
	} else {
		this.stop();
	}
}
