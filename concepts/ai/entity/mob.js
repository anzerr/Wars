
var _mob = function( scene, nexus, mob, id, selfid ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateBox("mob"+id, 6.0, scene), scene );
		var material = new BABYLON.StandardMaterial("material01", scene);
			material.diffuseColor = new BABYLON.Color3(((id==0)?0:1), ((id==0)?1:0), 0);
		this.self.self.material = material;

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
	
	this.size = 1;
	this.speed = 0.5;
	this.hp = 10;
	this.range = 5;
	this.attackspeed = Math.round(Math.random()*250)/100;
	
	this.colOffset = 1;
	this.offset = 0;

	this.self.setScale(0.6*this.size,(1*this.size)*(this.hp/10),0.4*this.size);
		
	this.attack_think_cur = 0;
	this.target_cur = 0;

}

_mob.prototype.distance = function( x1, y1, x2, y2 ) {
	return Math.sqrt( Math.pow( x2-x1, 2) + Math.pow( y2-y1, 2) );
}

_mob.prototype.angle = function( x1, y1, x2, y2 ) {
	return ( Math.atan2(y2-y1,x2-x1));
}
	
_mob.prototype.colision = function( b, colbox ) {
	var tmp; box = Math.floor(b.x/colbox["scale"])+','+Math.floor(b.z/colbox["scale"]);
	if (typeof(colbox[box]) != "undefined") {
		if (colbox[box].length > 1) {
			for (var i in colbox[box]) {
				if (i != this.selfid && typeof(this.mob[i]) != "undefined") {
					var a = this.mob[i].self.getPos();
					if ((tmp = this.distance(a.x, a.z, b.x, b.z) ) <= ((2*this.size)+(2*this.mob[i].size))) {
						return {dis:tmp, self:this.mob[i]};
					}
				}
			}
		}
	}
	return {dis:false, self:-1};
}

_mob.prototype.target = function( b, colbox ) {
	var time = (new Date().getTime()), tmp = 0; id = -1;
	if (time > this.target_cur || this.attack.hp <= 0) {
		this.target_cur = time+2500;
		
		var d = this.nexustarget.self.getPos();
		var targdis = this.distance(d.x, d.z, b.x, b.z)

		for (var i in this.mob) {
			if (i != this.selfid) {
				var a = this.mob[i].self.getPos();
				if ((tmp = this.distance(a.x, a.z, b.x, b.z)) < targdis && this.mob[i].parentid != this.parentid && this.mob[i].hp > 0) {
					targdis = tmp; id = i;
				}
			}
		}
		this.attack = ( (id == -1)? this.nexustarget : this.mob[id] )
	}
	
	return (this.attack);
}

_mob.prototype.def_think = function(a, attacker) {
	this.hp -= a;
	this.attack = attacker;
	this.self.setScale(0.6*this.size,(1*this.size)*(this.hp/10),0.4*this.size);
	if (this.hp <= 0) {
		this.scene.loadEffect.effect( "dead", this.self.getPos() );
		this.nexus[ this.parentid ].mobCount += -1;
		this.self.remove();
		this.mob[this.selfid] = null;
		delete this.mob[this.selfid];
	}
}

_mob.prototype.attack_think = function() {
	var time = (new Date().getTime());
	if ( time > this.attack_think_cur+(1000/(this.attackspeed*scene.game_tickrate)) ) {
		this.attack_think_cur = time;
	
		if (typeof(this.attack) != "undefined") {
			var a = this.self.getPos(), b = this.attack.self.getPos(), c = this.angle(b.x, b.z, a.x, a.z);
			if ( this.hp >= 0 && this.attack.hp >= 0 ) {
				//this.effect.run( a, b, this.parentid );
				//this.scene.loadEffect.effect( "arrow", {"p1":a, "p2":b, "t":this.parentid} );
			}
			this.attack.def_think( 1, this.mob[this.selfid] );
			this.self.setRot( 0, (180*(c/Math.PI)), 0 );
		}
	}
}

_mob.prototype.Think = function( colbox ) {
	var b = this.self.getPos();
	var a = this.target( b, colbox ).self.getPos();
	
	if (this.distance(a.x, a.z, b.x, b.z) > this.range) {
		var c = ( (this.colOffset >= 0.5) ? this.angle(b.x, b.z, a.x, a.z) : this.offset );
		var col = this.colision( {x:(b.x+(Math.cos(c)*this.speed)), z:(b.z+(Math.sin(c)*this.speed))}, colbox );

		if (col.dis == false) {
			this.self.setRot( 0, (180*(c/Math.PI)), 0 );
			this.self.setPos( "+"+(Math.cos(c)*(this.speed*this.colOffset)), "+0", "+"+(Math.sin(c)*(this.speed*this.colOffset)) );
			this.colOffset = Math.min(1,this.colOffset+0.01)
		} else {
			var ax = col.self.self.getPos(), bx = this.self.getPos(), angt = 0, dist = 0, sizet = ((2*this.size)+(2*col.self.size));
			this.offset += (angt = (this.angle(bx.x, bx.z, ax.x, ax.z))); 
			if ( (dist = this.distance(ax.x, ax.z, bx.x, bx.z)) <= sizet) {
				this.self.setPos( "+"+(Math.cos(angt)*(-1*Math.max(1, sizet-dist))), "+0", "+"+(Math.sin(angt)*(-1*Math.max(1, sizet-dist))));
			}
			this.colOffset = 0.1;
		}
	} else {
		this.attack_think();
	}
}

