
var gamemenu = function( p ) {
	this.e = {};
	this.menuc = 0;
	this.menuactive = 1;
	this.cur = 0;
	
	document.gamemenu = {
		'menu':this
	}
		
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].transition( {"margin-top":0.3} );
	this.e["menu"].style( {
		"width":"100%", "height":"200px", "BColor":rgb(0,0,0), "position":"relative", "MTop":"-175px"
	} );
	
	this.maxitemc = (25*10)+5;
	this.maxitemscale = function( a ) {
		this.maxitemc = a;
		this.e[0][3].style( { "maxHeight":this.maxitemc+"px" } );
		this.e[0][0].style( { "maxHeight":this.maxitemc+"px" } );
		this.e[0][0].div.rescale( this.e[0][1].div );
	}
	
	this.e[0] = {};
	this.e[0][5] = new create_div( {'p':this.e["menu"]} );
	this.e[0][5].transition( {"height":0.3} );
	this.e[0][5].style( { 
		"float":"right", "width":"auto", "height":"auto", "minHeight":"175px", "indexZ":"100"
	} );
	
	this.e[0][3] = new create_div( {'p':this.e[0][5]} );
	this.e[0][3].transition( {"height":0.3} );
	this.e[0][3].style( { 
		"width":"200px", "height":"170px", "BColor":rgb(50,50,50), 
		"minHeight":"173px", "maxHeight":this.maxitemc+"px", "overflow":"hidden", 
		"borderLeft":"2px solid "+rgb(100,100,100), "borderBottom":"2px solid "+rgb(50,50,50),
	} );
	
	this.e[0][0] = new create_div( {'p':this.e[0][3]} );
	this.e[0][0].transition( {"height":0.3, "color":0.5, "width":0.5} );
	this.e[0][0].style( { 
		"float":"left", "width":"100%", "height":"100%", "BColor":rgb(75,75,75), "overflow":"hidden", 
		"minHeight":"calc(100% - 25px)", "maxHeight":this.maxitemc+"px"
	} );
	this.e[0][0].div.menu = this;
	this.e[0][0].div.rescale = function( h, sc ) {
		var hsize = this.menu.size( h ), him = this.menu;
		him.e[0][0].style( { "color":( (hsize==0)? rgb(200,200,200) : him.e[0][1].div.style.backgroundColor ) } );
		him.e[0][1].style( { "height":hsize+"px" } );
		him.e[0][0].style( { "width":"calc(100% - "+( (hsize > him.maxitemc)? 10 : 0 )+"px)" } );
		him.e[0][3].style( { "height":Math.min(hsize, parseInt(him.e[0][3].div.style.maxHeight))+"px" } );
		him.e[0][2].scroll = ( (hsize > him.maxitemc)? him.e[0][2].scroll : 0 );
		him.e[0][2].style( { "width":( (hsize > him.maxitemc)? 10 : 0 )+"px"  } );
		him.e[0][4].style( { "height":( (hsize > 200)? 20 : 0 )+"px"  } );
		if (sc != true) {
			var he = 100*(him.e[0][0].div.offsetHeight/hsize);
			him.e[0][2].style( { "height":Math.min(100, he)+"%" } );
			him.e[0][2].resize();
		}
	}
	
		this.e[0][1] = new create_div( {'p':this.e[0][0]} );
		this.e[0][1].transition( {"height":0.3} );
		this.e[0][1].style( { 
			"float":"left", "width":"100%", "height":"175px", "BColor":rgb(75,75,75), "position":"relative", 
			"textAlign":"center", "lineHeight":"175px", "fontSize":"20px", "*innerHTML":"Empty"
		} );
		
		this.e[0][2] = new create_div( {'p':this.e[0][3]} );
		this.e[0][2].transition( {"width":0.5} );
		this.e[0][2].div.menu = this;
		this.e[0][2].scroll = 0;
		this.e[0][2].drag = false;
		this.e[0][2].style( { 
			"width":"0px", "height":"100%", "float":"right", "BColor":rgb(25,25,25), "MTop":"0px"
		} );
		this.e[0][2].resize = function() {
			var a = this.div.menu
			var c = ( ((a.size( a.e[0][1].div )-a.e[0][0].div.offsetHeight)*-1)*a.e[0][2].scroll );
			var d = Math.max( 0, a.e[0][3].div.offsetHeight-a.e[0][2].div.offsetHeight)*a.e[0][2].scroll;
			a.e[0][2].div.style.marginTop = d+"px";
			a.e[0][1].div.style.marginTop = Math.min( 0, c )+"px";
		}
		
		this.e[0][2].div.onmousedown = function( e ) {
			var a = this.menu.e;
			a[0][2].drag = true;
			a[0][2].topOffset = e.pageY-parseInt(this.style.marginTop);
		}
		
		document.addEventListener("mousemove", function( e ) {
			var a = this.gamemenu.menu.e, him = this.gamemenu.menu;
			if (a[0][2].drag) {
				var b = Math.max( 0, Math.min( a[0][3].div.offsetHeight-a[0][2].div.offsetHeight, e.pageY - a[0][2].topOffset ) );
				var c = b/(a[0][3].div.offsetHeight-a[0][2].div.offsetHeight);
				a[0][2].scroll = c;
				a[0][2].div.style.marginTop = b+"px";
				a[0][1].div.style.marginTop = ( ((him.size( a[0][1].div )-a[0][0].div.offsetHeight)*-1)*c )+"px";
				a[0][0].div.rescale( a[0][1].div );
			}
		}, false );
		document.addEventListener("mouseup", function( e ) {
			var a = this.gamemenu.menu.e;
			a[0][2].drag = false;
		}, false );
		
		this.e[0][4] = new create_div( {'p':this.e[0][5]} );
		this.e[0][4].transition( {"height":0.5, "background-color":0.3, "text-shadow":0.3} );
		this.e[0][4].div.menu = this;
		this.e[0][4].scroll = 0;
		this.e[0][4].drag = false;
		this.e[0][4].style( { 
			"width":"30px", "height":"0px", "BColor":rgb(50,50,50), "MTop":"0px", "MLeft":"10px",
			"borderBottomRightRadius":"5px", "borderBottomLeftRadius":"5px"
		} );
		this.e[0][4].div.onmouseover = function() { if (!this.clicked) { this.style.backgroundColor = rgb(60,60,60) } }
		this.e[0][4].div.onmouseout = function() { if (!this.clicked) { this.style.backgroundColor = rgb(50,50,50) } }
		
		this.e[0][4].div.onmousedown = function( e ) {
			var a = this.menu.e, him = this.menu;
			a[0][4].drag = true;
			a[0][3].transition( {"height":0, "max-height":0} );
			a[0][0].transition( {"height":0, "max-height":0, "color":0.3, "width":0.5} );
			a[0][4].topOffset = Math.max( e.pageY-him.size( him.e[0][1].div ), e.pageY-parseInt(a[0][3].div.style.maxHeight) );
		}
		
		document.addEventListener("mousemove", function( e ) {
			var a = this.gamemenu.menu.e, him = this.gamemenu.menu;
			if (a[0][4].drag) {
				var b = Math.min( him.size( him.e[0][1].div ), Math.max( 200, e.pageY - a[0][4].topOffset ));
				a[0][4].scale = b;
				a[0][3].div.style.maxHeight = b+"px";
				a[0][0].div.style.maxHeight = b+"px";
				him.maxitemc = b;
				a[0][0].div.rescale( a[0][1].div );
			}
		}, false );
		document.addEventListener("mouseup", function( e ) {
			var a = this.gamemenu.menu.e, him = this.gamemenu.menu;
			if (a[0][4].drag) {
				a[0][4].drag = false;
				
				a[0][3].transition( {"height":0.3, "max-height":0.3} );
				a[0][0].transition( {"height":0.3, "max-height":0.3, "color":0.3, "width":0.5} );
				setTimeout( function(){
					if (!a[0][4].drag) {
						var b = ( (a[0][2].scroll == 1)? a[0][4].scale : (Math.round( a[0][4].scale/25 )*25)+5 );
						a[0][3].div.style.maxHeight = b+"px";
						a[0][0].div.style.maxHeight = b+"px";
						him.maxitemc = b;
						setTimeout( function(){
							if (!a[0][4].drag) {
								a[0][0].div.rescale( a[0][1].div );
							}
						}, 50 );
					}
				}, 50 );
			}
		}, false );
		
	this.e[1] = {};
	this.e[1][0] = new create_div( {'p':this.e["menu"]} );
	this.e[1][0].style( { 
		"width":"calc(100% - 202px)", "height":"calc(100% - 25px)", "BColor":rgb(75,75,75), "overflow":"hidden"
	} );
	
		this.e[1][6] = new create_div( {'p':this.e[1][0]} );
		this.e[1][6].transition( {"width":0.5} )
		this.e[1][6].style( { 
			"float":"right", "width":"10px", "height":"100%", "BColor":rgb(50,50,50), "MRight":"2px"
		} );
	
		this.e[1][2] = new create_div( {'p':this.e[1][6]} );
		this.e[1][2].div.menu = this;
		this.e[1][2].style( { 
			"width":"100%", "height":"100%", "BColor":rgb(25,25,25)
		} );
		this.e[1][2].resize = function() {
			var a = this.div.menu, he = 100*(a.e[1][0].div.offsetHeight/a.e[1][3].div.offsetHeight);
			a.e[1][6].style( { "width":( (he >= 100)? 0 : 10)+"px" } );
			this.style( { "height":he+"%", "MTop":"0px" } );
			a.e[1][3].style( { "width":( (he >= 100)? "100%" : "calc(100% - 10px)") } );
			var c = ( ((a.e[1][3].div.offsetHeight-a.e[1][0].div.offsetHeight)*-1)*a.e[1][3].scroll );
			var d = Math.max( 0, a.e[1][0].div.offsetHeight-a.e[1][2].div.offsetHeight)*a.e[1][3].scroll;
			a.e[1][2].div.style.marginTop = d+"px";
			a.e[1][3].div.style.marginTop = Math.min( 0, c )+"px";
			a.e[1][3].scroll = ( (he >= 100)? 0 : a.e[1][3].scroll );
		}
		
		this.e[1][3] = new create_div( {'p':this.e[1][0]} );
		this.e[1][3].div.menu = this;
		this.e[1][3].scroll = 0;
		this.e[1][3].transition( {"width":0.5} );
		this.e[1][3].style( { 
			"width":"calc(100% - 12px)", "height":"auto", "BColor":rgb(75,75,75)
		} );
		
		this.e[1][2].resize();
		this.e[1][2].drag = false;
		this.e[1][2].div.menu = this;
		this.e[1][2].div.onmousedown = function( e ) {
			var a = this.menu.e;
			a[1][2].drag = true;
			a[1][2].topOffset = e.pageY-parseInt(this.style.marginTop);
		}
		document.addEventListener("mousemove", function( e ) {
			var a = this.gamemenu.menu.e;
			if (a[1][2].drag) {
				var b = Math.max( 0, Math.min( a[1][0].div.offsetHeight-a[1][2].div.offsetHeight, e.pageY - a[1][2].topOffset ) );
				var c = b/(a[1][0].div.offsetHeight-a[1][2].div.offsetHeight);
				a[1][3].scroll = c;
				a[1][2].div.style.marginTop = b+"px";
				a[1][3].div.style.marginTop = ( ((a[1][3].div.offsetHeight-a[1][0].div.offsetHeight)*-1)*c )+"px";
			}
		}, false );

		window.gamemenu.menu = this;
		window.addEventListener("resize", function( e ) {
			this.gamemenu.menu.e[1][2].resize();
		}, false );
		
		document.addEventListener("mouseup", function( e ) {
			var a = this.gamemenu.menu.e;
			a[1][2].drag = false;
		}, false );
		
		this.e[1][4] = new create_div( {'p':this.e[1][3]} );
		this.e[1][4].div.menu = this;
		this.e[1][4].style( { 
			"width":"25px", "height":"25px", "BColor":rgb(0,100,200), "M":"5px", "display":"inline-block"
		} );
		this.e[1][4].div.onclick = function() {
			this.menu.add();
		}
		
		this.e[1][5] = new create_div( {'p':this.e[1][3]} );
		this.e[1][5].div.menu = this;
		this.e[1][5].style( { 
			"width":"25px", "height":"25px", "BColor":rgb(0,200,0), "M":"5px", "display":"inline-block"
		} );
		this.e[1][5].div.onclick = function() {
			var div = new create_div( {'p':this.menu.e[1][3]} );
			div.style( { "width":"25px", "height":"25px", "BColor":rgb(100,100,0), "M":"5px", "display":"inline-block"} );
			this.menu.e[1][2].resize();
		}

	this.e[1][1] = new create_div( {'p':this.e["menu"]} );
	this.e[1][1].transition( {"background-Color":0.5, "background-position":0.5} )
	this.e[1][1].style( { 
		"width":"100%", "height":"25px", "borderBottom":"2px solid "+rgb(50,50,50), "borderTop":"2px solid "+rgb(100,100,100), 
		"background":"url(open.png) 0px 0px no-repeat", "backgroundPosition":"50% 0px", "BColor":rgb(75,75,75)
	} );
	this.e[1][1].div.onmouseover = function() { if (!this.clicked) { this.style.backgroundColor = rgb(90,90,90) } }
	this.e[1][1].div.onmouseout = function() { if (!this.clicked) { this.style.backgroundColor = rgb(75,75,75) } }

	this.e[1][1].div.menu = this;
	this.e[1][1].div.toggle = true;
	this.e[1][1].div.cur = 0;
	this.e[1][1].div.onclick = function() {
		var him = this.menu;
		var time = (new Date().getTime());
		if ( time > this.cur ) {
			this.toggle = !this.toggle;
		
			if (this.toggle) {
				if (him.size( him.e[0][1].div ) >= 175) {
					this.cur = time+600;
					him.e[0][3].style( { "height":"173px" } );
					setTimeout( function(){
						him.e["menu"].style( { "MTop":"-175px" } );
					}, 300 );
				} else {
					this.cur = time+300;
					him.e["menu"].style( { "MTop":"-175px" } );
				}
				him.e[1][1].transition( {"background-Color":0.5, "background-position":0.5} )
				him.e[1][1].style( { "backgroundPosition":"-50% 0px" } );
				setTimeout( function() {
						him.e[1][1].transition( {"background-Color":0.5, "background-position":0} )
						him.e[1][1].style( { "backgroundPosition":"150% 0px", "backgroundImage":"url(open.png)" } );
						setTimeout( function() {
							him.e[1][1].transition( {"background-Color":0.5, "background-position":0.5} )
							him.e[1][1].style( { "backgroundPosition":"50% 0px" } );
						}, 300 );
				}, 300 );
				him.e[0][4].style( { "height":"0px" } );
			} else {
				this.cur = time+600;
				him.e["menu"].style( { "MTop":"0px" } );
				
				him.e[1][1].transition( {"background-Color":0.5, "background-position":0.5} )
				him.e[1][1].style( { "backgroundPosition":"-50% 0px" } );
				setTimeout( function() {
						him.e[1][1].transition( {"background-Color":0.5, "background-position":0} )
						him.e[1][1].style( { "backgroundPosition":"150% 0px", "backgroundImage":"url(close.png)" } );
						setTimeout( function() {
							him.e[1][1].transition( {"background-Color":0.5, "background-position":0.5} )
							him.e[1][1].style( { "backgroundPosition":"50% 0px" } );
						}, 300 );
				}, 300 );
				
				setTimeout( function(){
					him.e[0][0].div.rescale( him.e[0][1].div, 1 );
					setTimeout( function(){
						him.e[0][0].div.rescale( him.e[0][1].div, 2 );
					}, 300 );
				}, 300 );
			}
			
		}
	}
		
	this.e[2] = {};
	this.e[3] = {};
	for(var i=0; i<20; i++) {
		this.add();
	}

	this.zindexc = 1;
	document.gamemenu.entity = this.e[2];
	
	document.addEventListener("mousemove", function( e ) {
	var a = this.gamemenu.entity, c = this.gamemenu.menu;
		for(var i in a) {
			if (a[i].drag) {
				var b = Math.max( 0, Math.min( c.size( c.e[0][1].div )-30, e.pageY - a[i].topOffset ) );
				a[i].div.style.top = b+"px";
			}
		}
	}, false );

	document.addEventListener("mouseup", function( e ) {
		var a = this.gamemenu.entity, c = 0; for(var i in a) { c += 1; }

		for(var i in a) {
			if (a[i].drag) {
				a[i].drag = false;
				a[i].transition( {"top":0.3} );
				var b = parseInt(a[i].div.style.top);
				for(var v in a) {
					if ( Math.round( b/25 ) < a[i].pos ) {
						if ( a[v].pos < a[i].pos && a[v].pos >= Math.round( b/25 ) ) {
							a[v].pos = Math.max( 0, Math.min( c-1, a[v].pos+1) );
						}
					} else {
						if ( a[v].pos > a[i].pos && a[v].pos <= Math.round( b/25 ) ) {
							a[v].pos = Math.max( 0, Math.min( c-1, a[v].pos-1) );
						}
					}
				}
				a[i].pos = Math.max( 0, Math.min( c-1, Math.round( b/25 )) );
			}
		}
		for(var i in a) {
			a[i].div.style.top = (a[i].pos*25)+"px";
			a[i].style( { "borderColor":rgb(0,0,0), "boxShadow":"0 0 0px "+rgb(0,0,0)} );
		}
	}, false );
}

gamemenu.prototype.add = function( ) {
	var i = 0, c = 0; for(var v in this.e[2]) { c += 1; }; while ( isset(this.e[2][i]) ) { i += 1; }
	
	this.e[3][i] = {};
	this.e[2][i] = new create_div( {'p':this.e[0][1]} );
	var col = rgb( 25, 25, 25 )
	this.e[2][i].style( { 
		"width":"calc(100% - 10px)", "height":"20px", "BColor":col, "M":"5px", "position":"absolute", "top":(c*25)+"px",
		"textAlign":"left", "lineHeight":"20px", "color":"white", "fontSize":"12px"
	} );
	this.e[2][i].div.entity = this.e[2];
	this.e[2][i].div.entid = i;
	this.e[2][i].drag = false;
	this.e[2][i].pos = c;
	this.e[2][i].div.menu = this;
	this.e[2][i].transition( {"top":0.3, "box-shadow":0.3, "border-color":0.3, "background-color":0.3, "text-shadow":0.3} );
	this.e[2][i].div.onmouseover = function() { if (!this.clicked) { this.style.backgroundColor = rgb(40,40,40) } }
	this.e[2][i].div.onmouseout = function() { if (!this.clicked) { this.style.backgroundColor = rgb(25,25,25) } }

	this.e[3][i][3] = new create_div( {'p':this.e[2][i]} );
	this.e[3][i][3].style( { 
		"width":"50%", "height":"100%", "float":"left", "*innerHTML":i, "PLeft":"10px"
	} );
	this.e[3][i][3].div.entity = this.e[2];
	this.e[3][i][3].div.entid = i;
	this.e[3][i][3].div.menu = this;
	this.e[3][i][3].div.onmousedown = function( e ) {
		this.entity[ this.entid ].drag = true;
		this.entity[ this.entid ].topOffset = e.pageY-parseInt(this.entity[ this.entid ].div.style.top);
		this.entity[ this.entid ].transition( {"top":0, "box-shadow":0.3, "border-color":0.3, "background-color":0.3, "text-shadow":0.3} );
		this.entity[ this.entid ].style( { "borderColor":rgb(0,100,200), "boxShadow":"0 0 7px "+rgb(0,100,200)} );
		
		this.entity[ this.entid ].div.style.zIndex = this.menu.zindexc;
		this.menu.zindexc += 1;
	}
	
	this.e[3][i][0] = new create_div( {'p':this.e[2][i]} );
	this.e[3][i][0].style( { 
		"width":"16px", "height":"16px", "BColor":rgb(200,0,0), "float":"right", "M":"2px",
		"background":"url(icon.png) 0px 0px", "backgroundSize":"64px 64px", "borderRadius":"10px"
	} );
	this.e[3][i][0].transition( {"box-shadow":0.3, "border-color":0.3} );
	this.e[3][i][0].div.onmouseover = function() { if (!this.clicked) { this.style.boxShadow = "0 0 4px "+rgb(200,0,0) } }
	this.e[3][i][0].div.onmouseout = function() { if (!this.clicked) { this.style.boxShadow = "0 0 0px "+rgb(0,0,0) } }

	this.e[3][i][0].div.menu = this;
	this.e[3][i][0].div.entid = i;
	this.e[3][i][0].div.onclick = function( e ) {
		var a = this.menu.e[2], c = 0; for(var i in a) { c += 1; }
		for(var i in a) {
			if ( a[i].pos > this.menu.e[2][this.entid].pos) {
				a[i].pos = a[i].pos-1;
				a[i].div.style.top = (a[i].pos*25)+"px";
			}
		}
		this.menu.e[2][ this.entid ].div.parentNode.removeChild( this.menu.e[2][ this.entid ].div );
		this.menu.e[2][ this.entid ] = null;
		delete this.menu.e[2][ this.entid ];
		this.menu.e[0][0].div.rescale( this.menu.e[0][1].div );
	}

	this.e[3][i][2] = new create_div( {'p':this.e[2][i]} );
	this.e[3][i][2].style( { 
		"width":"8px", "height":"8px", "BColor":rgb(200,0,0), "float":"right", "M":"6px", "borderRadius":"10px",
		"background":"url(icon.png) -16px 0px", "backgroundSize":"32px 32px", "MRight":"10px"
	} );
	this.e[3][i][2].transition( {"box-shadow":0.3, "border-color":0.3} );
	this.e[3][i][2].div.onmouseover = function() { if (!this.clicked) { this.style.boxShadow = "0 0 3px "+rgb(0,100,200) } }
	this.e[3][i][2].div.onmouseout = function() { if (!this.clicked) { this.style.boxShadow = "0 0 0px "+rgb(0,0,0) } }

	this.e[3][i][1] = new create_div( {'p':this.e[2][i]} );
	this.e[3][i][1].style( { 
		"width":"8px", "height":"8px", "BColor":rgb(200,0,0), "float":"right", "M":"6px", "borderRadius":"10px",
		"background":"url(icon.png) -8px 0px", "backgroundSize":"32px 32px", "MRight":"0px"
	} );
	this.e[3][i][1].transition( {"box-shadow":0.3, "border-color":0.3} );
	this.e[3][i][1].div.onmouseover = function() { if (!this.clicked) { this.style.boxShadow = "0 0 3px "+rgb(0,200,100) } }
	this.e[3][i][1].div.onmouseout = function() { if (!this.clicked) { this.style.boxShadow = "0 0 0px "+rgb(0,0,0) } }

	if (!this.e[1][1].div.toggle) {
		this.e[0][0].div.rescale( this.e[0][1].div );
	} else {
		this.e[0][2].style( { "height":Math.min(100, 100*(this.e[0][0].div.offsetHeight/this.size( this.e[0][1].div )))+"%" } );
		this.e[0][2].resize();
	}
}

gamemenu.prototype.size = function( p ) {
	var a = p.children;
	var c = 0, l = 0;
	for(var i in a) {
		if ( isset(a[i].tagName) ) {
			l = parseInt(a[i].style.margin);
			c += a[i].offsetHeight+l;
		}
	}
	return ( c+l );
}

window.onload = function() {
	var a = new gamemenu( document.body );
}