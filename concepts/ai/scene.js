var CreateScene = function(engine, div) {
	
    var scene = new BABYLON.Scene(engine);
		scene.game_tickrate = 1;
		
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 400, new BABYLON.Vector3.Zero(), scene);
	var light = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 50, 1), scene);
		light.intensity = 0.25;
		
	// Effect --
	scene.TextureLoad = [];
	scene._loadTexture = function( a ) {
		if (typeof(scene.TextureLoad[a]) == "undefined") {
			scene.TextureLoad[a] = new BABYLON.Texture(a, scene);
		}

		return (scene.TextureLoad[a]);
	}
	
	scene.loadEffect = new loadEffect( scene );
	// --------
	
	var floor = new _baseEnt( "Plane", scene );
		floor.setRot(90,0,0);
		floor.setScale(40,80,80);
	
		var nexus = [];
		var mob = [];
		nexus[0] = new _nexus( scene, nexus, mob, 0 );
			nexus[0].self.setPos(0,8,-200);
		nexus[1] = new _nexus( scene, nexus, mob, 1 );
			nexus[1].self.setPos(0,8,200);

	// THINK
	var cur = 0, cur2 = 0, last_time = (new Date().getTime()), frameCounter = 0, fps = 0;
	scene.registerBeforeRender(function () {
		var time = (new Date().getTime());
		
		frameCounter = ( ((time - last_time) > 1000)? (last_time = time, fps = frameCounter, 0) : frameCounter+1 );
		scene.game_tickrate = Math.min( 1, scene.game_tickrate + ( ((fps/45)>scene.game_tickrate)? 0.001 : ( ((fps/45)<scene.game_tickrate)? -0.001 : 0 ) ) )
		// debug display ----------------------
			var str = "";
			for (var i in scene.loadEffect.load) {
				var v = 0; for (var x in scene.loadEffect.load[i]) { v++ };
				str += i+" {"+v+"} ";
			} 
			v = 0; for (var i in mob) { v++ };
			str += "mob {"+v+"} ";
			div[0].style( {"*innerHTML":
				" nexus0: "+nexus[0].mobCount+"/"+nexus[0].Cap+
				"<br>nexus1: "+nexus[1].mobCount+"/"+nexus[1].Cap+
				"<br>fps: "+fps+
				"<br>time dilation: "+(Math.round(scene.game_tickrate*1000)/1000)+"<br> "+str
			} );
		// ------------------------------------

		if ( time > cur2+((1000/60)/scene.game_tickrate) ) {
			cur2 = time;
			
			var colbox = [], scale
			colbox["scale"] = (scale = 5);
			for (var i in mob) {
				var a = mob[i].self.getPos(), b = Math.floor(a.x/scale)+','+Math.floor(a.z/scale);
				if (typeof(colbox[b]) == "undefined")
					colbox[b] = [];
				
				colbox[b][i] = mob[i];
			}
			
			for (var i in mob) {
				mob[i].Think( colbox );
			}
			
			for (var i in nexus) {
				nexus[i].Think();
			}
			
			scene.loadEffect.think();
		}
	});
	
	div[1].div.onclick = function() {
		for (var i in mob) {
			mob[i].def_think(10000, mob[i]);
		}
	}
	
    return scene;
}