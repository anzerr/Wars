
var _baseEnt = function( type, scene ) {
	this.self = ( (typeof(type) == "string") ? BABYLON.Mesh["Create"+type](type, 6.0, scene) : type );
	this.dispose = true;
	this.scene = scene;
}

_baseEnt.prototype._get = function(a) {
	return {'x':this.self[a].x, 'y':this.self[a].y, 'z':this.self[a].z};
}

_baseEnt.prototype._set = function( a, x, y, z ) {
	x = ( (typeof(x) == "string")? eval(this.self[a].x+x.charAt(0)+'('+x.substring(1)+')') : x );
	y = ( (typeof(y) == "string")? eval(this.self[a].y+y.charAt(0)+'('+y.substring(1)+')') : y );
	z = ( (typeof(z) == "string")? eval(this.self[a].z+z.charAt(0)+'('+z.substring(1)+')') : z );
	(this.self[a].x = x, this.self[a].y = y, this.self[a].z = z);
}

_baseEnt.prototype.getPos = function() {
	return (this._get("position"));
}

_baseEnt.prototype.setPos = function(x, y, z) {
	( (typeof(x) == "object")? (this.self.position = x) : (this._set("position", x, y, z)) );
}

_baseEnt.prototype.getRot = function() {
	var a = this._get("rotation");
	return {'x':180*(a.x/Math.PI), 'y':180*(a.y/Math.PI), 'z':180*(a.z/Math.PI)};
}

_baseEnt.prototype.setRot = function(x, y, z) {
	this._set("rotation", 
		( (x <= 0) ? (x=x*-1, Math.PI*-1) : Math.PI )*( (typeof(x) === 'undefined')? 0 : ( (x == 0)? 0 : (x/180) ) ), 
		( (x <= 0) ? (x=x*-1, Math.PI*-1) : Math.PI )*( (typeof(y) === 'undefined')? 0 : ( (y == 0)? 0 : (y/180) ) ), 
		( (x <= 0) ? (x=x*-1, Math.PI*-1) : Math.PI )*( (typeof(z) === 'undefined')? 0 : ( (z == 0)? 0 : (z/180) ) )
	);
}

_baseEnt.prototype.getScale = function() {
	return (this._get("scaling"));
}

_baseEnt.prototype.setScale = function(x, y, z) {
	this._set("scaling", x, y, z);
}

_baseEnt.prototype.addChild = function(a) {
	return (this.child[(this.child.length)] = a);
}

_baseEnt.prototype.setParent = function(a) {
	this.self.parent = ( (typeof(a.self) === 'undefined')? this.addChild(a) : (this.addChild(a)).self );
}

_baseEnt.prototype.remove = function() {
	if (this.dispose) {
		this.dispose = false;
		this.self.dispose();
	}
}

_baseEnt.prototype.color = function( r, g, b, a ) {
	this.material = new BABYLON.StandardMaterial( "material01", this.scene );
		this.material.diffuseColor = new BABYLON.Color3(r, g, b);
		this.material.alpha = a;
	this._Color = { 'r':r, 'g':g, 'b':b, 'a':a };
	this.self.material = this.material;
}

_baseEnt.prototype.distance = function( x1, y1, x2, y2 ) {
	return Math.sqrt( Math.pow( x2-x1, 2) + Math.pow( y2-y1, 2) );
}

_baseEnt.prototype.angle = function( x1, y1, x2, y2 ) {
	return ( Math.atan2(y2-y1,x2-x1) );
}
