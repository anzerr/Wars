
var mainmenu = function( p ) {
	this.e = {};
	this.menuc = 0;
	this.menuactive = 1;
	this.cur = 0;
		
	this.style = {
		"button":{
			"BColor":rgb(75,75,75), "height":"21px", "textAlign":"center", "M":"5px", "lineHeight":"21px", "cursor":"pointer", "width":"calc(100% - 12px)",
			"borderTop":"2px solid "+rgb(100,100,100), "borderLeft":"2px solid "+rgb(100,100,100), "color":rgb(200,200,200),
			"borderBottom":"2px solid "+rgb(50,50,50), "borderRight":"2px solid "+rgb(50,50,50), "textShadow":"1px 1px 2px black",
			"fontSize":"12px"
		},
		"box":{
			"BColor":rgb(75,75,75), 
			"borderTop":"2px solid "+rgb(100,100,100), "borderLeft":"2px solid "+rgb(100,100,100), 
			"borderBottom":"2px solid "+rgb(50,50,50), "borderRight":"2px solid "+rgb(50,50,50)
		}
	}
		
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"auto", "height":"100%", "BColor":rgb(255,255,0), "position":"relative", "overflow":"hidden",
	} );
	
	// ---------------- MAIN MENU ------------
	var a = this.menu( "150px", ((30*3)+5)+"px" );
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3] .style( this.style.button );
		this.e[a][3] .style( { "*innerHTML":"Play" } );
		this.addeffect( this.e[a][3] );
		this.e[a][3].div.onclick = function() {
			if (!this.clicked) {
				this.menu.changemenu( this, 1 );
			}
			this.clickeffect();
		}
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Option" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			if (!this.clicked) {
				this.menu.changemenu( this, 2 );
			}
			this.clickeffect();
		}
		
		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"Exit" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			if (!this.clicked) {
				this.menu.changemenu( this, 0 );
			}
			this.clickeffect();
		}
	// ---------------- MAIN MENU ------------
	
	// ---------------- PLAY MENU ------------
	var a = this.menu( "150px", ((30*3)+5)+"px" );
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3] .style( this.style.button );
		this.e[a][3] .style( { "*innerHTML":"New Game" } );
		this.addeffect( this.e[a][3] );
		this.e[a][3].div.onclick = function() {
			this.clickeffect();
			//this.menu.changemenu( this, 0 );
		}
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Resum" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			this.clickeffect();
			//this.menu.changemenu( this, 0 );
		}
		
		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"Back" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			if (!this.clicked) {
				this.menu.changemenu( this, 0 );
			}
			this.clickeffect();
		}
	// ---------------- PLAY MENU ------------
	
	// ---------------- OPTION MENU ------------
	var a = this.menu( "300px", "300px" );
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
			this.e[a][3] .style( { "width":"100%", "height":"265px", "*innerHTML":"option" } );
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
			this.e[a][4].style( this.style.button );
			this.e[a][4].style( { "width":"46px", "*innerHTML":"Save", "MLeft":"calc(100% - 110px)", "display":"inline-block" } );
			this.addeffect( this.e[a][4] );
			this.e[a][4].div.onclick = function() {
				this.clickeffect();
			}
			
		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
			this.e[a][5] .style( this.style.button );
			this.e[a][5] .style( { "width":"46px", "*innerHTML":"Back", "MLeft":"0px", "display":"inline-block" } );
			this.addeffect( this.e[a][5] );
			this.e[a][5].div.onclick = function() {
				if (!this.clicked) {
					this.menu.changemenu( this, 0 );
				}
				this.clickeffect();
			}
	// ---------------- OPTION MENU ------------
	
	this.e["menu"].style( { "width":"100%" } );
	this.changemenu( this.e[0][2].div, 0 );
}

mainmenu.prototype.menu = function( x, y ) {
	this.e[this.menuc] = { }; 
	this.e[this.menuc][0] = new create_div( {'p':this.e["menu"]} );
	this.e[this.menuc][0].transition( {"left":0.5} );
	this.e[this.menuc][0] .style( { 
		"position":"absolute", "top":"0", "left":"100%", "width":"100%", "height":"100%"
	} );
	
	this.e[this.menuc][1] = new create_div( {'p':this.e[this.menuc][0]} );
	this.e[this.menuc][1] .style( { 
		"width":"100%", "height":"100%", "position":"relative", "float":"left",
		"top":"0", "bottom":"0", "left":"0", "right":"0"
	} );
	
	this.e[this.menuc][2] = new create_div( {'p':this.e[this.menuc][1]} );
	this.e[this.menuc][2].transition( {"height":0.5, "width":0.5} );
	this.e[this.menuc][2].style( this.style.box );
	this.e[this.menuc][2].style( {
		"width":x, "height":y, "position":"absolute", "top":"0", "bottom":"0", "left":"0", "right":"0", "margin":"auto"
	} );
	this.e[this.menuc][2].div.menu = this;
	this.e[this.menuc][2].div.menuid = this.menuc;
	this.menuc += 1;
	return (this.menuc-1);
}

mainmenu.prototype.changemenu = function( him, id ) {
	var time = (new Date().getTime());
	if ( id != this.menuactive && time > this.cur ) {
		this.cur = time+600;

		last = this.menuactive;
		him.menu.e[him.menu.menuactive][0].div.style.left = "-100%"
		him.menu.e[id][0].div.style.left = "0%"
		him.menu.menuactive = id;
		setTimeout( function(){
			him.menu.e[last][0].transition( {"left":0} );
			him.menu.e[last][0].style( { "left":"100%" } );
			setTimeout( function(){
				him.menu.e[last][0].transition( {"left":0.5} );
			}, 100 );
		}, 500 );
	}
}

mainmenu.prototype.addeffect = function( a ) {
	a.div.menu = this;
	a.div.menuid = this.menuc;
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

window.onload = function() {
	var a = new mainmenu( document.body );
}