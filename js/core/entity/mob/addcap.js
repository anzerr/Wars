
if (typeof(mob) == "undefined") {
	mob = [];
}

mob["addcap"] = function( scene, nexus, mob, id, selfid ) {
	this.return = ( (nexus[id].maxCap == nexus[id].Cap)? true : false );
	nexus[id].Cap = Math.min( nexus[id].maxCap, nexus[id].Cap+1 );
	scene.sound.play( "upgrade.mp3", "fx", 0.5 );
}

mob["addcap"].prototype.notmob = true;
mob["addcap"].prototype.cost = 200;
mob["addcap"].prototype.name = "+1 Mob Cap";