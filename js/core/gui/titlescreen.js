
var titlescreen = function( p ) {
	this.e = {};

	var him = this;
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"100%", "height":"100px", "position":"absolute", "top":"-50%",
		"left":"0px", "pointerEvents":"none"//, "BColor":rgb(0,0,0)
	} );

	this.e[0] = new create_div( {'p':this.e["menu"]} );
	this.e[0].style( { 
		"width":"300px", "height":"100%", "M":"0 auto"
	} );

	this.e[1] = new create_div( {'p':this.e[0]} );
	this.e[1].style( { 
		"width":"300px", "height":"100px", "*innerHTML":"Node Wars", "textAlign":"center", "fontSize":"48px", "lineHeight":"100px", 'color':rgb(255, 255, 255),
	} );

	this.e[2] = new create_div( {'p':this.e[0]} );
	this.e[2].style( { 
		"width":"300px", "height":"20px", "BColor":rgb(100,0,0), 
		"*innerHTML":"Powered by Babylon.js", "textAlign":"center", "fontSize":"12px", "lineHeight":"20px",
	} );

	this.show = false;
	this.e["menu"].transition( {"top":0.3} );
}

titlescreen.prototype.display = function() {
	this.show = !this.show;
	if (this.show) {
		this.e["menu"].style( { "top":"10%" } );
	} else {
		this.e["menu"].style( { "top":"-50%" } );
	}
}
