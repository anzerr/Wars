
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["healnexus"] = function( scene, nexus, mob, id, selfid ) {
	this.return = ( (nexus[id].hp == nexus[id].maxhp)? true : false );
	nexus[id].hp = Math.min( nexus[id].maxhp, nexus[id].hp+100 );
	scene.sound.play( "heal.mp3", "fx", 0.5 );
}

mob["healnexus"].prototype.notmob = true;
mob["healnexus"].prototype.cost = 150;
mob["healnexus"].prototype.name = "Heal 100HP";