var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = new THREE.OrbitControls(camera, renderer.domElement);

var l = 10;
var v1 = new THREE.Vector3(0, 0, 0);
var v2 = new THREE.Vector3(l, 0, 0);
var v3 = new THREE.Vector3(l, 0, l);
var v4 = new THREE.Vector3(0, 0, l);
var v5 = new THREE.Vector3(0, l, 0);
var v6 = new THREE.Vector3(l, l, 0);
var v7 = new THREE.Vector3(l, l, l);
var v8 = new THREE.Vector3(0, l, l);

console.log("v1", v1);
console.log("v2", v2);
console.log("v3", v3);
console.log("v4", v4);
console.log("v5", v5);
console.log("v6", v6);
console.log("v7", v7);
console.log("v8", v8);

put_line(v1, v2);
put_line(v2, v3);
put_line(v3, v4);
put_line(v4, v1);
put_line(v1, v5);
put_line(v2, v6);
put_line(v3, v7);
put_line(v4, v8);
put_line(v5, v6);
put_line(v6, v7);
put_line(v7, v8);
put_line(v8, v5);

put_marker(v1);
put_marker(v2);
put_marker(v3);
put_marker(v4);
put_marker(v5);
put_marker(v6);
put_marker(v7);
put_marker(v8);

camera.position.set(0, 15, 15);
var axes = buildAxes(10000);
scene.add(axes);

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(10, 10, 0);
scene.add(light);

render();

function put_marker(v){
    var marker_len = 1;
    var geometry = new THREE.BoxGeometry(marker_len, marker_len, marker_len);
    var material = new THREE.MeshPhongMaterial({ color: "orange" });
    var marker = new THREE.Mesh(geometry, material);
    console.log("color:", material.color);
    marker.position.copy(v);
    scene.add(marker);
}

function put_line(v1, v2){
    var material = new THREE.LineBasicMaterial({color: 0xff00ff });
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
