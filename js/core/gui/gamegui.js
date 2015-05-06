
var gamegui = function( p ) {
	this.e = {};

	var him = this;
	this.e["menu"] = new create_div( {'p':p, "c":"no-select"} );
	this.e["menu"].style( {
		"width":"100%", "height":"200px", "position":"absolute", "bottom":"0px",
		"left":"0px", "pointerEvents":"all", 'overflow':'hidden'//, "BColor":rgb(0,0,0) 
	} );
	this.e["menu"].mutation( function() { him.resize(); } );
	this.e["menu"].div.menu = this;
	
	this.e[0] = new create_div( {'p':this.e["menu"], 't':"canvas"} );
	this.e[0].style( { "width":"100%", "height":"100px", "float":"left"} );
	this.e[0].menu = this;
	this.e[0].onresize = function( i ) {
		var off = this.menu.e["menu"].div.offsetHeight;
		this.menu.e[i].style( { "width":(off*2)+"px", "height":off+"px", "*width":(off*2), "*height":off } );
	}
	this.e[0].update = function( b, c, pause ) {
		var him = this.menu.e[0], ctx = him.div.getContext('2d');
		ctx.clearRect( 0, 0, him.div.width, him.div.width );

		if (!pause) {
			this.menu.updatetran["hp0"] += ( (b["hp0"] > c["hp0"])? 0.5 : ( (b["hp0"] == c["hp0"])? 0 : -0.5 ) );
		}
		var a = Math.max( 0.001, b["maxhp0"]-this.menu.updatetran["hp0"] );
		var e = Math.max( 0.001, b["maxhp0"]-b["hp0"] );
		var border = 4;

		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2)-border, Math.PI*( 1+(a/b["maxhp0"]) ), Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = "red";
		ctx.fill();

		var green = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		green.addColorStop( 0, rgb(0, 100, 0) );
		green.addColorStop( 0.8, rgb(0, 200, 0) );
		green.addColorStop( 1, rgb(100, 200, 100) );

		var black = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		black.addColorStop( 0, rgb(0, 0, 0) );
		black.addColorStop( 0.4, rgb(50, 50, 50) );
		black.addColorStop( 0.5, rgb(70, 70, 70) );
		black.addColorStop( 0.6, rgb(50, 50, 50) );
		black.addColorStop( 1, rgb(0, 0, 0) );

		var gray = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		gray.addColorStop( 0, rgb(20, 20, 20) );
		gray.addColorStop( 1, rgb(50, 50, 50) );

		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2)-border, Math.PI*( 1+(e/b["maxhp0"]) ), Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = green;
		ctx.fill();

		for (var i=(360-(( (Math.floor((b["hp0"])/100)*100)/b["maxhp0"] )*180)); i<(360); i+=180/Math.round(b["maxhp0"]/100) ) {
			ctx.lineWidth = 2;
			ctx.beginPath();
				ctx.moveTo( him.div.width/2, him.div.height );
				var count = 360;
				ctx.lineTo( 
					(him.div.width/2) +(((him.div.width/2)-border) * Math.cos( ((Math.PI*2)/count)*i )), 
					(him.div.height) +(((him.div.width/2)-border) * Math.sin( ((Math.PI*2)/count)*i ))
				);
			ctx.closePath();
			ctx.strokeStyle = black;
			ctx.stroke();
		}

		ctx.lineWidth = 4;
		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/3)-border, Math.PI*1, Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = gray;
		ctx.fill();
		ctx.strokeStyle = black;
		ctx.stroke();

		ctx.lineWidth = 4;
		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2-border), Math.PI*1, Math.PI*2);
		ctx.closePath();
		ctx.strokeStyle = black;
		ctx.stroke();

		var text1 = "credit: ";
		var metrics1 = ctx.measureText(text1);
		var text2 = b["icom0"]+" / "+ b["maxicom0"];
		var metrics2 = ctx.measureText(text2);

		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "white";
		ctx.fillText( text1, (him.div.width/2)-((metrics1.width+metrics2.width)/2), him.div.height-((him.div.height/10)*3) );
		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "silver";
		ctx.fillText( text2, ( (him.div.width/2)-((metrics1.width+metrics2.width)/2) )+metrics1.width, him.div.height-((him.div.height/10)*3) );

		var text1 = "packet: ";
		var metrics1 = ctx.measureText(text1);
		var text2 = b["mobcount0"]+" / "+ b["mobcap0"];
		var metrics2 = ctx.measureText(text2);

		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "white";
		ctx.fillText( text1, (him.div.width/2)-((metrics1.width+metrics2.width)/2), him.div.height-((him.div.height/10)*1) );
		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "silver";
		ctx.fillText( text2, ( (him.div.width/2)-((metrics1.width+metrics2.width)/2) )+metrics1.width, him.div.height-((him.div.height/10)*1) );
	}

	this.e[1] = new create_div( {'p':this.e["menu"], 't':"canvas"} );
	this.e[1].style( { "width":"100%", "height":"100px", "float":"right" } );
	this.e[1].menu = this;
	this.e[1].onresize = function( i ) {
		var off = this.menu.e["menu"].div.offsetHeight;
		this.menu.e[i].style( { "width":(off*2)+"px", "height":off+"px", "*width":(off*2), "*height":off } );
	}
	this.e[1].update = function( b, c, pause ) {
		var him = this.menu.e[1], ctx = him.div.getContext('2d');
		ctx.clearRect( 0, 0, him.div.width, him.div.width );

		if (!pause) {
			this.menu.updatetran["hp1"] += ( (b["hp1"] > c["hp1"])? 0.5 : ( (b["hp1"] == c["hp1"])? 0 : -0.5 ) );
		}
		var a = Math.max( 0.001, b["maxhp1"]-this.menu.updatetran["hp1"] );
		var e = Math.max( 0.001, b["maxhp1"]-b["hp1"] );
		var border = 4;

		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2)-border, Math.PI*( 1+(a/b["maxhp1"]) ), Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = "yellow";
		ctx.fill();

		var green = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		green.addColorStop( 0, rgb(100, 0, 0) );
		green.addColorStop( 0.8, rgb(200, 0, 0) );
		green.addColorStop( 1, rgb(200, 200, 100) );

		var black = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		black.addColorStop( 0, rgb(0, 0, 0) );
		black.addColorStop( 0.4, rgb(50, 50, 50) );
		black.addColorStop( 0.5, rgb(70, 70, 70) );
		black.addColorStop( 0.6, rgb(50, 50, 50) );
		black.addColorStop( 1, rgb(0, 0, 0) );

		var gray = ctx.createLinearGradient(0,0,him.div.width,him.div.height);
		gray.addColorStop( 0, rgb(20, 20, 20) );
		gray.addColorStop( 1, rgb(50, 50, 50) );

		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2)-border, Math.PI*( 1+(e/b["maxhp1"]) ), Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = green;
		ctx.fill();

		for (var i=(360-(( (Math.floor((b["hp1"])/100)*100)/b["maxhp1"] )*180)); i<(360); i+=180/Math.round(b["maxhp1"]/100) ) {
			ctx.lineWidth = 2;
			ctx.beginPath();
				ctx.moveTo( him.div.width/2, him.div.height );
				var count = 360;
				ctx.lineTo( 
					(him.div.width/2) +(((him.div.width/2)-border) * Math.cos( ((Math.PI*2)/count)*i )), 
					(him.div.height) +(((him.div.width/2)-border) * Math.sin( ((Math.PI*2)/count)*i ))
				);
			ctx.closePath();
			ctx.strokeStyle = black;
			ctx.stroke();
		}

		ctx.lineWidth = 4;
		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/3)-border, Math.PI*1, Math.PI*2);
			ctx.lineTo(him.div.width/2, him.div.height);
		ctx.closePath();
		ctx.fillStyle = gray;
		ctx.fill();
		ctx.strokeStyle = black;
		ctx.stroke();

		ctx.lineWidth = 4;
		ctx.beginPath();
			ctx.arc(him.div.width/2, him.div.height, (him.div.width/2-border), Math.PI*1, Math.PI*2);
		ctx.closePath();
		ctx.strokeStyle = black;
		ctx.stroke();

		var text1 = "credit: ";
		var metrics1 = ctx.measureText(text1);
		var text2 = b["icom1"]+" / "+ b["maxicom1"];
		var metrics2 = ctx.measureText(text2);

		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "white";
		ctx.fillText( text1, (him.div.width/2)-((metrics1.width+metrics2.width)/2), him.div.height-((him.div.height/10)*3) );
		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "silver";
		ctx.fillText( text2, ( (him.div.width/2)-((metrics1.width+metrics2.width)/2) )+metrics1.width, him.div.height-((him.div.height/10)*3) );

		var text1 = "packet: ";
		var metrics1 = ctx.measureText(text1);
		var text2 = b["mobcount1"]+" / "+ b["mobcap1"];
		var metrics2 = ctx.measureText(text2);

		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "white";
		ctx.fillText( text1, (him.div.width/2)-((metrics1.width+metrics2.width)/2), him.div.height-((him.div.height/10)*1) );
		ctx.font = (him.div.height/10)+"px Georgia";
		ctx.fillStyle = "silver";
		ctx.fillText( text2, ( (him.div.width/2)-((metrics1.width+metrics2.width)/2) )+metrics1.width, him.div.height-((him.div.height/10)*1) );
	}
	
	this.e[2] = new create_div( {'p':this.e["menu"]} );
	this.e[2].style( { "width":"100%", "height":"100%", "position":"absolute", "left":"0px" } );

	this.e[3] = new create_div( {'p':this.e[2]} );
	this.e[3].style( { "width":"100px", "height":"100px", "position":"relative", "margin":"0px auto" } );
	this.e[3].menu = this;
	this.e[3].onresize = function( i ) {
		var off = this.menu.e["menu"].div.offsetHeight;
		this.menu.e[i].style( { "width":(off*1.5)+"px", "height":off+"px" } );
		this.menu.e[parseInt(i)+1].style( { "*width":(off*1.5), "*height":off } );
	}

	this.e[4] = new create_div( {'p':this.e[3] , 't':"canvas"} );
	this.e[4].style( { "width":"100%", "height":"100%", /*"BColor":rgb(0,200,200)*/ } );
	this.e[4].menu = this;
	this.e[4].update = function( b, c, pause ) {
		var him = this.menu.e[4], ctx = him.div.getContext('2d');
		ctx.clearRect( 0, 0, him.div.width, him.div.width );
		var size = 4;
		var margin = 5;

		// COLOR
		var black = ctx.createLinearGradient(0,0,him.div.width,him.div.height/2);
		black.addColorStop( 0, rgb(70, 70, 70) );
		black.addColorStop( 1, rgb(20, 20, 20) );

		var white = ctx.createLinearGradient(0,0,him.div.width,him.div.height/2);
		white.addColorStop( 0, rgb(150, 150, 150) );
		white.addColorStop( 0.4, rgb(200, 200, 200) );
		white.addColorStop( 0.6, rgb(150, 150, 150) );
		white.addColorStop( 1, rgb(200, 200, 200) );

		// BUILD FUNC
		var clearrad = function( x, y, r ) {
			ctx.save();
				ctx.globalCompositeOperation = 'destination-out';
				ctx.beginPath();
					ctx.arc( x, y, r, 0, Math.PI*2);
				ctx.closePath();
				ctx.fillStyle = "red";
				ctx.fill();
			ctx.restore();
		}

		var drawtick = function( x, y, r, time, cur, max ) {
			var s = (Math.PI*-0.5)+( Math.PI*(2*(1-(((cur+max)-time)/(max*10))*10 )) );
			ctx.save();
				ctx.globalAlpha=0.5;
				ctx.beginPath();
					ctx.arc( x, y, r, s, Math.PI*1.5, true );
					ctx.lineTo( x, y );
				ctx.closePath();
				ctx.fillStyle = "black";
				ctx.fill();
			ctx.restore();

			ctx.lineWidth = 2;
			ctx.beginPath();
				ctx.moveTo( x, y );
				ctx.lineTo( x + (r * Math.cos( s )), y + (r * Math.sin( s )) );
			ctx.closePath();
			ctx.strokeStyle = rgb(70,70,70);
			ctx.stroke();

			ctx.lineWidth = 2;
			ctx.beginPath();
				ctx.moveTo( x, y );
				ctx.lineTo( x + (r * Math.cos( Math.PI*-0.5 )), y + (r * Math.sin( Math.PI*-0.5 )) );
			ctx.closePath();
			ctx.strokeStyle = rgb(70,70,70);
			ctx.stroke();

			var hsize = him.div.height/20;
			for (var i=0; i<12; i+=1 ) {
				ctx.lineWidth = 2;
				ctx.beginPath();
					ctx.moveTo( x + ( (r-hsize) * Math.cos( ((Math.PI*2)/12)*i ) ), y + ( (r-hsize) * Math.sin( ((Math.PI*2)/12)*i ) ) );
					ctx.lineTo( x + ( r * Math.cos( ((Math.PI*2)/12)*i ) ), y + ( r * Math.sin( ((Math.PI*2)/12)*i ) ) );
				ctx.closePath();
				ctx.strokeStyle = white;
				ctx.stroke();
			}

			ctx.lineWidth = (hsize/4);
			ctx.beginPath();
				ctx.arc( x, y, r-( (hsize/4)/2 ), 0, Math.PI*2, true );
			ctx.closePath();
			ctx.strokeStyle = white;
			ctx.stroke();

			var left = Math.round( ((cur+max)-time)/1000 );
			var minute = Math.floor(left/60);
			var sec = (left-(minute*60));
			var text = minute+":"+( (sec<10)? "0"+sec : sec );
			var metrics = ctx.measureText(text);

			ctx.font = (him.div.height/10)+"px Georgia";
			ctx.fillStyle = "white";
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 4;
			ctx.strokeText( text, x-(metrics.width/2), y+(him.div.height/40) );
			ctx.fillText( text, x-(metrics.width/2), y+(him.div.height/40) );
		}

		// MAKE
		ctx.beginPath();
			ctx.arc(him.div.width-(him.div.width/size), him.div.height/2, (him.div.width/size)-2, Math.PI*1.5, Math.PI*2.5);
			ctx.arc(him.div.width/size, him.div.height/2, (him.div.width/size)-2, Math.PI*0.5, Math.PI*1.5);
		ctx.closePath();
		ctx.fillStyle = black;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.stroke();

		clearrad( him.div.width/size, him.div.height/2, (him.div.width/size)-margin )
		drawtick( him.div.width/size, him.div.height/2, (him.div.width/size)-margin, b["time"], b["timespawn"], b["timemaxspawn"] )

		clearrad( him.div.width-(him.div.width/size), him.div.height/2, (him.div.width/size)-margin )
		drawtick( him.div.width-(him.div.width/size), him.div.height/2, (him.div.width/size)-margin, b["time"], b["timeincome"], b["timemaxincome"] )
		// MAKE ----------- end
	}

	this.resize();

	this.lastwidth = 0;
	this.menusize = 200;
	this.lastmenusize = this.menusize;

	this.display( false );
	this.e[0].transition( {"margin":0.3} );
	this.e[1].transition( {"margin":0.3} );
	this.e[4].transition( {"margin":0.3} );

	this.updatetran = false;
}

gamegui.prototype.display = function( a ) {
	if ( !a ) {
		this.e[0].style( {"MLeft":(this.menusize*-2)+"px"} )
		this.e[1].style( {"MRight":(this.menusize*-2)+"px"} )
		this.e[4].style( {"MBottom":(this.menusize*-2)+"px"} )
	} else {
		this.e[0].style( {"MLeft":"0px"} )
		this.e[1].style( {"MRight":"0px"} )
		this.e[4].style( {"MBottom":"0px"} )
	}
}

gamegui.prototype.update = function( a, pause ) {
	var offx = this.e["menu"].div.offsetHeight, offy = this.e["menu"].div.offsetWidth;
	if (offy != this.lastwidth || this.menusize != this.lastmenusize) {
		this.lastwidth = offy;
		this.lastmenusize = this.menusize;

		if ( offx != this.menusize || (offx*6)+20 > offy ) {
			this.e["menu"].style( {
				"height":Math.min( this.menusize, ((offy-20)/6) )+"px"
			});
		}
	}

	this.updatedvalue = a;
	if ( this.updatetran == false ) {
		this.updatetran = this.updatedvalue;
	}

	for (var i in this.e) {
		if (isset(this.e[i].update)) {
			this.e[i].update( this.updatedvalue, this.updatetran, pause );
		}
	}
}

gamegui.prototype.resize = function( ) {
	if ( this.updatetran == false ) {
		this.updatetran = this.updatedvalue;
	}

	for (var i in this.e) {
		if ( isset(this.e[i].onresize) ) {
			this.e[i].onresize( i );
		}
		if ( isset(this.e[i].update) && isset(this.updatedvalue) ) {
			this.e[i].update( this.updatedvalue, this.updatetran, false );
		}
	}
}