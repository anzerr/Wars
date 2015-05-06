
var _mob = function () {}

_mob.prototype.distance = function( x1, y1, x2, y2 ) {
	return Math.sqrt( Math.pow( x2-x1, 2) + Math.pow( y2-y1, 2) );
}

_mob.prototype.angle = function( x1, y1, x2, y2 ) {
	return ( Math.atan2(y2-y1,x2-x1) );
}
	
_mob.prototype.colision = function( b, colbox ) {
	var tmp; box = Math.floor(b.x/colbox["scale"])+','+Math.floor(b.z/colbox["scale"]);
	if (typeof(colbox[box]) != "undefined") {
		if (colbox[box].length > 1) {
			for (var i in colbox[box]) {
				if (i != this.selfid && isset(this.mob[i])) {
					var a = this.mob[i].self.getPos();
					if ((tmp = this.distance(a.x-(this.size/2), a.z-(this.size/2), b.x-(this.mob[i].size/2), b.z-(this.mob[i].size/2))) <= (this.size + this.mob[i].size)) {
						return {dis:tmp, self:this.mob[i]};
					}
				}
			}
		}
	}
	this.colbox = colbox;
	return {dis:false, self:-1};
}

_mob.prototype.target = function( b, colbox ) {
	var tmp = 0; id = -1;
	if ( this.scene.globaltime > this.target_cur || this.attack.hp <= 0 || !isset(this.attack) ) {
		this.target_cur = this.scene.globaltime+500;
		
		var d = this.nexustarget.self.getPos();
		var targdis = this.distance(d.x, d.z, b.x, b.z)

		for (var i in this.mob) {
			if (i != this.selfid && isset(this.mob[i])) {
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
	this.hp -= parseInt(a);
	this.attack = attacker;
	if (a != 0) {
		this.hitoffset = Math.max( this.size/5, this.hitoffset-=0.1 );
	}
	if ( this.hp <= 0 && !this.isdead ) {
		this.isdead = true;
		this.scene.loadEffect.effect( "dead", { "pos":this.self.getPos() } );
		this.nexus[this.parentid].mobCount += -1;
		this.nexus[this.parentid].maxincome += this.income;
		this.self.remove();
		this.mob[this.selfid] = null;
	}
	if ( isset(this.extend_def) ){
		this.extend_def();
	}
}

_mob.prototype.attack_think = function() {
	var gamespeed = this.scene._gamepref.gamespeed;
	var a = this.self.getPos(), b = this.attack.self.getPos(), c = this.angle(b.x, b.z, a.x, a.z);

	if ( this.scene.globaltime > this.attack_think_cur+( (1000/(this.attackspeed*scene.game_tickrate))/gamespeed ) ) {
		this.attack_think_cur = this.scene.globaltime;
	
		if (typeof(this.attack) != "undefined") {
			var modif = { 1:1, 2:1, 3:1 };
			if (this.powertype == 1) {
				modif = { 1:1, 2:2, 3:0.5 };
			} else if (this.powertype == 2) {
				modif = { 1:0.5, 2:1, 3:2 };
			} else if (this.powertype == 3) {
				modif = { 1:2, 2:0.5, 3:1 };
			}

			var dmg = ( (this.attack == this.nexustarget && this.attack_dmg == 0)? 1 : this.attack_dmg )
			this.attack.def_think(
				( modif[( ( isset(this.attack.powertype) )? this.attack.powertype : 1)]*dmg ), 
				this.mob[this.selfid]
			);

			if (this.attack == this.nexustarget) {
				this.def_think(50000, this.nexustarget);
			}
		}
		if ( isset(this.extend_attack) ){
			this.extend_attack();
		}
	}
	this.self.setRot( 0, (180*(c/Math.PI))+180, 0 );
}

_mob.prototype.Think = function( colbox ) {
	var b = this.self.getPos();
	var a = this.target( b, colbox ).self.getPos();
	var gamespeed = this.scene._gamepref.gamespeed;

	this.hitoffset = Math.min( 1, this.hitoffset+=0.01 );
	var sesc = (this.size*0.2)*this.hitoffset;
	this.self.setScale(sesc, sesc, sesc);

	var range = ( (this.attack == this.nexustarget)? 5 : this.range );
	if ( this.distance(a.x, a.z, b.x, b.z) > (range+this.size+this.attack.size) ) {
		var c = ( (this.colOffset >= 0.5) ? this.angle(b.x, b.z, a.x, a.z) : this.offset );
		var col = this.colision( {x:(b.x+(Math.cos(c)*(this.speed*gamespeed))), z:(b.z+(Math.sin(c)*(this.speed*gamespeed)))}, colbox );

		if (col.dis == false) {
			this.self.setRot( 0, (180*(c/Math.PI)), 0 );
			this.self.setPos( "+"+(Math.cos(c)*((this.speed*gamespeed)*this.colOffset)), "+0", "+"+(Math.sin(c)*((this.speed*gamespeed)*this.colOffset)) );
			this.colOffset = Math.min(1,this.colOffset+(0.01*gamespeed))
		} else {
			var ax = col.self.self.getPos(), bx = this.self.getPos(), angt = 0, dist = 0, sizet = (this.size+col.self.size);
			this.offset += (angt = (this.angle(bx.x, bx.z, ax.x, ax.z))); 
			if ( (dist = this.distance(ax.x, ax.z, bx.x, bx.z)) <= (sizet/1.5)) {
				this.self.setPos( "+"+(Math.cos(angt)*(-1*Math.max(1, sizet-dist))), "+0", "+"+(Math.sin(angt)*(-1*Math.max(1, sizet-dist))));
			}
			this.colOffset = 0.1;
		}
	} else {
		this.attack_think();
	}
}

