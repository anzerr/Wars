
var tutorial = function( p ) {
	this.e = {};

	this.style = {
		"button":{
			"BColor":rgb(75,75,75), "height":"21px", "textAlign":"center", "M":"5px", "lineHeight":"21px", "cursor":"pointer", "width":"calc(100% - 12px)",
			"borderTop":"2px solid "+rgb(100,100,100), "borderLeft":"2px solid "+rgb(100,100,100), "color":rgb(200,200,200),
			"borderBottom":"2px solid "+rgb(50,50,50), "borderRight":"2px solid "+rgb(50,50,50), "textShadow":"1px 1px 2px black",
			"fontSize":"12px", "pointerEvents":"all"
		}
	}

	var him = this;
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"100%", "height":"100%", "BColor":rgb(100,0,0)
	} );

	this.e[0] = new create_div( {'p':this.e["menu"], "c":"no-select"} );
	this.e[0].div.menu = this;
	this.e[0].style( this.style["button"] );
	this.e[0].style( {
		"width":"15px", "height":"calc(100% - 3px)", "float":"left",  "M":"0px",
		"lineHeight":this.e["menu"].div.offsetHeight+"px", "*innerHTML":"<", "textAlign":"center"
	} );
	this.addeffect( this.e[0] );
	this.e[0].div.onclick = function() {
		this.menu.active = Math.max( 0, this.menu.active-1 );
		this.menu.e[3].style( { "MLeft":"-"+( 100*this.menu.active )+"%" } );
		this.clickeffect();
	}

		this.e[1] = new create_div( {'p':this.e["menu"], "c":"no-select"} );
		this.e[1].style( {
			"width":"calc(100% - 38px)", "height":"100%", "BColor":rgb(100,0,0), "float":"left", "position":"relative"
		} );

		this.e[1] = new create_div( {'p':this.e[1], "c":"no-select"} );
		this.e[1].div.menu = this;
		this.e[1].div.zoom = false;
		this.e[1].style( {
			"width":"100%", "height":"100%", "BColor":rgb(100,0,0), "float":"left", "overflow":"hidden", "position":"absolute"
		} );
		this.e[1].transition( {"width":0.5, "height":0.5, "margin":0.5} );
		this.e[1].div.onclick = function() {
			this.zoom = !this.zoom;
			if (this.zoom) {
				this.style.width = "150%";
				this.style.height = "150%";
				this.style.marginTop = "-25%";
				this.style.marginLeft = "-25%";

			} else {
				this.style.width = "100%";
				this.style.height = "100%";
				this.style.marginTop = "0px";
				this.style.marginLeft = "0px";
			}
		}

	this.e[2] = new create_div( {'p':this.e["menu"], "c":"no-select"} );
	this.e[2].div.menu = this;
	this.e[2].style( this.style["button"] );
	this.e[2].style( {
		"width":"15px", "height":"100%", "float":"right", "M":"0px",
		"lineHeight":this.e["menu"].div.offsetHeight+"px", "*innerHTML":">", "textAlign":"center"
	} );
	this.addeffect( this.e[2] );
	this.e[2].div.onclick = function() {
		this.menu.active = Math.min( this.menu.max-1, this.menu.active+1 );
		this.menu.e[3].style( { "MLeft":"-"+( 100*this.menu.active )+"%" } );
		this.clickeffect();
	}

	this.max = 2;
	this.active = 0;
	this.e[3] = new create_div( {'p':this.e[1], "c":"no-select"} );
	this.e[3].transition( {"margin":0.5} );
	this.e[3].style( {
		"width":(100*this.max)+"%", "height":"100%", "BColor":rgb(50,0,0)
	} );

	for ( var i=1; i<=this.max; i++ ) {
		this.e[3+i] = new create_div( {'p':this.e[3], "c":"no-select"} );
		this.e[3+i].style( {
			"width":(100/this.max)+"%", "height":"100%",  "float":"left",
			"BColor":rgb( Math.round(Math.random()*250), Math.round(Math.random()*250), Math.round(Math.random()*250) ),
			"background":"url(./content/tutorial/part"+(i)+".png) 0px 0px no-repeat", "backgroundPosition":"50% 0px",
			"backgroundSize":"100% 100%"
		} );
	}
}

tutorial.prototype.addeffect = function( a ) {
	a.div.menu = this;
	a.div.clicked = false;
	a.div.clickeffect = function( callback ) {
		var him = this;
		
		if (!him.clicked) {
			him.clicked = true;
			him.style.backgroundColor = rgb(50,50,50);
			him.style.borderTop = "2px solid "+rgb(50,50,50)
			him.style.borderLeft = "2px solid "+rgb(50,50,50)
			him.style.borderBottom = "2px solid "+rgb(100,100,100)
			him.style.borderRight = "2px solid "+rgb(100,100,100)
			him.style.textShadow = "-1px -1px 2px black"
			setTimeout( function(){ 
				him.style.backgroundColor = rgb(75,75,75);
				him.style.borderTop = "2px solid "+rgb(100,100,100)
				him.style.borderLeft = "2px solid "+rgb(100,100,100)
				him.style.borderBottom = "2px solid "+rgb(50,50,50)
				him.style.borderRight = "2px solid "+rgb(50,50,50)
				him.style.textShadow = "1px 1px 2px black"
				setTimeout( function(){ 
					him.clicked = false;
				}, 100 );
			}, 250 );
		}
		return (him.clicked);
	};
	a.transition( {"background-color":0.3, "text-shadow":0.3} );
	a.div.onmouseover = function() { if (!this.clicked) { this.style.backgroundColor = rgb(90,90,90) } }
	a.div.onmouseout = function() { if (!this.clicked) { this.style.backgroundColor = rgb(75,75,75) } }
}
