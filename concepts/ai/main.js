
window.onload = function(){
	var body = new create_div( );
	body.style( {"width":"100%", "height":"100%", "overflow":"hidden"} );

		var canvas = new create_div( {'t':"canvas", 'p':body} );
		canvas.style( {"width":"100%", "height":"100%"} );
		
		var div = [];
		div[0] = new create_div( {'p':body} );
		div[0].style( {"width":"calc( 100% - 20px)", "height":"100px", "position":"absolute", "top":0, "left":0, "BColor":rgb(255,0,0), "overflow":"hidden", 'P':"10px"} );
		div[0].transition( {"height":0.5} );
		div[0].div.onclick = function() {
			div[0].off = ( (isset(div.off))? div.off : 100 );
			div[0].style( {"height":(div.off = ((div.off == 10)?100:10))+"px"} );
		};
	
		div[1] = new create_div( {'p':body} );
		div[1].style( {"width":"10px", "height":"10px", "position":"absolute", "top":"100px", "left":"100px", "BColor":rgb(255,255,0)} );
		
    if (!BABYLON.Engine.isSupported()) {
        window.alert('Browser not supported');
    } else {
        // Babylon
        var engine = new BABYLON.Engine(canvas.div, true);

        //Create Rotation/Scaling scene
        scene = CreateScene(engine, div);
        scene.activeCamera.attachControl(canvas.div);

        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    } 

};
