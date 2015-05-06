
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["healer"] = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateCylinder("mob_"+id, 10, 15, 0, 6, scene, false), scene );
	this.self.color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 1 );

	// EXTRA MODELS
	this.extend = {};
	this.extramodel = 0;
		this.extend[this.extramodel] = new _baseEnt( BABYLON.Mesh.CreateSphere("mob_"+id, 10.0, 3.0, scene), scene );
		this.extend[this.extramodel].setPos( this.self.getPos() );
		this.extend[this.extramodel].self.parent = this.self.self;
		this.extend[this.extramodel].setScale( 25, 25, 25 );
		this.extend[this.extramodel].color( ((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0, 0.2 );
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

mob["healer"].prototype = new _mob();
mob["healer"].prototype.type = "healer"
mob["healer"].prototype.name = "Healer";
mob["healer"].prototype.powertype = 1;

mob["healer"].prototype.cost = 20;
mob["healer"].prototype.income = 1;

mob["healer"].prototype.size = 1;
mob["healer"].prototype.heightoffset = 1;

mob["healer"].prototype.speed = 0.3;
mob["healer"].prototype.maxhp = 10;
mob["healer"].prototype.hp = 10;
mob["healer"].prototype.range = 15;
mob["healer"].prototype.attackspeed = 1;
mob["healer"].prototype.attack_dmg = 0.1;
mob["healer"].prototype.heal_dmg = 6;

mob["healer"].prototype.extend_attack = function() {
	if ( isset(this.colbox) ) {
		var p = this.self.getPos(), healcount = 0;
		for (var x=-1; x<=1; x++) {
			for (var y=-1; y<=1; y++) {
				var box = (Math.floor(p.x/this.colbox["scale"])+x)+','+(Math.floor(p.z/this.colbox["scale"])+y);

				if ( typeof(this.colbox[box]) != "undefined" ) {
					if (this.colbox[box].length > 1) {
						for (var i in this.colbox[box]) {
							if ( isset(this.mob[i]) ) {
								var mp = this.mob[i].self.getPos();
								if ( this.distance(p.x, p.z, mp.x, mp.z) < (this.range*2) && this.mob[i].parentid == this.parentid ) {
									if ( !isset(this.mob[i].lastheal) ) {
										this.mob[i].lastheal = 0;
									}
									var healtime = ( ((1000*4)/(this.attackspeed*scene.game_tickrate))/this.scene._gamepref.gamespeed );
									if ( this.scene.globaltime > this.mob[i].lastheal+healtime && this.mob[i].hp != this.mob[i].maxhp ) {
										this.mob[i].hp = Math.min( this.mob[i].maxhp, this.mob[i].hp+this.heal_dmg );
										this.mob[i].lastheal = this.scene.globaltime;
										this.mob[i].hitoffset = 1;
										this.scene.loadEffect.effect( "heal", { "p":this.mob[i].self.getPos(), "c":{'r':0, 'g':1, 'b':0} } );
										healcount++;
									}
								}
							}
						}
					}
				}
			}
		}
		if ( healcount != 0 ) {
			this.scene.sound.play( "heal.mp3", "fx", 0.10 );
		}
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["healer_'+i+'"] = '+mob["healer"].toString() ); 
	mob["healer_"+i].prototype = new _mob();
	mob["healer_"+i].prototype.type = "healer_"+i;
	mob["healer_"+i].prototype.name = mob["healer"].prototype.name+" tier "+i;
	mob["healer_"+i].prototype.powertype = mob["healer"].prototype.powertype;

	mob["healer_"+i].prototype.cost = (mob["healer"].prototype.cost*Math.pow(2,i-1));
	mob["healer_"+i].prototype.income = (mob["healer"].prototype.income*i);

	mob["healer_"+i].prototype.size = mob["healer"].prototype.size;
	mob["healer_"+i].prototype.heightoffset = mob["healer"].prototype.heightoffset;

	mob["healer_"+i].prototype.speed = mob["healer"].prototype.speed;
	mob["healer_"+i].prototype.maxhp = (mob["healer"].prototype.maxhp*i);
	mob["healer_"+i].prototype.hp = (mob["healer"].prototype.hp*i);
	mob["healer_"+i].prototype.range = mob["healer"].prototype.range;
	mob["healer_"+i].prototype.attackspeed = mob["healer"].prototype.attackspeed;
	mob["healer_"+i].prototype.attack_dmg = (mob["healer"].prototype.attack_dmg*i);

	mob["healer_"+i].prototype.heal_dmg = (mob["healer"].prototype.heal_dmg*i);
	mob["healer_"+i].prototype.extend_attack = mob["healer"].prototype.extend_attack;
}