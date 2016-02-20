var scene = null;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = new THREE.OrbitControls(camera, renderer.domElement);
scene = new THREE.Scene();
var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(10, 10, 0);
scene.add(light);

var l = 10;
var r = l/Math.sqrt(3);
var theta = 2*Math.PI/3;
var v1 = new THREE.Vector3(r, 0, 0);
var v2 = new THREE.Vector3(r*Math.cos(theta), 0, -r*Math.sin(theta));
var v3 = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(2*theta));
var v4 = new THREE.Vector3(0, Math.sqrt(2)*r, 0);
console.log("v1", v1);
console.log("v2", v2);
console.log("v3", v3);
console.log("v4", v4);

put_marker(v1);
put_marker(v2);
put_marker(v3);
put_marker(v4);

// console.log("v1-v2", v1.distanceTo(v2));
// console.log("v1-v3", v1.distanceTo(v3));
// console.log("v1-v3", v1.distanceTo(v4));
// console.log("v2-v3", v2.distanceTo(v3));
// console.log("v2-v3", v2.distanceTo(v4));
// console.log("v3-v4", v3.distanceTo(v4));

put_line(v1, v2);
put_line(v1, v3);
put_line(v1, v4);

put_line(v2, v3);
put_line(v2, v4);
put_line(v3, v4);

camera.position.set(0, 10, 10);
var axes = buildAxes(10000);
scene.add(axes);
render();

function put_marker(v){
    var marker_len = 1;
    var geometry = new THREE.BoxGeometry(marker_len, marker_len, marker_len);
    var material = new THREE.MeshPhongMaterial({ color: "orange"});
    var marker = new THREE.Mesh(geometry, material);
    marker.position.copy(v);
    scene.add(marker);
}

function put_line(v1, v2){
    var material = new THREE.LineBasicMaterial({
	color: 0xff00ff
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(v1, v2);
    var line = new THREE.Line( geometry, material );
    scene.add(line);    
}

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}
