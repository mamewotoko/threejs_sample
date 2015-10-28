//for rev. 74
var TEXT_COLOR = "#FFFFFF";
var TEXTURE_BACKGROUND_COLOR = "#00FF00";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight*0.7);
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
var data = [
    { name: "Sepal.Length", value: [0.361386591785369,-0.656588771286842,0.582029851306065,0.315487192903975] },
    { name: "Sepal.Width", value: [-0.0845225140645687,-0.730161434785027,-0.597910830100086,-0.319723103666128] },
    { name: "Petal.Length", value: [0.856670605949835,0.173372662795857,-0.0762360758209638,-0.479838986994634]},
    { name: "Petal.Width", value: [0.358289197151551,0.0754810199174639,-0.545831432020075,0.753657425264046]}
];

var cube_width = 5;
var cube_depth = 5;
var cube_height = 1;

//TODO: draw transparent y plane
for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].value.length; j++){
	var geometry = new THREE.BoxGeometry(cube_width, cube_height, cube_depth);
	var material = new THREE.MeshPhongMaterial({color: 0x00ff00});
	var box = new THREE.Mesh(geometry, material);
	var x = i*cube_width;
	var z = j*cube_depth;
	box.position.set(x, data[i].value[j]*10, z);
	scene.add(box);
    }
}
camera.position.set(0, 40, 30);

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}

render();
