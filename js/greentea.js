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

var canvas = document.createElement("canvas");
canvas.width = 64;
canvas.height = 32;
//canvas.width = 16;
//canvas.height = 16;
console.log("canvas", canvas);
var xc = canvas.getContext("2d");
xc.fillStyle=TEXTURE_BACKGROUND_COLOR;
xc.fillRect(0, 0, canvas.width, canvas.height);
xc.fillStyle=TEXT_COLOR;
//macでない場合どうなる?
xc.font = "18pt ヒラギノ角ゴ";
xc.fillText("お茶", 0, 22);

//1. 全面にテクスチャーをはった場合
//
var geometry = new THREE.CylinderGeometry(10, 10, 32, 128);
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
var material = new THREE.MeshPhongMaterial({ map: texture });
//var material = end_material;
var obj = new THREE.Mesh(geometry, material);
obj.position.x -= 15;
obj.rotation.y = -Math.PI/6;
scene.add(obj);

//2. 平らな面はテクスチャをやめる
geometry = new THREE.CylinderGeometry(10, 10, 32, 128);
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
var side_material = new THREE.MeshPhongMaterial({ map: texture });
var end_material = new THREE.MeshPhongMaterial({ color: TEXTURE_BACKGROUND_COLOR });
material = new THREE.MeshFaceMaterial([side_material, end_material]);

//後ろ radialSegments*2個は end_material
//それ以外は side_material
for(var i = 0; i < geometry.faces.length-geometry.parameters.radialSegments*2; i++){
    geometry.faces[i].materialIndex = 0;
}
for(var i = geometry.faces.length-geometry.parameters.radialSegments*2; i < geometry.faces.length; i++){
    geometry.faces[i].materialIndex = 1;
}
obj = new THREE.Mesh(geometry, material);

obj.position.x += 15;
obj.rotation.y = -Math.PI/6;
scene.add(obj);

camera.position.set(0, 40, 30);

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}
render();
