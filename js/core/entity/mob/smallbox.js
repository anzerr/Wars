
if (typeof (mob) == "undefined") {
	mob = [];
}

mob["smallbox"] = function (scene, nexus, mob, id, selfid) {
	this.self = new _baseEnt(BABYLON.Mesh.CreateBox("mob" + id, 6.0, scene), scene);
	this.materialcolor = new BABYLON.StandardMaterial("material01", scene);
	this.materialcolor.diffuseColor = new BABYLON.Color3(((id == 0) ? 0 : 1), ((id == 0) ? 1 : 0), 0);
	this.self.self.material = this.materialcolor;

	this.parentid = id;
	this.mob = mob;
	this.nexus = nexus;
	this.scene = scene;
	this.selfid = selfid;

	for (var i in this.nexus) {
		if (this.nexus[i].id != id) {
			this.nexustarget = this.nexus[i];
		}
	}
	this.attack = this.nexustarget;
	this.effect = this.nexus[this.parentid].effect

	this.colOffset = 1;
	this.offset = 0;

	this.self.setScale(0.4, 0.4, 0.4);

	this.attack_think_cur = 0;
	this.target_cur = 0;

	this.hitoffset = 1;
	this.isdead = false;
}

mob["smallbox"].prototype = new _mob();
mob["smallbox"].prototype.type = "smallbox"
mob["smallbox"].prototype.name = "Small Box";
mob["smallbox"].prototype.powertype = 1;

mob["smallbox"].prototype.cost = 15;
mob["smallbox"].prototype.income = 1;

mob["smallbox"].prototype.size = 1;
mob["smallbox"].prototype.heightoffset = 1;

mob["smallbox"].prototype.speed = 0.6;
mob["smallbox"].prototype.maxhp = 10;
mob["smallbox"].prototype.hp = 10;
mob["smallbox"].prototype.range = 3;
mob["smallbox"].prototype.attackspeed = 1;
mob["smallbox"].prototype.attack_dmg = 1;

mob["smallbox"].prototype.extend_attack = function() {
	if ( Math.round(Math.random()*4) == 1 ) {
		this.scene.sound.play( "hit_"+(1+Math.round(Math.random()*2))+".mp3", "fx", 0.10 );
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["smallbox_'+i+'"] = '+mob["smallbox"].toString() ); 
	mob["smallbox_"+i].prototype = new _mob();
	mob["smallbox_"+i].prototype.type = "smallbox_"+i;
	mob["smallbox_"+i].prototype.name = mob["smallbox"].prototype.name+" tier "+i;
	mob["smallbox_"+i].prototype.powertype = mob["smallbox"].prototype.powertype;

	mob["smallbox_"+i].prototype.cost = (mob["smallbox"].prototype.cost*Math.pow(2,i-1));
	mob["smallbox_"+i].prototype.income = (mob["smallbox"].prototype.income*i);

	mob["smallbox_"+i].prototype.size = mob["smallbox"].prototype.size;
	mob["smallbox_"+i].prototype.heightoffset = mob["smallbox"].prototype.heightoffset;

	mob["smallbox_"+i].prototype.speed = mob["smallbox"].prototype.speed;
	mob["smallbox_"+i].prototype.maxhp = (mob["smallbox"].prototype.maxhp*i);
	mob["smallbox_"+i].prototype.hp = (mob["smallbox"].prototype.hp*i);
	mob["smallbox_"+i].prototype.range = mob["smallbox"].prototype.range;
	mob["smallbox_"+i].prototype.attackspeed = mob["smallbox"].prototype.attackspeed;
	mob["smallbox_"+i].prototype.attack_dmg = (mob["smallbox"].prototype.attack_dmg*i);
}