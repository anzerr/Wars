
if (typeof (mob) == "undefined") {
	mob = [];
}

mob["bigbox"] = function (scene, nexus, mob, id, selfid) {
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

mob["bigbox"].prototype = new _mob();
mob["bigbox"].prototype.type = "bigbox"
mob["bigbox"].prototype.name = "Big Box";
mob["bigbox"].prototype.powertype = 2;

mob["bigbox"].prototype.cost = 70;
mob["bigbox"].prototype.income = 3;

mob["bigbox"].prototype.size = 2.5;
mob["bigbox"].prototype.heightoffset = 3;

mob["bigbox"].prototype.speed = 0.2;
mob["bigbox"].prototype.maxhp = 35;
mob["bigbox"].prototype.hp = 35;
mob["bigbox"].prototype.range = 5;
mob["bigbox"].prototype.attackspeed = 0.25;
mob["bigbox"].prototype.attack_dmg = 4;

mob["bigbox"].prototype.extend_attack = function() {
	if ( Math.round(Math.random()*4) == 1 ) {
		this.scene.sound.play( "hit_"+(1+Math.round(Math.random()*2))+".mp3", "fx", 0.10 );
	}
}

for (var i=2; i<=3; i++) {
	eval( 'mob["bigbox_'+i+'"] = '+mob["bigbox"].toString() ); 
	mob["bigbox_"+i].prototype = new _mob();
	mob["bigbox_"+i].prototype.type = "bigbox_"+i;
	mob["bigbox_"+i].prototype.name = mob["bigbox"].prototype.name+" tier "+i;
	mob["bigbox_"+i].prototype.powertype = mob["bigbox"].prototype.powertype;

	mob["bigbox_"+i].prototype.cost = (mob["bigbox"].prototype.cost*Math.pow(2,i-1));
	mob["bigbox_"+i].prototype.income = (mob["bigbox"].prototype.income*i);

	mob["bigbox_"+i].prototype.size = mob["bigbox"].prototype.size;
	mob["bigbox_"+i].prototype.heightoffset = mob["bigbox"].prototype.heightoffset;

	mob["bigbox_"+i].prototype.speed = mob["bigbox"].prototype.speed;
	mob["bigbox_"+i].prototype.maxhp = (mob["bigbox"].prototype.maxhp*i);
	mob["bigbox_"+i].prototype.hp = (mob["bigbox"].prototype.hp*i);
	mob["bigbox_"+i].prototype.range = mob["bigbox"].prototype.range;
	mob["bigbox_"+i].prototype.attackspeed = mob["bigbox"].prototype.attackspeed;
	mob["bigbox_"+i].prototype.attack_dmg = (mob["bigbox"].prototype.attack_dmg*i);
}