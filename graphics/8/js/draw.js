var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = new THREE.OrbitControls(camera, renderer.domElement);

var l = 10;

var pos = l/Math.sqrt(2);

var v1 = new THREE.Vector3(pos, 0, 0);
var v2 = new THREE.Vector3(0, 0, -pos);
var v3 = new THREE.Vector3(-pos, 0, 0);
var v4 = new THREE.Vector3(0, 0, pos);

var v5 = new THREE.Vector3(0, pos, 0);
var v6 = new THREE.Vector3(0, -pos, 0);

put_marker(v1);
put_marker(v2);
put_marker(v3);
put_marker(v4);
put_marker(v5);
put_marker(v6);

put_line(v1, v2);
put_line(v2, v3);
put_line(v3, v4);
put_line(v4, v1);
put_line(v5, v1);
put_line(v5, v2);
put_line(v5, v3);
put_line(v5, v4);
put_line(v6, v1);
put_line(v6, v2);
put_line(v6, v3);
put_line(v6, v4);

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
