var CreateScene = function(engine, div) {
	
    var scene = new BABYLON.Scene(engine);
		scene.game_tickrate = 1;
		scene._gamepref = {
			"gamespeed":1
		}
		scene.menudatabase = div["database"];

	var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 400, new BABYLON.Vector3.Zero(), scene);

	var light1 = new BABYLON.PointLight("light_base", new BABYLON.Vector3(1, 125, -200), scene);
	light1.diffuse = new BABYLON.Color3(0, 1, 0);
	light1.specular = new BABYLON.Color3(0, 0, 0);
    
	var light2 = new BABYLON.PointLight("light_base", new BABYLON.Vector3(1, 125, 200), scene);
	light2.diffuse = new BABYLON.Color3(1, 0, 0);
	light2.specular = new BABYLON.Color3(0, 0, 0);

	// Effect --
	scene.TextureLoad = [];
	scene._loadTexture = function( a ) {
		if (typeof(scene.TextureLoad[a]) == "undefined") {
			scene.TextureLoad[a] = new BABYLON.Texture(a, scene);
		}

		return (scene.TextureLoad[a]);
	}
	
	scene.sound = new _soundEffect( scene );
	scene.loadEffect = new loadEffect( scene );
	// --------
	
	var skybox = BABYLON.Mesh.CreateBox("skyBox", 850.0, scene);
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
			skyboxMaterial.backFaceCulling = false;
			skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./content/skybox/skybox", scene);
			skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
			skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
			skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skybox.material = skyboxMaterial;

	var ufloor = new _baseEnt( "Plane", scene );
		ufloor.setRot(90,0,0);
		ufloor.setScale(128, 128, 128);
		ufloor.setPos(0,-2,0);
		var material = new BABYLON.StandardMaterial("material01", scene);
		material.diffuseColor = new BABYLON.Color3( 0, 0, 0 );
		ufloor.self.material = material;
		
	var floor = new _baseEnt( "Plane", scene );
		var material = new BABYLON.StandardMaterial("floor", scene);
		material.diffuseTexture = new BABYLON.Texture("./content/floor.png", scene);
		material.diffuseTexture.vScale = 50;
		material.diffuseTexture.uScale = 50;
		material.diffuseTexture.hasAlpha = true;
		floor.self.material = material;
		floor.setRot(90,0,0);
		floor.setScale(128, 128, 128);
	
		var nexus = [];
		var mob = [];
		nexus[0] = new _nexus( scene, nexus, mob, 0 );
			nexus[0].self.setPos(0,0,-200);
		nexus[1] = new _nexus( scene, nexus, mob, 1 );
			nexus[1].self.setPos(0,0,200);

	// RESUM BASE
		scene._resumBaseSettings = function( e ) {
			var a = e.obj;
			this.sound.changevolume( 
				( (a["mastersound"]==0)? 0 : (a["mastersound"]/10) ), 
				( (a["fxsound"]==0)? 0 : (a["fxsound"]/10) ), 
				( (a["musicsound"]==0)? 0 : (a["musicsound"]/10) ) 
			);

			var pos = light1.position;
			light1.position = new BABYLON.Vector3( pos.x, 25+(parseInt(a["gamebritness"])*2), pos.z );
			var pos = light2.position;
			light2.position = new BABYLON.Vector3( pos.x, 25+(parseInt(a["gamebritness"])*2), pos.z );

			var him = this;
			setTimeout( function() { 
				div[6].display();
				him.sound.play( "loadup_3.mp3", "music", 1 );
			}, 100 );

		}

		scene.menudatabase.get({ 'p':scene, 'a':"optionpref", 'callback':"_resumBaseSettings" });

	// THINK
	var cur = 0, cur2 = 0, last_time = (new Date().getTime()), frameCounter = 0, fps = 0;
	scene.globaltime = 60000;
	scene.pause = false;
	scene.started = false;
	var globalcur = scene.globaltime;
	var normflip = 0;
	scene._fpscomp = true;
	scene.winner = -1;
	scene.Ai_difficulty = 0;
	scene.registerBeforeRender(function () {
		var time = (new Date().getTime());
		
		frameCounter = ( ((time - last_time) > 1000)? (last_time = time, fps = frameCounter, 0) : frameCounter+1 );
		if (scene._fpscomp) {
			scene.game_tickrate = Math.min( 1, scene.game_tickrate + ( ((fps/45)>scene.game_tickrate)? 0.001 : ( ((fps/45)<scene.game_tickrate)? -0.001 : 0 ) ) )
		}
		// debug display ----------------------
		/*var str = "";
		for (var i in scene.loadEffect.load) {
			var v = 0; for (var x in scene.loadEffect.load[i]) { v++ };
			str += i+" {"+v+"} ";
		} 
		v = 0; for (var i in mob) { v++ };
		str += "mob {"+v+"} ";
		div[0].style( {"*innerHTML":
			" nexus0: " + nexus[0].mobCount + "/" + nexus[0].Cap + " -- " + nexus[0].income + "/" + nexus[0].maxincome +
			"<br>nexus1: "+nexus[1].mobCount+"/"+nexus[1].Cap+" -- "+nexus[1].income+"/"+nexus[1].maxincome+
			"<br>fps: "+fps+
			"<br>time dilation: "+(Math.round(scene.game_tickrate * 1000) / 1000)+"<br> "+str+"<br> time: "+scene.globaltime
		} );*/
		// ------------------------------------

		if (!scene.pause) {
			if (time > globalcur) {
				globalcur = time + 10;
				scene.globaltime += 10;
			}
			if (scene.started) {
				if ( scene.globaltime > cur2+((1000/60)/scene.game_tickrate) ) {
					cur2 = scene.globaltime;
			
					var colbox = [], scale
					colbox["scale"] = (scale = 50);
					for (var i in mob) {
						if (isset(colbox[b])) {
							var a = mob[i].self.getPos(), b = Math.floor(a.x/scale)+','+Math.floor(a.z/scale);
							if (!isset(colbox[b])) {
								colbox[b] = [];
							}
					
							colbox[b][i] = mob[i];
						}
					}
			
					for (var i in mob) {
						if (isset(mob[i])) {
							mob[i].Think( colbox );
						}
					}
			
					for (var i in nexus) {
						nexus[i].Think();
					}
				}
			} else {
				if ( scene.globaltime > cur2+500 ) {
					cur2 = scene.globaltime;

					nexus[0].effect();
					nexus[1].effect();
				}
				camera.alpha += 0.001;
			}			
			scene.loadEffect.think();
		}

		// CAMERA 
		if (div[0].div.clicked || time < div[0].div.clickcur) {
			camera.beta = cameralock[0];
			camera.alpha = cameralock[1];
		} else {
			if (camera.radius > 300) {
				camera.radius = 300;
			}
			if (camera.radius < 50) {
				camera.radius = 50;
			}

			if (camera.beta < 0.1) {
				camera.beta = 0.1;
			} else if (camera.beta > (Math.PI / 2) * 0.9) {
				camera.beta = (Math.PI / 2) * 0.9;
			}
		}

		camera.target = new BABYLON.Vector3( 0, 0, camera.target.z+_smoothOut( cameralock[3], camera.target.z ) );

		if (cameralock[8]) {
			camera.beta += _smoothOut( cameralock[9]*100, camera.beta*100 )/100;
			camera.radius += _smoothOut( cameralock[6], camera.radius );
			if (scene.started) {
				camera.alpha += _smoothOut( cameralock[1]*100, camera.alpha*100 )/100;
			}
			if ( _smoothDo(cameralock[9]*100, camera.beta*100) && _smoothDo(cameralock[6], camera.radius) ) {
				if (!scene.started || _smoothDo(cameralock[1]*100, camera.alpha*100)) {
					cameralock[8] = false;
				}
			}
		}

		if ( keystat[27] && !keyrunstat[27] && scene.started && scene.winner == -1 ) {
			scene._runpause();
			keyrunstat[27] = true;
		}

		if ( keystat[17] && !keyrunstat[17] && scene.started && !scene.pause && scene.winner == -1 ) {
			div[4].e[1][1].div.onclick();
			keyrunstat[9] = true;
		}

		if ( keystat[32] && !keyrunstat[32] && scene.started && !div[2].e["menu"].openmenu && scene.winner == -1 ) {
			scene.pause = !scene.pause;
			scene.sound.pause( scene.pause );
			keyrunstat[32] = true;
		}

		div[5].update( {
			"hp1":nexus[1].hp,
			"maxhp1":nexus[1].maxhp,
			"icom1":nexus[1].income,
			"maxicom1":nexus[1].maxincome,
			"mobcount1":nexus[1].mobCount,
			"mobcap1":nexus[1].Cap,

			"hp0":nexus[0].hp,
			"maxhp0":nexus[0].maxhp,
			"icom0":nexus[0].income,
			"maxicom0":nexus[0].maxincome,
			"mobcount0":nexus[0].mobCount,
			"mobcap0":nexus[0].Cap,

			"time":scene.globaltime,
			"timespawn":Math.round(nexus[0].spawncur),
			"timemaxspawn":Math.round(nexus[0].maxspawncur),
			"timeincome":Math.round(nexus[0].incomecur),
			"timemaxincome":Math.round(nexus[0].maxincomecur),

			"normflip":normflip
		}, scene.pause );
	});

	//console.log( camera.angularSensibility );
	// CAMERA HOOKS
		div[0].div.clicked = false;
		var cameralock = {1:0, 3:0, 6:300, 9:0.9};

		div[0].div.addEventListener("mousemove", function( e ) {
			if (this.clicked) {
				normflip = ( (( (camera.alpha<0)? camera.alpha*-1 : camera.alpha )+(Math.PI/2) )%(Math.PI*2) )/2;
				this.clickcur = (new Date().getTime())+1000;
				cameralock[3] = cameralock[4]+( ( (cameralock[2]-e.pageX)*( (normflip>(Math.PI/2))? -1 : 1 ) )/ (camera.angularSensibility/350));
				cameralock[3] = Math.min( 120, Math.max( -120, cameralock[3]));
			}
		} );

		div[0].div.addEventListener("mousedown", function( e ) {
			if (e.button==2) {
				cameralock[0] = camera.beta;
				cameralock[1] = camera.alpha;
				cameralock[2] = e.pageX;
				cameralock[4] = ((!cameralock[3])?0:cameralock[3]);

				this.clicked = true;
			} else {
				this.clickcur = 0;
			}
			
		}, false );

		div[0].div.addEventListener("mouseup", function( e ) {
			this.clicked = false; 
		}, false );
	// CAMERA HOOKS --------- END

	// MENU EVENT FUCNTION
		div[2].scene = scene;
		scene._runstart = function( b, m ) {
			this.started = true;
			this.winner = -1;

			for (var v=0; v<=1; v++) { 
				nexus[v].maxincome = 100;
				nexus[v].income = 0;
				nexus[v].maxhp = 1000;
				nexus[v].hp = nexus[v].maxhp;
				nexus[v].Cap = 25;
				nexus[v].incomecur = this.globaltime;
				nexus[v].spawntime = 30;
				nexus[v].spawncur = 0;
				nexus[v].maxCap = this._gamepref["mobhardcap"];
				nexus[v].mobCount = 0;
				nexus[v].AI_update = 0;
			}
			nexus[0].AI = true;
			nexus[1].AI = false;

			m.e["menu"].div.style.display = "none";
			div[4].e["menu"].style( {"display":"block"} );
			div[5].display( true );
			div[2].e["menu"].openmenu = false;
			div[5].updatetran = false;
			this.sound.play( "entergame_1.mp3", "music", 0.75 );
			div[6].display();
		}

		scene._runleave = function( m, b ) {
			this.started = false;
			this.winner = -1;

			var saved = {'mob':{}, 'nexus':{}, 'camera':{}};
		
			saved.camera = {
				'1':camera.alpha,
				'3':cameralock[3],
				'6':camera.radius,
				'9':camera.beta
			}
			cameralock[3] = 0;
			cameralock[6] = 300;
			cameralock[9] = 0.9;
			cameralock[8] = true;

			for (var i in mob) {
				if (isset(mob[i])) {
					saved.mob[i] = {
						'pos':mob[i].self.getPos(),
						'hp':mob[i].hp,
						'nexus':mob[i].parentid,
						'type':mob[i].type
					};
					mob[i].def_think(10000, mob[i]);
				}
			}

			for (var v=0; v<=1; v++) { 
				saved.nexus[v] = {
					'id':v,
					'maxincome':nexus[v].maxincome,
					'income':nexus[v].income,
					'hp':nexus[v].hp,
					'maxhp':nexus[v].maxhp,
					'Cap':nexus[v].Cap,
					'maxCap':nexus[v].maxCap,
					'incomecur':nexus[v].incomecur-this.globaltime,
					'spawncur':nexus[v].spawncur-this.globaltime,
					'ai':nexus[v].AI,
					'spawntime':nexus[v].spawntime,
				}
			}

			div[4].e["menu"].style( {"display":"none"} );
			div[5].display( false );
			div[2].changemenu( div[2].e[ div[2].menuactive ][3].div, 0 );
			div[2].e["menu"].style( {"display":"block"} );
			this.sound.stop( );
			div[6].display();

			var list = {}, count = 0;
			for (var i in div[4].e[3]) {
				if ( isset(div[4].e[2][i]) && isset(div[4].e[3][i][3]) && isset(div[4].e[3][i][0]) ) {
					list[count++] = {
						"t":div[4].e[3][i][3].mobtype,
						"c":div[4].e[3][i][3].count,
						"o":div[4].e[2][i].pos
					}
				}
			}
			for (var i in div[4].e[3]) {
				if ( isset(div[4].e[2][i]) && isset(div[4].e[3][i][3]) && isset(div[4].e[3][i][0]) ) {
					div[4].e[3][i][0].div.onclick();
				}
			}
			saved.list = list;

			if (scene.winner != -1) {
				this.menudatabase.set( "gamesaved", false );
			} else {
				if ( b ) {
					this.menudatabase.set( "resumsaved", saved );
					this.menudatabase.set( "gamesaved", b );
				}
			}

			this.sound.play( "entergame_1.mp3", "music", 0.75 );
			var him = this;
			setTimeout( function(){ 
				him.pause = false;
			}, 100 );
		}
	
		scene._runresum = function( m, b ) {
			this.started = true;
			this.pause = true;
			this.resumfunc = function( e ) {
				var a = e.obj.mob;
				for (var i in a){
					var ent = nexus[ a[i].nexus ].SpawnMob( i, a[i].type, a[i].pos );
					ent.hp = a[i].hp;
				}

				var b = e.obj.nexus;
				for (var i in b){
					nexus[ b[i].id ].maxincome = b[i].maxincome;
					nexus[ b[i].id ].income = b[i].income;
					nexus[ b[i].id ].hp = b[i].hp;
					nexus[ b[i].id ].maxhp = b[i].maxhp;
					nexus[ b[i].id ].Cap = b[i].Cap;
					nexus[ b[i].id ].maxCap = b[i].maxCap;
					nexus[ b[i].id ].incomecur = b[i].incomecur+this.globaltime;
					nexus[ b[i].id ].spawncur = b[i].spawncur+this.globaltime;
					nexus[ b[i].id ].AI = b[i].ai;
					nexus[ b[i].id ].spawntime = b[i].spawntime;
					nexus[ b[i].id ].AI_update = 0;
				}

				var c = e.obj.camera;
				cameralock[1] = c[1];
				cameralock[3] = c[3];
				cameralock[6] = c[6];
				cameralock[9] = c[9];
				cameralock[8] = true;

				var list = e.obj.list;
				for (var i in list) {
					var tmp = div[4].add( list[i].t, list[i].c );
					div[4].e[2][tmp].pos = list[i].o;
					div[4].e[2][tmp].div.style.top = (list[i].o*25)+"px";
				}

				div[2].e["menu"].div.style.display = "none";
				div[4].e["menu"].style( {"display":"block"} );
				div[5].display( true );
				div[2].e["menu"].openmenu = false;
				div[5].updatetran = false;
				this.sound.play( "entergame_1.mp3", "music", 0.75 );
				div[6].display();

				var him = this;
				setTimeout( function(){ 
					him.pause = false;
					him.sound.pause( him.pause );
				}, 100 );
			}

			this.menudatabase.get({ 'p':this, 'a':"resumsaved", 'callback':"resumfunc" });
		}

		scene._runpause = function() {
			div[2].e["menu"].openmenu = !div[2].e["menu"].openmenu
			div[2].e["menu"].style( {"display":( (div[2].e["menu"].openmenu)? "block" : "none" )} );
			div[2].changemenu( div[2].e[ div[2].menuactive][3].div, 3 );
			this.pause = div[2].e["menu"].openmenu;
			div[5].display( !div[2].e["menu"].openmenu );
			div[4].e["menu"].style( {"display":( (!div[2].e["menu"].openmenu)? "block" : "none" )} );
			this.sound.pause( this.pause );
		}

			
		scene._runupdatepref = function( a ) {
			camera.angularSensibility = ( 2000-(a["mousesens"]*100) );
			var pos = light1.position;
			light1.position = new BABYLON.Vector3( pos.x, 25+(parseInt(a["gamebritness"])*2), pos.z );
			var pos = light2.position;
			light2.position = new BABYLON.Vector3( pos.x, 25+(parseInt(a["gamebritness"])*2), pos.z );
			div[5].menusize = a["guisize"];
			this._fpscomp = ( (a["fpscomp"] == 1)? true : false );
			this._gamepref = a
			this.Ai_difficulty = (30-a["difficulty"])*1000;
			this.sound.changevolume( 
				( (a["mastersound"]==0)? 0 : (a["mastersound"]/10) ), 
				( (a["fxsound"]==0)? 0 : (a["fxsound"]/10) ), 
				( (a["musicsound"]==0)? 0 : (a["musicsound"]/10) ) 
			);
		}

		scene._rungetmob = function( a ) {
			return (div[4]._get());
		}

		scene._runwin = function( a ) {
			scene.winner = a;
			div[2].e["menu"].style( {"display":"block"} );
			div[5].display( false );
			div[4].e["menu"].style( {"display":"none"} );
			div[2].changemenu( div[2].e[ div[2].menuactive ][3].div, 5 );
			this.menudatabase.set( "gamesaved", false );
			if ( nexus[a].AI ) {
				this.sound.play( "win.mp3", "music", 1 );
				div[2].e[5][3].style( { "color":rgb(0,255,0), "*innerHTML":"Victory"} );
			} else {
				this.sound.play( "loss.mp3", "music", 1 );
				div[2].e[5][3].style( { "color":rgb(255,0,0), "*innerHTML":"Defeat"} );
			}	
		}
	// MENU EVENT FUCNTION ------- END

	//var app = WinJS.Application;
	/*scene._runexit = function( m ) {
		window.MSApp.terminateApp("exit");
	}*/
	/*app.addEventListener("checkpoint", function() {
		if (scene.started) {
			if (scene.winner != -1) {
				scene.menudatabase.set( "gamesaved", false );
			} else {
				scene._runleave( 1, true );
			}
		}
	});*/

	var keystat = {}, keyrunstat = {};
	document.addEventListener("keydown", function( e ) {
		keystat[e.keyCode] = true;
	}, false );
	document.addEventListener("keyup", function( e ) {
		keystat[e.keyCode] = false;
		keyrunstat[e.keyCode] = false;
	}, false );

	/*
	var mousestat = {};
	document.addEventListener("mousedown", function( e ) {
		mousestat[e.button] = true;
	}, false );
	document.addEventListener("mouseup", function( e ) {
		mousestat[e.button] = false;
	}, false );*/
    return scene;
}