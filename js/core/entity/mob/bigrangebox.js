
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["bigrangebox"] = function( scene, nexus, mob, id, selfid ) {
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

mob["bigrangebox"].prototype = new _mob();
mob["bigrangebox"].prototype.type = "bigrangebox"
mob["bigrangebox"].prototype.name = "Big Tank";
mob["bigrangebox"].prototype.powertype = 2;

mob["bigrangebox"].prototype.cost = 70;
mob["bigrangebox"].prototype.income = 3;

mob["bigrangebox"].prototype.size = 3;
mob["bigrangebox"].prototype.heightoffset = 2;

mob["bigrangebox"].prototype.speed = 0.1;
mob["bigrangebox"].prototype.maxhp = 25;
mob["bigrangebox"].prototype.hp = 25;
mob["bigrangebox"].prototype.range = 75;
mob["bigrangebox"].prototype.attackspeed = 0.25;
mob["bigrangebox"].prototype.attack_dmg = 10;

mob["bigrangebox"].prototype.extend_attack = function() {
	if (this.attack != this.nexustarget) {
		this.scene.loadEffect.effect( "shoot", { "pos":this.self.getPos(), "dest":this.attack.self.getPos(), "s":4 } );

		if ( isset(this.colbox) ) {
			var p = this.attack.self.getPos();
			for (var x=-1; x<=1; x++) {
				for (var y=-1; y<=1; y++) {
					var box = (Math.floor(p.x/this.colbox["scale"])+x)+','+(Math.floor(p.z/this.colbox["scale"])+y);
					if (typeof(this.colbox[box]) != "undefined") {
						if (this.colbox[box].length > 2) {
							for (var i in this.colbox[box]) {
								if ( isset(this.mob[i]) ) {
									var mp = this.mob[i].self.getPos();
									if ( i != this.selfid && this.distance(p.x, p.z, mp.x, mp.z) < 10 ) {
										this.mob[i].def_think( this.attack_dmg/2, this );
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["bigrangebox_'+i+'"] = '+mob["bigrangebox"].toString() ); 
	mob["bigrangebox_"+i].prototype = new _mob();
	mob["bigrangebox_"+i].prototype.type = "bigrangebox_"+i;
	mob["bigrangebox_"+i].prototype.name = mob["bigrangebox"].prototype.name+" tier "+i;
	mob["bigrangebox_"+i].prototype.powertype = mob["bigrangebox"].prototype.powertype;

	mob["bigrangebox_"+i].prototype.cost = (mob["bigrangebox"].prototype.cost*Math.pow(2,i-1));
	mob["bigrangebox_"+i].prototype.income = (mob["bigrangebox"].prototype.income*i);

	mob["bigrangebox_"+i].prototype.size = mob["bigrangebox"].prototype.size;
	mob["bigrangebox_"+i].prototype.heightoffset = mob["bigrangebox"].prototype.heightoffset;

	mob["bigrangebox_"+i].prototype.speed = mob["bigrangebox"].prototype.speed;
	mob["bigrangebox_"+i].prototype.maxhp = (mob["bigrangebox"].prototype.maxhp*i);
	mob["bigrangebox_"+i].prototype.hp = (mob["bigrangebox"].prototype.hp*i);
	mob["bigrangebox_"+i].prototype.range = mob["bigrangebox"].prototype.range;
	mob["bigrangebox_"+i].prototype.attackspeed = mob["bigrangebox"].prototype.attackspeed;
	mob["bigrangebox_"+i].prototype.attack_dmg = (mob["bigrangebox"].prototype.attack_dmg*i);
	mob["bigrangebox_"+i].prototype.extend_attack = mob["bigrangebox"].prototype.extend_attack;
}