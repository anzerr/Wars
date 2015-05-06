
var _soundEffect = function( scene ) {
	this.load = [];
	this.volume = {};
	this.scene = scene;
}

_soundEffect.prototype.getvolume = function( type ) {
	if ( isset(this.volume.master) ) {
		return ( ( (isset(this.volume[type]))? this.volume[type] : 1 ) * this.volume.master );
	}
	console.log("default volum");
	return (1);
}

_soundEffect.prototype.changevolume = function( master, fx, music ) {
	this.volume = { "master":master, "fx":fx, "music":music };

	for (var i in this.load) {
		for (var v in this.load[i]) {
			 this.load[i][v].volume = this.getvolume( this.load[i][v].type ) * this.load[i][v].voltype;
		}
	}
}

_soundEffect.prototype.pause = function( a ) {
	for (var i in this.load) {
		for (var v in this.load[i]) {
			if ( this.load[i][v].type == "fx" ) {
				if (a) {
					this.load[i][v].pause();
				} else {
					this.load[i][v].volume = Math.min( 1, this.getvolume( this.load[i][v].type )*this.load[i][v].voltype );
					var him = this;
					setTimeout( function() { 
						him.load[i][v].play();
					}, 100 );
				}
			}
		}
	}
}

_soundEffect.prototype.stop = function( a ) {
	for (var i in this.load) {
		for (var v in this.load[i]) {
			if ( this.load[i][v].type == "fx" ) {
				this.load[i][v].pause();
				this.load[i][v].startcur = 0;
			}
		}
	}
}

_soundEffect.prototype.exemple = function( a, sound, type, vol ) {
	if ( a == -1 ) {
		var a = new Audio( "./content/sound/"+sound );
	} else {
		a.pause();
		a.currentTime = 0;
	}

	a.type = type;
	a.volume = Math.min( 1, vol["master"]*( (isset(vol[type]))? vol[type] : 1 ) );
	
	setTimeout( function() { 
		a.play();
	}, 100 );

	return (a);
}

_soundEffect.prototype.play = function( sound, type, vol ) {
	var i = 0, found = false;

	if ( !isset(this.load[sound]) ) {
		this.load[sound] = [];
	}

	while ( isset(this.load[sound][i]) && !found ) {
		( (this.load[sound][i].startcur < this.scene.globaltime)? (found = true) : (i++) );
	}

	if ( found == false ) {
		this.load[sound][i] = new Audio( "./content/sound/"+sound );
		this.load[sound][i].startcur = this.scene.globaltime + (600*1000);
		this.load[sound][i].type = ( ( isset(type) )? type : "fx" );
		this.load[sound][i].voltype = ( isset(vol)? vol : 1 );
		this.load[sound][i].volume = Math.min( 1, this.getvolume( this.load[sound][i].type )*this.load[sound][i].voltype );

		this.load[sound][i].play();
		
		var him = this;
		this.load[sound][i].addEventListener( "loadedmetadata", function( e ) {
			this.length = (this.duration*1000);
			this.startcur = ( (this.startcur-(600*1000)) + this.length )
		} );
	} else {
		this.load[sound][i].currentTime = 0;
		this.load[sound][i].startcur = ( this.scene.globaltime + this.length )
		this.load[sound][i].type = ( ( isset(type) )? type : "fx" );
		this.load[sound][i].voltype = ( isset(vol)? vol : 1 );
		this.load[sound][i].volume = Math.min( 1, this.getvolume( this.load[sound][i].type )*this.load[sound][i].voltype );

		this.load[sound][i].play();
	}

	return ( this.load[sound][i] );
}