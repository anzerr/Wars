
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["rangebox"] = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("mob"+id, 6.0, scene), scene );
	this.self.color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );

	// EXTRA MODELS
	this.extend = {};
	this.extramodel = 0;
		this.extend[this.extramodel] = new _baseEnt( BABYLON.Mesh.CreateCylinder("mob_"+id+"_"+this.extramodel, 4, 5, 5, 6, scene, false), scene );
		this.extend[this.extramodel].setPos( this.self.getPos() );
		this.extend[this.extramodel].setPos( "+0", "+4", "+0" );
		this.extend[this.extramodel].self.parent = this.self.self;
		this.extend[this.extramodel].color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );
		this.extramodel += 1;

		this.extend[this.extramodel] = new _baseEnt( BABYLON.Mesh.CreateCylinder("mob_"+id+"_"+this.extramodel, 6, 2, 2, 6, scene, false), scene );
		this.extend[this.extramodel].setPos( this.self.getPos() );
		this.extend[this.extramodel].setRot( 0, 0, 90 );
		this.extend[this.extramodel].setPos( "+3", "+4", "+0" );
		this.extend[this.extramodel].self.parent = this.self.self;
		this.extend[this.extramodel].color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );
		this.extramodel += 1;

		this.extend[this.extramodel] = new _baseEnt( BABYLON.Mesh.CreateBox("mob_"+id+"_"+this.extramodel, 6.0, scene), scene );
		this.extend[this.extramodel].setPos( this.self.getPos() );
		//this.extend[this.extramodel].setRot( 0, 0, 90 );
		this.extend[this.extramodel].setPos( "+0", "-1", "+0" );
		this.extend[this.extramodel].setScale( 2, 0.7, 1.5 );
		this.extend[this.extramodel].self.parent = this.self.self;
		this.extend[this.extramodel].color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );
		this.extramodel += 1;

	this.parentid = id;
	this.mob = mob;
	this.nexus = nexus;
	this.scene = scene;
	this.selfid = selfid;
	
	for ( var i in this.nexus ) {
		if (this.nexus[i].id != id) {
			this.nexustarget = this.nexus[i];
		}
	}
	this.attack = this.nexustarget;
	this.effect = this.nexus[this.parentid].effect

	this.colOffset = 1;
	this.offset = 0;

	this.self.setScale(0.2,0.2,0.2);
		
	this.attack_think_cur = 0;
	this.target_cur = 0;

	this.hitoffset = 1;
	this.isdead = false;
}

mob["rangebox"].prototype = new _mob();
mob["rangebox"].prototype.type = "rangebox"
mob["rangebox"].prototype.name = "Tank";
mob["rangebox"].prototype.powertype = 3;

mob["rangebox"].prototype.cost = 45;
mob["rangebox"].prototype.income = 2;

mob["rangebox"].prototype.size = 2;
mob["rangebox"].prototype.heightoffset = 2;

mob["rangebox"].prototype.speed = 0.2;
mob["rangebox"].prototype.maxhp = 25;
mob["rangebox"].prototype.hp = 25;
mob["rangebox"].prototype.range = 25;
mob["rangebox"].prototype.attackspeed = 0.75;
mob["rangebox"].prototype.attack_dmg = 3;

mob["rangebox"].prototype.extend_attack = function() {
	if (this.attack != this.nexustarget) {
		this.scene.loadEffect.effect( "shoot", { "pos":this.self.getPos(), "dest":this.attack.self.getPos() } );
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["rangebox_'+i+'"] = '+mob["rangebox"].toString() ); 
	mob["rangebox_"+i].prototype = new _mob();
	mob["rangebox_"+i].prototype.type = "rangebox_"+i;
	mob["rangebox_"+i].prototype.name = mob["rangebox"].prototype.name+" tier "+i;
	mob["rangebox_"+i].prototype.powertype = mob["rangebox"].prototype.powertype;

	mob["rangebox_"+i].prototype.cost = (mob["rangebox"].prototype.cost*Math.pow(2,i-1));
	mob["rangebox_"+i].prototype.income = (mob["rangebox"].prototype.income*i);

	mob["rangebox_"+i].prototype.size = mob["rangebox"].prototype.size;
	mob["rangebox_"+i].prototype.heightoffset = mob["rangebox"].prototype.heightoffset;

	mob["rangebox_"+i].prototype.speed = mob["rangebox"].prototype.speed;
	mob["rangebox_"+i].prototype.maxhp = (mob["rangebox"].prototype.maxhp*i);
	mob["rangebox_"+i].prototype.hp = (mob["rangebox"].prototype.hp*i);
	mob["rangebox_"+i].prototype.range = mob["rangebox"].prototype.range;
	mob["rangebox_"+i].prototype.attackspeed = mob["rangebox"].prototype.attackspeed;
	mob["rangebox_"+i].prototype.attack_dmg = (mob["rangebox"].prototype.attack_dmg*i);
	mob["rangebox_"+i].prototype.extend_attack = mob["rangebox"].prototype.extend_attack;
}