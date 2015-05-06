
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
			"fontSize":"12px", "pointerEvents":"all"
		},
		"box":{
			"BColor":rgb(75,75,75), 
			"borderTop":"2px solid "+rgb(100,100,100), "borderLeft":"2px solid "+rgb(100,100,100), 
			"borderBottom":"2px solid "+rgb(50,50,50), "borderRight":"2px solid "+rgb(50,50,50), "pointerEvents":"all"
		}
	}
		
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"auto", "height":"100%", "position":"relative", "overflow":"hidden", "pointerEvents":"all"
	} );
	
	// ---------------- MAIN MENU ------------
	var a = this.makemenu( "150px", ((30*3)+5)+"px" );
		this.e[a][0].onopen = function() {
			this.menu.e["menu"].style( { "pointerEvents":"all" } );
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3] .style( this.style.button );
		this.e[a][3] .style( { "*innerHTML":"Play" } );
		this.addeffect( this.e[a][3] );
		this.e[a][3].div.onclick = function() {
			//if (!this.clicked) {
				this.menu.changemenu( this, 1 );
			//}
			this.clickeffect();
		}
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Option" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			//if (!this.clicked) {
				this.menu.changemenu( this, 2 );
			//}
			this.clickeffect();
		}

		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"Tutorial" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			this.menu.changemenu( this, 6 );
			this.clickeffect();
		}
		
		/*this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"Exit" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			if (!this.clicked) {
				if (this.menu.scene) {
					this.menu.scene._runexit( this.menu );
				}
			}
			this.clickeffect();
		}*/
	// ---------------- MAIN MENU ------------
	
	// ---------------- PLAY MENU ------------
	var a = this.makemenu( "150px", ((30*3)+5)+"px" );
		this.e[a][0].extend = function(e) {
			this.menu.e[this.menuid][4].style( { "display":( (e.obj)? "block" : "none" ) } );
			this.menu.e[this.menuid][2].style( { "height":(( (e.obj)? (30*3) : (30*2) )+5)+"px" } );
		}
		this.e[a][0].extend.menu = this;
		this.e[a][0].onopen = function() {
			this.menu.scene.menudatabase.get({ 'p':this, 'a':"gamesaved", 'callback':"extend" });
			this.menu.e[2][4].load()
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3] .style( this.style.button );
		this.e[a][3] .style( { "*innerHTML":"New Game" } );
		this.addeffect( this.e[a][3] );
		this.e[a][3].div.onclick = function() {
			this.clickeffect();
			if (this.menu.scene) {
				this.menu.scene._runstart( true, this.menu );
			}
			//this.menu.changemenu( this, 0 );
		}
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Resum" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			this.clickeffect();
			if (this.menu.scene) {
				this.menu.scene._runresum( );
			}
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
	var a = this.makemenu( "300px", "360px" );
		this.e[a][0].onopen = function() {
			this.menu.e[this.menuid][4].load();
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
			this.e[a][3].div.menu = this;
			this.e[a][3].style( { "width":"100%", "height":"325px" } );
		
		this.e[a][4] = new optionmenu( this, this.e[a][3] );

		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
			this.e[a][5].style( this.style.button );
			this.e[a][5].style( { "width":"46px", "*innerHTML":"Save", "MLeft":"calc(100% - 110px)", "display":"inline-block" } );
			this.addeffect( this.e[a][5] );
			this.e[a][5].div.onclick = function() {
				this.menu.e[this.menuid][4].save();
				this.clickeffect();
			}
			
		this.e[a][6] = new create_div( {'p':this.e[a][2]} );
			this.e[a][6] .style( this.style.button );
			this.e[a][6] .style( { "width":"46px", "*innerHTML":"Cancal", "MLeft":"0px", "display":"inline-block" } );
			this.addeffect( this.e[a][6] );
			this.e[a][6].div.onclick = function() {
				//if (!this.clicked) {
					if (this.menu.scene) {
						this.menu.changemenu( this, ( (this.menu.scene.started)? 3 : 0 ) );
					}
				//}
				this.clickeffect();
			}
	// ---------------- OPTION MENU ------------

	// ---------------- INGAME MENU ------------
	var a = this.makemenu( "150px", ((30*3)+5)+"px" );
		this.e[a][0].onopen = function() {
			this.menu.e["menu"].style( { "pointerEvents":"none" } );
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3] .style( this.style.button );
		this.e[a][3] .style( { "*innerHTML":"Continue" } );
		this.addeffect( this.e[a][3] );
		this.e[a][3].div.onclick = function() {
			//if (!this.clicked) {
				if (this.menu.scene) {
					this.menu.scene._runpause( );
				}
			//}
			this.clickeffect();
		}
		
		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Option" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			//if (!this.clicked) {
				this.menu.changemenu( this, 2 );
			//}
			this.clickeffect();
		}
		
		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"Leave" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			//if (!this.clicked) {
				this.menu.changemenu( this, 4 );
			//}
			
			this.clickeffect();
		}
	// ---------------- INGAME MENU ------------

	// ---------------- LEAVE INGAME MENU ------------
	var a = this.makemenu( "175px", (30*2)+"px" );
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
		this.e[a][3].div.menu = this;
		this.e[a][3] .style( { "*innerHTML":"Do you Want to Save?", "width":"calc(100% - 12px)", "fontSize":"12px", "M":"5px", "textAlign":"center" } );

		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
		this.e[a][4] .style( this.style.button );
		this.e[a][4] .style( { "*innerHTML":"Yes", "width":"calc(25% - 12px)", "float":"left" } );
		this.addeffect( this.e[a][4] );
		this.e[a][4].div.onclick = function() {
			//if (!this.clicked) {
				if (this.menu.scene) {
					this.menu.scene._runleave( this.menu, true );
				}
			//}
			this.clickeffect();
		}
		
		this.e[a][5] = new create_div( {'p':this.e[a][2]} );
		this.e[a][5] .style( this.style.button );
		this.e[a][5] .style( { "*innerHTML":"No", "width":"calc(25% - 10px)", "float":"left", "M":0, "MTop":"5px" } );
		this.addeffect( this.e[a][5] );
		this.e[a][5].div.onclick = function() {
			//if (!this.clicked) {
				if (this.menu.scene) {
					this.menu.scene._runleave( this.menu, false );
				}
			//}
			this.clickeffect();
		}
		
		this.e[a][6] = new create_div( {'p':this.e[a][2]} );
		this.e[a][6] .style( this.style.button );
		this.e[a][6] .style( { "*innerHTML":"Cancel", "width":"calc(50% - 12px)", "float":"right" } );
		this.addeffect( this.e[a][6] );
		this.e[a][6].div.onclick = function() {
			//if (!this.clicked) {
				this.menu.changemenu( this, 3 );
			//}
			this.clickeffect();
		}
	// ---------------- LEAVE INGAME MENU ------------
	
	// ---------------- END MENU ------------
	var a = this.makemenu( "300px", "190px" );
		this.e[a][0].onopen = function() {
			this.menu.e["menu"].style( { "pointerEvents":"none" } );
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
			this.e[a][3].div.menu = this;
			this.e[a][3].style( { 
				"MLeft":"5%", "width":"90%", "height":"155px", "*innerHTML":"cake", "textAlign":"center", "fontSize":"36px",
				"lineHeight":"155px"
			} );

		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
			this.e[a][4] .style( this.style.button );
			this.e[a][4] .style( { "width":"105px", "*innerHTML":"Back to main menu", "MLeft":"0px", "float":"right" } );
			this.addeffect( this.e[a][4] );
			this.e[a][4].div.onclick = function() {
				//if (!this.clicked) {
					if (this.menu.scene) {
						this.menu.scene._runleave( this.menu, false );
					}
					this.menu.changemenu( this, 0 );
				//}
				this.clickeffect();
			}
	// ---------------- END MENU ------------

	// ---------------- TUTORAL MENU ------------
	var a = this.makemenu( "400px", "400px" );
		this.e[a][0].onopen = function() {
			this.menu.e["menu"].style( { "pointerEvents":"none" } );
		}
		this.e[a][3] = new create_div( {'p':this.e[a][2]} );
			this.e[a][3].div.menu = this;
			this.e[a][3].style( { "M":"10px", "MBottom":"5px", "width":"calc(100% - 20px)", "height":"calc(100% - 45px)" } );

		this.e[a][5] = new tutorial( this.e[a][3] );

		this.e[a][4] = new create_div( {'p':this.e[a][2]} );
			this.e[a][4] .style( this.style.button );
			this.e[a][4] .style( { "width":"105px", "*innerHTML":"Back", "M":"0 auto", "MTop":"5px" } );
			this.addeffect( this.e[a][4] );
			this.e[a][4].div.onclick = function() {
				this.menu.changemenu( this, 0 );
				this.clickeffect();
			}
	// ---------------- TUTORAL MENU ------------

	this.e["menu"].style( { "width":"100%" } );
	this.changemenu( this.e[0][2].div, 0 );
}

mainmenu.prototype.makemenu = function( x, y ) {
	this.e[this.menuc] = { }; 
	this.e[this.menuc][0] = new create_div( {'p':this.e["menu"]} );
	this.e[this.menuc][0].transition( {"left":0.5} );
	this.e[this.menuc][0].menu = this;
	this.e[this.menuc][0].menuid = this.menuc;
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
		"width":x, "height":y, "position":"absolute", "top":"0", "bottom":"0", "left":"0", "right":"0", "margin":"auto",
		"pointerEvents":"all"
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
		him.menu.e[him.menu.menuactive][0].div.style.left = "-100%";
		if (him.menu.e[id][0].onopen) {
			him.menu.e[id][0].onopen();
		}
		him.menu.e[id][0].div.style.left = "0%";
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
	a.div.menuid = this.menuc-1;
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
