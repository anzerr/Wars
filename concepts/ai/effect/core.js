
var loadEffect = function( scene ) {
	this.load = [];
	this.scene = scene;
}

loadEffect.prototype.effect = function( type, array ) {
	var i = 0, found = false;
	
	if ( !isset(this.load[type]) ) {
		this.load[type] = [];
	}

	while ( isset(this.load[type][i]) && !found ) {
		( (this.load[type][i].start( array ))? (found = true) : (i++) );
	}
	
	if ( found == false ) {
		this.load[type][i] = new _effect[type]( this.scene, {0:type, 1:i} );
		this.load[type][i].start( array );
	}
}

loadEffect.prototype.think = function() {
	for (var i in this.load) {
		for (var v in this.load[i]) {
			if ( isset(this.load[i][v].think) ) {
				this.load[i][v].think();
			}
		}
	}
}