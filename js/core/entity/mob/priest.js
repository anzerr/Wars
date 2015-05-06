
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["priest"] = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateCylinder("mob_"+id, 10, 10, 10, 6, scene, false), scene );
	this.self.color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );

	// EXTRA MODELS
	this.extend = {};
	this.extramodel = 0;
		this.extend[this.extramodel] = new _baseEnt( BABYLON.Mesh.CreateCylinder("mob_"+id+"_"+this.extramodel, 10, 15, 0, 6, scene, false), scene );
		this.extend[this.extramodel].setPos( this.self.getPos() );
		this.extend[this.extramodel].setPos( "+0", "+10", "+0" );
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

mob["priest"].prototype = new _mob();
mob["priest"].prototype.type = "priest"
mob["priest"].prototype.name = "Priest";
mob["priest"].prototype.powertype = 1;

mob["priest"].prototype.cost = 50;
mob["priest"].prototype.income = 1;

mob["priest"].prototype.size = 1;
mob["priest"].prototype.heightoffset = 1;

mob["priest"].prototype.speed = 0.2;
mob["priest"].prototype.maxhp = 10;
mob["priest"].prototype.hp = 10;
mob["priest"].prototype.range = 25;
mob["priest"].prototype.attackspeed = 1;
mob["priest"].prototype.attack_dmg = 0;
mob["priest"].prototype.heal_dmg = 1;

mob["priest"].prototype.extend_attack = function() {
	if ( isset(this.attack) ) {
		if (this.attack != this.nexustarget) {
			if ( !isset(this.attack.convert) ) {
				this.attack.convert = 0;
			}

			if (this.attack.convert >= this.attack.maxhp) {
				if ( this.attack.parentid != this.parentid ) {
					this.nexustarget.mobCount += -1;
					this.nexus[this.parentid].mobCount += 1;
					this.attack.nexustarget = this.nexustarget;
					this.attack.parentid = this.parentid;
					this.attack.attack = this.nexustarget;
					this.attack.self.color( ((this.parentid == 0) ? 0 : 1), ((this.parentid == 0) ? 1 : 0), 0, 1 );
					if ( isset(this.attack.extend) ) {
						for (var v in this.attack.extend) {
							 this.attack.extend[v].color( 
								this.attack.self._Color.r, this.attack.self._Color.g, this.attack.self._Color.b, 
								this.attack.extend[v]._Color.a
							);
						}
					}
					this.attack.hitoffset = 1;
					this.attack.convert = 0;
					this.scene.loadEffect.effect( "convert", { "p":this.attack.self.getPos() } );
				}

				this.attack = this.nexustarget;
			} else {
				this.attack.convert += 1;
			}
		}
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["priest_'+i+'"] = '+mob["priest"].toString() ); 
	mob["priest_"+i].prototype = new _mob();
	mob["priest_"+i].prototype.type = "priest_"+i;
	mob["priest_"+i].prototype.name = mob["priest"].prototype.name+" tier "+i;
	mob["priest_"+i].prototype.powertype = mob["priest"].prototype.powertype;

	mob["priest_"+i].prototype.cost = (mob["priest"].prototype.cost*Math.pow(2,i-1));
	mob["priest_"+i].prototype.income = (mob["priest"].prototype.income*i);

	mob["priest_"+i].prototype.size = mob["priest"].prototype.size;
	mob["priest_"+i].prototype.heightoffset = mob["priest"].prototype.heightoffset;

	mob["priest_"+i].prototype.speed = mob["priest"].prototype.speed;
	mob["priest_"+i].prototype.maxhp = (mob["priest"].prototype.maxhp*i);
	mob["priest_"+i].prototype.hp = (mob["priest"].prototype.hp*i);
	mob["priest_"+i].prototype.range = mob["priest"].prototype.range;
	mob["priest_"+i].prototype.attackspeed = mob["priest"].prototype.attackspeed;
	mob["priest_"+i].prototype.attack_dmg = (mob["priest"].prototype.attack_dmg*i);

	mob["priest_"+i].prototype.extend_attack = mob["priest"].prototype.extend_attack;
	mob["priest_"+i].prototype.heal_dmg = (mob["priest"].prototype.heal_dmg*i);
}