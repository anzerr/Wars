
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["box"] = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("mob"+id, 6.0, scene), scene );
	this.materialcolor = new BABYLON.StandardMaterial("material01", scene);
	this.materialcolor.diffuseColor = new BABYLON.Color3(((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0);
	this.self.self.material = this.materialcolor;

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

mob["box"].prototype = new _mob();
mob["box"].prototype.type = "box"
mob["box"].prototype.name = "Box";
mob["box"].prototype.powertype = 3;

mob["box"].prototype.cost = 50;
mob["box"].prototype.income = 2;

mob["box"].prototype.size = 2;
mob["box"].prototype.heightoffset = 2;

mob["box"].prototype.speed = 0.4;
mob["box"].prototype.maxhp = 20;
mob["box"].prototype.hp = 20;
mob["box"].prototype.range = 4;
mob["box"].prototype.attackspeed = 0.75;
mob["box"].prototype.attack_dmg = 2;

mob["box"].prototype.extend_attack = function() {
	if ( Math.round(Math.random()*4) == 1 ) {
		this.scene.sound.play( "hit_"+(1+Math.round(Math.random()*2))+".mp3", "fx", 0.10 );
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["box_'+i+'"] = '+mob["box"].toString() ); 
	mob["box_"+i].prototype = new _mob();
	mob["box_"+i].prototype.type = "box_"+i;
	mob["box_"+i].prototype.name = mob["box"].prototype.name+" tier "+i;
	mob["box_"+i].prototype.powertype = mob["box"].prototype.powertype;

	mob["box_"+i].prototype.cost = (mob["box"].prototype.cost*Math.pow(2,i-1));
	mob["box_"+i].prototype.income = (mob["box"].prototype.income*i);

	mob["box_"+i].prototype.size = mob["box"].prototype.size;
	mob["box_"+i].prototype.heightoffset = mob["box"].prototype.heightoffset;

	mob["box_"+i].prototype.speed = mob["box"].prototype.speed;
	mob["box_"+i].prototype.maxhp = (mob["box"].prototype.maxhp*i);
	mob["box_"+i].prototype.hp = (mob["box"].prototype.hp*i);
	mob["box_"+i].prototype.range = mob["box"].prototype.range;
	mob["box_"+i].prototype.attackspeed = mob["box"].prototype.attackspeed;
	mob["box_"+i].prototype.attack_dmg = (mob["box"].prototype.attack_dmg*i);
}