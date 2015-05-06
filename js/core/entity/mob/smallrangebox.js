
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["smallrangebox"] = function( scene, nexus, mob, id, selfid ) {
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

mob["smallrangebox"].prototype = new _mob();
mob["smallrangebox"].prototype.type = "smallrangebox"
mob["smallrangebox"].prototype.name = "Small Tank";
mob["smallrangebox"].prototype.powertype = 1;

mob["smallrangebox"].prototype.cost = 25;
mob["smallrangebox"].prototype.income = 2;

mob["smallrangebox"].prototype.size = 1;
mob["smallrangebox"].prototype.heightoffset = 2;

mob["smallrangebox"].prototype.speed = 0.3;
mob["smallrangebox"].prototype.maxhp = 15;
mob["smallrangebox"].prototype.hp = 15;
mob["smallrangebox"].prototype.range = 25;
mob["smallrangebox"].prototype.attackspeed = 0.75;
mob["smallrangebox"].prototype.attack_dmg = 4;

mob["smallrangebox"].prototype.extend_attack = function() {
	if (this.attack != this.nexustarget) {
		this.scene.loadEffect.effect( "shoot", { "pos":this.self.getPos(), "dest":this.attack.self.getPos() } );
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["smallrangebox_'+i+'"] = '+mob["smallrangebox"].toString() ); 
	mob["smallrangebox_"+i].prototype = new _mob();
	mob["smallrangebox_"+i].prototype.type = "smallrangebox_"+i;
	mob["smallrangebox_"+i].prototype.name = mob["smallrangebox"].prototype.name+" tier "+i;
	mob["smallrangebox_"+i].prototype.powertype = mob["smallrangebox"].prototype.powertype;

	mob["smallrangebox_"+i].prototype.cost = (mob["smallrangebox"].prototype.cost*Math.pow(2,i-1));
	mob["smallrangebox_"+i].prototype.income = (mob["smallrangebox"].prototype.income*i);

	mob["smallrangebox_"+i].prototype.size = mob["smallrangebox"].prototype.size;
	mob["smallrangebox_"+i].prototype.heightoffset = mob["smallrangebox"].prototype.heightoffset;

	mob["smallrangebox_"+i].prototype.speed = mob["smallrangebox"].prototype.speed;
	mob["smallrangebox_"+i].prototype.maxhp = (mob["smallrangebox"].prototype.maxhp*i);
	mob["smallrangebox_"+i].prototype.hp = (mob["smallrangebox"].prototype.hp*i);
	mob["smallrangebox_"+i].prototype.range = mob["smallrangebox"].prototype.range;
	mob["smallrangebox_"+i].prototype.attackspeed = mob["smallrangebox"].prototype.attackspeed;
	mob["smallrangebox_"+i].prototype.attack_dmg = (mob["smallrangebox"].prototype.attack_dmg*i);
	mob["smallrangebox_"+i].prototype.extend_attack = mob["smallrangebox"].prototype.extend_attack;
}