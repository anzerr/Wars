
var _nexus = function( scene, nexus, mob, id ) {
	this.self = new _baseEnt( BABYLON.Mesh.CreateSphere("nexus_"+id, 10.0, 3.0, scene), scene );
	var material = new BABYLON.StandardMaterial("material01", scene);
		material.diffuseColor = new BABYLON.Color3(((id==0)?0:1), ((id==0)?1:0), 0);
	this.self.self.material = material;
	this.self.setScale(10,10,10);
	this.id = id;
	this.mobCount = 0;
	this.Cap = 25;
	this.size = 1;

	this.mob = mob;
	this.nexus = nexus;
	this.scene = scene;

	this.maxincome = 100;
	this.income = this.maxincome;
	this.maxhp = 1000;
	this.hp = this.maxhp;

	this.incomecur = 0
	this.spawncur = 0
	this.AI_update = 0;

	this.hitoffset = 1;

	this.spawntime = 15;
}
 
_nexus.prototype.effect = function() {
	this.scene.loadEffect.effect("energy", { "pos": this.self.getPos(), "color": { 'r': ((this.id == 0) ? 0 : 1), 'g': ((this.id == 0) ? 1 : 0), 'b': 0 } });
}

_nexus.prototype.SpawnMob = function( i, type, pos ) {
	this.mob[i] = new mob[type](this.scene, this.nexus, this.mob, this.id, i);
		this.mob[i].self.setPos( this.nexus[this.id].self.getPos() );
		this.mob[i].self.setPos( pos.x, pos.y, pos.z );
	this.mobCount += 1;
	return (this.mob[i]);
}

_nexus.prototype.Spawn = function(  ) {	
	var list = this._AI();

	var num = 1, size = 10;
	for (var x in list) {
		if ( !mob[ list[x].c.mobtype ].prototype.notmob) {
			num += list[x].c.count;
		}
	}

	num = Math.min( this.Cap-this.mobCount, num );
	var row = Math.floor( Math.sqrt(num/2) );

	for (var x in list) {
		var type = list[x].c.mobtype;
		var count = list[x].c.count;

		for (var v = 0; v < count; v++) {
			if (mob[type].prototype.notmob) {
				if ( (this.income-mob[type].prototype.cost) >= 0 ) {
					var ent = new mob[type](this.scene, this.nexus, this.mob, this.id, i);
					if (!ent.return) {
						this.income += ent.cost * -1;
					}
				}
			} else {
				if (this.mobCount < this.Cap && (this.income-mob[type].prototype.cost) >= 0) {
					var i = 0; while (typeof(this.mob[(i = i + 1)]) != "undefined");

					var ent = this.SpawnMob( i, type, this.nexus[this.id].self.getPos() );
					ent.self.setPos( 
						( (v%2==0)? '+' : '-' )+( 50+((v/2)*size)-(Math.floor((v/2)/row)*(row*size)) ), 
						"+"+mob[type].prototype.heightoffset, 
						( (this.id==1)? '+' : '-' )+( Math.floor((v/2)/row)*size ) 
					);
					this.income += ent.cost * -1;

					this.effect();
				}
			}
		}
	}
}

_nexus.prototype.def_think = function( a ) {
	this.hitoffset = Math.max( 0.1, this.hitoffset-=0.1 );
	this.hp = Math.max( 0, this.hp-(a*2) );

	if (this.hp <= 0) {
		this.scene.pause = true;
		scene._runwin( this.id );
	}
}

_nexus.prototype.Think = function( ) {
	var gamespeed = this.scene._gamepref.gamespeed;

	this.maxincomecur = ( ((1000*this.spawntime)/this.scene.game_tickrate)/gamespeed )
	if ( this.scene.globaltime > this.incomecur+this.maxincomecur ) {
		this.incomecur = this.scene.globaltime;
		this.income = this.maxincome;
		this.spawntime = 15;
	}
	this.maxspawncur = ( ((1000*10)/this.scene.game_tickrate)/gamespeed )
	if ( this.scene.globaltime > this.spawncur+this.maxspawncur ) {
		this.spawncur = this.scene.globaltime;
		if (this.income == this.maxincome && !this.AI) {
			this.scene.sound.play( "spawn.mp3", "fx", 0.5 );
		}
		this.Spawn( );
	}

	this.hitoffset = Math.min( 1, this.hitoffset+=0.01 );
	var sesc = 10*this.hitoffset;
	this.self.setScale(sesc, sesc, sesc);
}

_nexus.prototype._AI = function( ) {
	if (this.AI) {
		var gamespeed = this.scene._gamepref.gamespeed;
		if ( this.scene.globaltime > this.AI_update+((this.scene.Ai_difficulty/this.scene.game_tickrate)/gamespeed) || !isset(this.AI_list) ) {
			this.AI_update = this.scene.globaltime;

			var dif = (this.nexus[( (this.id == 1)? 0 : 1 )].mobCount-this.mobCount);
			var counter = {
				'smallbox':{
					"count":( (dif > 10)? 0.2 : 0.5 ),
					"mobtype":( (dif > 10)? "bomber" : "box" )
				}, 
				'box':{
					"count":( (dif > 10)? 0.5 : 1 ),
					"mobtype":( (dif > 10)? "bomber" : "bigbox" )
				},
				'bigbox':{
					"count":( (dif > 10)? 1 : 2 ),
					"mobtype":( (dif > 10)? "priest" : "smallbox" )
				},
				'smallrangebox':{
					"count":1,
					"mobtype":"rangebox"
				}, 
				'rangebox':{
					"count":1,
					"mobtype":"bigrangebox"
				},
				'bigrangebox':{
					"count":( (dif > 10)? 1 : 5 ),
					"mobtype":( (dif > 10)? "smallrangebox" : "smallbox" )
				},
				'bomber':{
					"count":1,
					"mobtype":"smallrangebox"
				},
			}
		
			var tier_func = function( a, b ) {
				return ( (a>=b)? tier_func(a, b*2)+1 : 1 );
			}

			var tier = Math.min( 3, tier_func( this.maxincome/this.Cap, 50 ) );
			var a = this.scene._rungetmob(), b = {}, prix = 0, mobcount = 0, listcount = 0;
			for (var i in a) {
				var fcounter = (a[i].c.mobtype).split('_')[0];
				if ( isset(counter[fcounter]) ) {
					b[i] = {'c':{
						"count":Math.ceil( counter[fcounter].count * a[i].c.count ),
						"mobtype":counter[fcounter].mobtype+( (tier == 1)? '' : '_'+tier )
					}}
					prix += mob[b[i].c.mobtype].prototype.cost;
					mobcount += b[i].c.count;
					listcount += 1;
				}
			}

			prix = this.maxincome-prix;
			var left = this.mobCount+mobcount;
			if ( prix >= 20 && left < this.Cap ) {
				var best = 'healer', addincome = -1
				for (var v in mob) {
					if ( !mob[v].prototype.notmob ) {
						var canget = Math.min( Math.floor(prix/mob[v].prototype.cost), (this.Cap-left) );
						if ( addincome == -1 || addincome < (mob[v].prototype.income*canget) ) {
							best = v;
							addincome = mob[v].prototype.income*(this.Cap-left);
						}
					}
				}
				b[listcount] = {'c':{
					"count":Math.min( Math.floor(prix/mob[best].prototype.cost), (this.Cap-left) ),
					"mobtype":best
				}}
				listcount += 1;

				prix += (Math.min( Math.floor(prix/mob[best].prototype.cost), (this.Cap-left) )*mob[best].prototype.cost)*-1;
			}

			if ( prix >= 100 ) {
				var upgrade = {
					"addhpcap":function( him, income ) {
						return ( ( income >= 500 )? 1 : 0 );
					},
					"healnexus":function( him, income ) {
						return ( ( income >= 100 )? Math.floor( (him.maxhp-him.hp)/100 ) : 0 );
					},
					"addcap":function( him, income ) {
						return ( ( income >= 100 )? 1 : 0 );
					}
				}

				for (var i in upgrade) {
					b[listcount] = {'c':{
						"count":upgrade[i]( this, prix ),
						"mobtype":i
					}}
				}
			}

			for(var i in b) {
				for(var v in b) {
					if ( mob[ b[i].c.mobtype ].prototype.cost < mob[ b[v].c.mobtype ].prototype.cost ) {
						var tmp = b[i];
						b[i] = b[v];
						b[v] = tmp;
					}
				}
			}
			this.AI_list = b;
		}

		return ( this.AI_list );
	} else {
		return (this.scene._rungetmob());
	}
}
