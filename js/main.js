
window.onload = function(){
	var body = new create_div( );
		body.style( {"width":"100%", "height":"100%", "overflow":"hidden"} );

	var div = {};

	//div["database"] = new _indexedDB("babylon", "menu")

	div["database"] = new _indexedDB( "babylon", "menu", function() {
			start();
		},
		function( a ) {
			var list = {
				0:{ "name":"mousesens",		"value":3 },
				1:{ "name":"gamespeed",		"value":4 },
				2:{ "name":"gamebritness",	"value":50 },
				3:{ "name":"guisize",		"value":125 },
				4:{ "name":"gameside",		"value":1 },
				5:{ "name":"fpscomp",		"value":1 },
				6:{ "name":"mobhardcap",	"value":50 },
				7:{ "name":"difficulty",	"value":15 },
				8:{ "name":"mastersound",	"value":10 },
				9:{ "name":"fxsound",		"value":10 },
				10:{ "name":"musicsound",	"value":10 },
				11:{ "name":"gamesaved",	"value":false },
			}
					
			var count = 0;
			var b = function() {
				if ( typeof(list[count]) != "undefined") {
					a.set( list[count].name, list[count].value, b )
					count++;
				} else {
					a.run();
				}
			}
			b();
		} 
	);

	var start = function() {
				
		div[6] = new titlescreen( body );
	
		div[0] = new create_div( {'t':"canvas", 'p':body} );
			div[0].style( {"width":"100%", "height":"100%", "BColor":rgb(0,0,0)} );

		div[1] = new create_div( {'p':body} );
			div[1].style( {"width":"100%", "height":"100%", "position":"absolute", "top":0, "left":0, "pointerEvents":"none" } );
		
		div[2] = new mainmenu( div[1] );

		div[3] = new create_div( {'p':body} );
			div[3].style( {"width":"100%", "height":"100%", "position":"absolute", "top":0, "left":0, "pointerEvents":"none" } );

		div[4] = new gamemenu( div[3] );
		div[4].e["menu"].style( {"display":"none"} );

		div[5] = new gamegui( div[3] );

		if (BABYLON.Engine.isSupported()) {
			var engine = new BABYLON.Engine(div[0].div, true);

			scene = CreateScene(engine, div);
			scene.activeCamera.attachControl(div[0].div);

			engine.runRenderLoop(function () {
				scene.render();
			});

			window.addEventListener("resize", function () {
				engine.resize();
			});
		} 
	}
};
