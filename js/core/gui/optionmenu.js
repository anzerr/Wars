
var optionmenu = function( a, p ) {
	this.menu = a;
	this.parent = p;
	this.e = {};

	this.style = {
		"unselected":{
			"borderTop":"2px solid "+rgb(25,25,25), "borderLeft":"2px solid "+rgb(25,25,25), 
			"borderBottom":"2px solid "+rgb(0,0,0), "borderRight":"2px solid "+rgb(0,0,0)
		},
		"selected":{
			"borderTop":"2px solid "+rgb(200,200,200), "borderLeft":"2px solid "+rgb(200,200,200), 
			"borderBottom":"2px solid "+rgb(175,175,175), "borderRight":"2px solid "+rgb(175,175,175)
		}
	}

	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"100%", "height":"100%", "overflow":"hidden", "pointerEvents":"all"
	} );

	this.e["gameplaymenu"] = new create_div( {'p':this.e["menu"]} );
	this.e["gameplaymenu"].style( {
		"width":"100%", "height":"20px", "*innerHTML":"Game Play Options", "borderBottom":"2px solid "+rgb(225,225,225)
	} );
	// GAME PLAY OPTIONS
	var a = 0; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Mouse Sensibility:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", 'float':'left'
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"1", "*max":"10", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"5", "*tabIndex":-1
			} );

	var a = 1; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Game Speed:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", 'float':'left'
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"1", "*max":"8", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"3", "*tabIndex":-1
			} );

	var a = 6; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Britness:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", 'float':'left'
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"0", "*max":"100", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"50", "*tabIndex":-1
			} );

	var a = 2; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Side to play:", "float":"left",
				"fontSize":"12px", "lineHeight":"20px"
			} );
			this.e[a][1].div.side = 1;
			this.e[a][1].div.menu = this;
			this.e[a][1].div.menuid = a;
			this.e[a][1].div.sidefunc = function( a ) {
				var him = this.menu;

				this.side = a;
				him.e[this.menuid][2].style( him.style[( (this.side == 0)? "selected" : "unselected" )] );
				him.e[this.menuid][3].style( him.style[( (this.side != 0)? "selected" : "unselected" )] );
			}

		var size = (this.e[a][1].div.offsetWidth + 10);

		this.e[a][5] = new create_div( { 'p':this.e[a][0] } );
		this.e[a][5].style( { 
			"width":"calc(100% - "+(size+4)+"px)", "height":"100%", "M":"0px", "float":"left", "P":"0px", "MLeft":"5px"
		} );
	
		this.e[a][2] = new create_div( { 'p':this.e[a][5] } );
			this.e[a][2].div._Color = {"r":0, "g":200, "b":0};
			this.addeffect( this.e[a][2], a );
			this.e[a][2].style( { 
				"width":"calc(50% - 10px)", "height":"50%", "M":"0px", "float":"left", "P":"0px", 
				"BColor":rgb(0,200,0), "MLeft":"5px", "MTop":"3px"
			} );
			this.e[a][2].div.onclick = function() {
				var him = this.menu;
				him.e[this.menuid][1].div.sidefunc( 0 );
			}

		this.e[a][3] = new create_div( { 'p':this.e[a][5] } );
			this.e[a][3].div._Color = {"r":200, "g":0, "b":0};
			this.addeffect( this.e[a][3], a );
			this.e[a][3].style( { 
				"width":"calc(50% - 10px)", "height":"50%", "M":"0px", "float":"left", "P":"0px",
				"BColor":rgb(200,0,0), "MLeft":"5px", "MTop":"3px"
			} );
			this.e[a][3].div.onclick = function() {
				var him = this.menu;
				him.e[this.menuid][1].div.sidefunc( 1 );
			}
		this.e[a][1].div.sidefunc( 1 );

	var a = 7; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Gui Size:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", 'float':'left'
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"50", "*max":"200", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"100", "*tabIndex":-1
			} );
	
	var a = 8; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Fps Comensator:", "float":"left",
				"fontSize":"12px", "lineHeight":"20px"
			} );
			this.e[a][1].div.side = 1;
			this.e[a][1].div.menu = this;
			this.e[a][1].div.menuid = a;
			this.e[a][1].div.sidefunc = function( a ) {
				var him = this.menu;

				this.side = a;
				him.e[this.menuid][2].style( { "color":( (this.side != 0)? rgb(0,0,0) : rgb(200,200,200) ) } );
				him.e[this.menuid][3].style( { "color":( (this.side == 0)? rgb(0,0,0) : rgb(200,200,200) ) } );
			}

		var size = (this.e[a][1].div.offsetWidth+14);

		this.e[a][5] = new create_div( { 'p':this.e[a][0] } );
			this.e[a][5].style( { 
				"width":"calc(100% - "+(size)+"px)", "height":"100%", "M":"0px", "float":"left", "P":"0px", "MLeft":"5px"
			} );
		
		this.e[a][2] = new create_div( { 'p':this.e[a][5] } );
			this.e[a][2].div._Color = {"r":90, "g":90, "b":90};
			this.addeffect( this.e[a][2], a );
			this.e[a][2].style( { 
				"width":"calc(50% - 10px)", "height":"50%", "M":"0px", "float":"left", "P":"0px", 
				"MLeft":"5px", "MTop":"7px", "*innerHTML":"On", "textAlign":"center", "fontSize":"12px",
				"lineHeight":"10px", "BColor":rgb(90,90,90)
			} );
			this.e[a][2].div.onclick = function() {
				var him = this.menu;
				him.e[this.menuid][1].div.sidefunc( 0 );
			}

		this.e[a][3] = new create_div( { 'p':this.e[a][5] } );
			this.e[a][3].div._Color = {"r":90, "g":90, "b":90};
			this.addeffect( this.e[a][3], a );
			this.e[a][3].style( { 
				"width":"calc(50% - 10px)", "height":"50%", "M":"0px", "float":"left", "P":"0px",
				"MLeft":"5px", "MTop":"7px", "*innerHTML":"Off", "textAlign":"center", "fontSize":"12px",
				"lineHeight":"10px", "BColor":rgb(90,90,90)
			} );
			this.e[a][3].div.onclick = function() {
				var him = this.menu;
				him.e[this.menuid][1].div.sidefunc( 1 );
			}
		this.e[a][1].div.sidefunc( 0 );

	var a = 9; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Max Mob:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", "float":"left"
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"25", "*max":"200", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"100", "*tabIndex":-1
			} );

	var a = 10; this.e[a] = {}
		this.e[a][0] = new create_div( {'p':this.e["menu"]} );
			this.e[a][0].style( { 
				"width":"100%", "height":"20px", "M":"5px"
			} );
		this.e[a][1] = new create_div( {'p':this.e[a][0]} );
			this.e[a][1].style( { 
				"width":"auto", "height":"100%", "*innerHTML":"Difficulty:", "display":"inline-block",
				"fontSize":"12px", "lineHeight":"20px", "float":"left"
			} );

		this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
			this.e[a][2].style( { 
				"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"0", "*max":"30", 
				"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"15", "*tabIndex":-1
			} );

	// GAME PLAY OPTIONS ------------ END

	this.e["soundmenu"] = new create_div( {'p':this.e["menu"]} );
	this.e["soundmenu"].style( {
		"width":"100%", "height":"20px", "*innerHTML":"Sound Options", "borderBottom":"2px solid "+rgb(225,225,225)
	} );
	// SOUND OPTIONS
		var a = 3; this.e[a] = {}
			this.e[a][0] = new create_div( {'p':this.e["menu"]} );
				this.e[a][0].style( { 
					"width":"100%", "height":"20px", "M":"5px"
				} );
			this.e[a][1] = new create_div( {'p':this.e[a][0]} );
				this.e[a][1].style( { 
					"width":"auto", "height":"100%", "*innerHTML":"Master Sound:", "display":"inline-block",
					"fontSize":"12px", "lineHeight":"20px", "float":"left"
				} );

			this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
				this.e[a][2].div.menu = this;
				this.e[a][2].div.sound = -1;
				this.e[a][2].div.cur = 0;
				this.e[a][2].style( { 
					"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"0", "*max":"10", 
					"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"10", "*tabIndex":-1
				} );
				this.e[a][2].div.onmouseup = function() {
					if ( isset(this.menu.menu.scene) ) {
						var time = (new Date().getTime());
						if ( time > this.cur ) {
							this.cur+300;

							var a = this.menu.menu.scene;
							this.sound = a.sound.exemple( this.sound, "upgrade.mp3", "none", {
								"master":(this.menu.e[3][2].div.value/10), 
								"fx":(this.menu.e[4][2].div.value/10), 
								"music":(this.menu.e[5][2].div.value/10)
							} );
						}
					}
				}

		var a = 4; this.e[a] = {}
			this.e[a][0] = new create_div( {'p':this.e["menu"]} );
				this.e[a][0].style( { 
					"width":"100%", "height":"20px", "M":"5px"
				} );
			this.e[a][1] = new create_div( {'p':this.e[a][0]} );
				this.e[a][1].style( { 
					"width":"auto", "height":"100%", "*innerHTML":"Fx Sound:", "display":"inline-block",
					"fontSize":"12px", "lineHeight":"20px", "float":"left"
				} );

			this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
				this.e[a][2].div.menu = this;
				this.e[a][2].div.sound = -1;
				this.e[a][2].div.cur = 0;
				this.e[a][2].style( { 
					"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"0", "*max":"10", 
					"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"8", "*tabIndex":-1
				} );
				this.e[a][2].div.onmouseup = function() {
					if ( isset(this.menu.menu.scene) ) {
						var time = (new Date().getTime());
						if ( time > this.cur ) {
							this.cur+300;

							var a = this.menu.menu.scene;
							this.sound = a.sound.exemple( this.sound, "heal.mp3", "fx", {
								"master":(this.menu.e[3][2].div.value/10), 
								"fx":(this.menu.e[4][2].div.value/10), 
								"music":(this.menu.e[5][2].div.value/10)
							} );
						}
					}
				}

		var a = 5; this.e[a] = {}
			this.e[a][0] = new create_div( {'p':this.e["menu"]} );
				this.e[a][0].style( { 
					"width":"100%", "height":"20px", "M":"5px"
				} );
			this.e[a][1] = new create_div( {'p':this.e[a][0]} );
				this.e[a][1].style( { 
					"width":"auto", "height":"100%", "*innerHTML":"Music Sound:", "display":"inline-block",
					"fontSize":"12px", "lineHeight":"20px", "float":"left"
				} );

			this.e[a][2] = new create_div( {'p':this.e[a][0], 't':"input"} );
				this.e[a][2].div.menu = this;
				this.e[a][2].div.sound = -1;
				this.e[a][2].div.cur = 0;
				this.e[a][2].style( { 
					"width":"calc(100% - "+(this.e[a][1].div.offsetWidth+20)+"px)", "height":"auto", "*type":"range", "*min":"0", "*max":"10", 
					"M":"0px", "display":"inline-block", "P":"0px", "MLeft":"5px", "value":"8", "*tabIndex":-1
				} );
				this.e[a][2].div.onmouseup = function() {
					if ( isset(this.menu.menu.scene) ) {
						var time = (new Date().getTime());
						if ( time > this.cur ) {
							this.cur+300;

							var a = this.menu.menu.scene;
							this.sound = a.sound.exemple( this.sound, "loss.mp3", "music", {
								"master":(this.menu.e[3][2].div.value/10), 
								"fx":(this.menu.e[4][2].div.value/10), 
								"music":(this.menu.e[5][2].div.value/10)
							} );
						}
					}
				}
	// SOUND OPTIONS ------------ END
}

optionmenu.prototype.addeffect = function( a, c ) {
	a.div.menu = this;
	a.div.menuid = c;
	a.transition( {"background-color":0.3, "border":0.3} );
	a.div.onmouseover = function() { if (!this.clicked) { this.style.backgroundColor = rgb(this._Color.r+50,this._Color.g+50,this._Color.b+50) } }
	a.div.onmouseout = function() { if (!this.clicked) { this.style.backgroundColor = rgb(this._Color.r,this._Color.g,this._Color.b) } }
}

optionmenu.prototype._get = function( ) {
	var save = {
		"mousesens":this.e[0][2].div.value,
		"gamespeed":this.e[1][2].div.value,
		"gamebritness":this.e[6][2].div.value,
		"guisize":this.e[7][2].div.value,
		"gameside":this.e[2][1].div.side,
		"fpscomp":this.e[8][1].div.side,
		"mobhardcap":this.e[9][2].div.value,
		"difficulty":this.e[10][2].div.value,
		"mastersound":this.e[3][2].div.value,
		"fxsound":this.e[4][2].div.value,
		"musicsound":this.e[5][2].div.value
	}
	return (save);
}

optionmenu.prototype.save = function( ) {
	var save = this._get();
	this.menu.scene._runupdatepref( save );
	this.menu.scene.sound.play( "save.mp3", "music", 0.75 );
	this.menu.scene.menudatabase.set( "optionpref", save );
}

optionmenu.prototype.loadup = function( e ) {
	this.loaded = true;

	if ( isset(e) ) {
		var a = e.obj;

		this.e[0][2].div.value = a["mousesens"];
		this.e[1][2].div.value = a["gamespeed"];
		this.e[6][2].div.value = a["gamebritness"];
		this.e[7][2].div.value = a["guisize"];
		this.e[2][1].div.sidefunc( a["gameside"] );
		this.e[8][1].div.sidefunc( a["fpscomp"] );
		this.e[9][2].div.value = a["mobhardcap"];
		this.e[10][2].div.value = a["difficulty"];
		this.e[3][2].div.value = a["mastersound"];
		this.e[4][2].div.value = a["fxsound"];
		this.e[5][2].div.value = a["musicsound"];
		this.menu.scene._runupdatepref( this._get() );
	} else {
		this.save();
	}
}

optionmenu.prototype.load = function( ) {
	var him = this;
	this.menu.scene.menudatabase.get({ 'p':this, 'a':"optionpref", 'callback':"loadup" });
	this.loaded = false;
	setTimeout( function(){ 
		if (!him.loaded) {
			him.loadup();
		}
	},100);
}