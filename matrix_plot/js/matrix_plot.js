//for rev. 74
var TEXT_COLOR = "#FFFFFF";
var TEXTURE_BACKGROUND_COLOR = "#00FF00";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(10, 10, 0);
scene.add(light);

//Sample: R
// write.csv(prcomp(iris[,1:4])$rotation, file="pca.csv")
//"","PC1","PC2","PC3","PC4"v
var colname = ["PC1", "PC2", "PC3", "PC4"];
var data = [
    { name: "Sepal.Length", value: [0.361386591785369,-0.656588771286842,0.582029851306065,0.315487192903975] },
    { name: "Sepal.Width", value: [-0.0845225140645687,-0.730161434785027,-0.597910830100086,-0.319723103666128] },
    { name: "Petal.Length", value: [0.856670605949835,0.173372662795857,-0.0762360758209638,-0.479838986994634]},
    { name: "Petal.Width", value: [0.358289197151551,0.0754810199174639,-0.545831432020075,0.753657425264046]}
];

var cube_width = 4*5;
var cube_depth = 4*5;
var cube_height = 1;

function drawTextOnCanvas(text){
    var canvas = document.createElement("canvas");
    canvas.width = 80*2;
    canvas.height = 32*2;
    var xc = canvas.getContext("2d");
    //xc.fillStyle="#FFFFFF";
    //xc.fillRect(0, 0, canvas.width, canvas.height);
    xc.fillStyle="#FFFFFF";
    //macでない場合どうなる?
    xc.font = "16pt ヒラギノ角ゴ";
    xc.fillText(text, 10, canvas.height/2+10);
    return canvas;
}

for(var i = 0; i < colname.length; i++){
    //console.log("i", i);
    var canvas = drawTextOnCanvas(colname[i]);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var material = new THREE.SpriteMaterial({map: texture});
    var sprite = new THREE.Sprite(material);
    
    sprite.scale.set(10, 10, 1);
    sprite.position.set(cube_width*i+cube_width/2, 0, -10);
    scene.add(sprite);
}

for(var i = 0; i < data.length; i++){
    //console.log("i", i);
    var canvas = drawTextOnCanvas(data[i].name);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var material = new THREE.SpriteMaterial({map: texture});
    var sprite = new THREE.Sprite(material);
    
    sprite.scale.set(10, 10, 1);
    sprite.position.set(-10, 0, cube_width*i+cube_depth/2);
    scene.add(sprite);
}

for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].value.length; j++){
	var geometry = new THREE.BoxGeometry(cube_width, cube_height, cube_depth);
	var material = new THREE.MeshPhongMaterial({color: 0x00ff00, transparent: true, opacity: 0.7});
	var box = new THREE.Mesh(geometry, material);
	var x = i*cube_width + cube_width/2;
	var z = j*cube_depth + cube_depth/2;
	box.position.set(x, data[i].value[j]*25, z);
	scene.add(box);

	//abs
	// geometry = new THREE.BoxGeometry(cube_width, cube_height, cube_depth);
	// material = new THREE.MeshPhongMaterial({color: 0xffff00, transparent: true, opacity: 0.7});
	// box = new THREE.Mesh(geometry, material);
	// var x = i*cube_width + cube_width/2;
	// var z = j*cube_depth + cube_depth/2;
	// y = Math.abs(data[i].value[j]*10);
	// box.position.set(x, y, -z);
	
	// scene.add(box);
    }
}

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}

camera.position.set(0, 40, 30);
var axes = buildAxes(10000);
scene.add(axes);
render();
