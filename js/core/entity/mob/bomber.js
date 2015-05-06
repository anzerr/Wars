
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["bomber"] = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateSphere("mob_"+id, 10.0, 10, scene), scene );
	this.self.color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );

	// EXTRA MODELS
	this.extend = {};
	this.extramodel = 0;

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

mob["bomber"].prototype = new _mob();
mob["bomber"].prototype.type = "bomber"
mob["bomber"].prototype.name = "Bomber";
mob["bomber"].prototype.powertype = 2;

mob["bomber"].prototype.cost = 20;
mob["bomber"].prototype.income = 1;

mob["bomber"].prototype.size = 1;
mob["bomber"].prototype.heightoffset = 1;

mob["bomber"].prototype.speed = 0.3;
mob["bomber"].prototype.maxhp = 10;
mob["bomber"].prototype.hp = 10;
mob["bomber"].prototype.range = 4;
mob["bomber"].prototype.attackspeed = 1;
mob["bomber"].prototype.attack_dmg = 50;

mob["bomber"].prototype.extend_attack = function() {
	if ( isset(this.colbox) ) {
		var p = this.self.getPos();
		for (var x=-1; x<=1; x++) {
			for (var y=-1; y<=1; y++) {
				var box = (Math.floor(p.x/this.colbox["scale"])+x)+','+(Math.floor(p.z/this.colbox["scale"])+y);
				if (typeof(this.colbox[box]) != "undefined") {
					if (this.colbox[box].length > 2) {
						for (var i in this.colbox[box]) {
							if ( isset(this.mob[i]) ) {
								var mp = this.mob[i].self.getPos();
								if ( i != this.selfid && this.distance(p.x, p.z, mp.x, mp.z) < 10 && !this.mob[i].isdead ) {
									this.mob[i].def_think( this.attack_dmg, this );
								}
							}
						}
						this.scene.loadEffect.effect( "bomb", { "pos":this.self.getPos(), 's':Math.min( 15, this.attack_dmg/10) } );
						this.def_think( 50000, this.nexustarget );
					}
				}
			}
		}
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["bomber_'+i+'"] = '+mob["bomber"].toString() ); 
	mob["bomber_"+i].prototype = new _mob();
	mob["bomber_"+i].prototype.type = "bomber_"+i;
	mob["bomber_"+i].prototype.name = mob["bomber"].prototype.name+" tier "+i;
	mob["bomber_"+i].prototype.powertype = mob["bomber"].prototype.powertype;

	mob["bomber_"+i].prototype.cost = (mob["bomber"].prototype.cost*Math.pow(2,i-1));
	mob["bomber_"+i].prototype.income = (mob["bomber"].prototype.income*i);

	mob["bomber_"+i].prototype.size = mob["bomber"].prototype.size;
	mob["bomber_"+i].prototype.heightoffset = mob["bomber"].prototype.heightoffset;

	mob["bomber_"+i].prototype.speed = mob["bomber"].prototype.speed;
	mob["bomber_"+i].prototype.maxhp = (mob["bomber"].prototype.maxhp*i);
	mob["bomber_"+i].prototype.hp = (mob["bomber"].prototype.hp*i);
	mob["bomber_"+i].prototype.range = mob["bomber"].prototype.range;
	mob["bomber_"+i].prototype.attackspeed = mob["bomber"].prototype.attackspeed;
	mob["bomber_"+i].prototype.attack_dmg = (mob["bomber"].prototype.attack_dmg*i);

	mob["bomber_"+i].prototype.extend_attack = mob["bomber"].prototype.extend_attack;
}