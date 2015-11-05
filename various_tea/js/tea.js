//for rev. 74
var P = {
    CAN_COLOR: "#0000FF",
    TEXT_COLOR: "#FFFFFF",
    CAMERA_X: 0,
    CAMERA_Y: 40,
    CAMERA_Z: 30
};

var scene = null;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = null;

function init(){
    control = new THREE.OrbitControls(camera, renderer.domElement);
    scene = new THREE.Scene();
    var light = new THREE.AmbientLight(0x888888);
    scene.add(light);
    light = new THREE.DirectionalLight(0x888888, 1.0);
    light.position.set(10, 10, 0);
    scene.add(light);

    var canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;

    var xc = canvas.getContext("2d");
    xc.fillStyle=P.CAN_COLOR;
    xc.fillRect(0, 0, canvas.width, canvas.height);
    xc.fillStyle=P.TEXT_COLOR;
    //macでない場合どうなる?
    xc.font = "18pt ヒラギノ角ゴ";
    xc.fillText("お茶", 0, 22);

    //2. 平らな面はテクスチャをやめる
    geometry = new THREE.CylinderGeometry(10, 10, 32, 128);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var side_material = new THREE.MeshPhongMaterial({ map: texture });
    var end_material = new THREE.MeshPhongMaterial({ color: P.CAN_COLOR });
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

    camera.position.set(P.CAMERA_X, P.CAMERA_Y, P.CAMERA_Z);
    render();
}

var gui = new dat.GUI();
for(var name in P){
    if(name.endsWith("_COLOR")){
	gui.addColor(P, name).onChange(function(value){
	    console.log("finish change");
	    init();
	});
    }
    else {
	gui.add(P, name).onFinishChange(function(value){
	    console.log("finish change");
	    init();
	});
    }
}
init();

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}
