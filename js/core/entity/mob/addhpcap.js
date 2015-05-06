
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["addhpcap"] = function( scene, nexus, mob, id, selfid ) {
	nexus[id].maxhp += 100;
	this.return = false;
	scene.sound.play( "upgrade.mp3", "fx", 0.5 );
}

mob["addhpcap"].prototype.notmob = true;
mob["addhpcap"].prototype.cost = 500;
mob["addhpcap"].prototype.name = "+100 nexus hp";