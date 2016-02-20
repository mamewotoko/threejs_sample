var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var control = new THREE.OrbitControls(camera, renderer.domElement);
var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(0, 10, 10);
scene.add(light);

var axes = buildAxes(10000);
scene.add(axes);

var l = 10;
var c = 1-Math.cos(2*Math.PI/5);
var s = Math.sin(2*Math.PI/5);
var r = l/Math.sqrt(c*c + s*s);

var theta = Math.PI*2/5;
var v1 = new THREE.Vector3(r, 0, 0);
var v2 = new THREE.Vector3(r*Math.cos(theta), 0, -r*Math.sin(theta));
var v3 = new THREE.Vector3(r*Math.cos(theta*2), 0, -r*Math.sin(theta*2));
var v4 = new THREE.Vector3(r*Math.cos(theta*3), 0, -r*Math.sin(theta*3));
var v5 = new THREE.Vector3(r*Math.cos(theta*4), 0, -r*Math.sin(theta*4));

put_marker(v1);
put_marker(v2);
put_marker(v3);
put_marker(v4);
put_marker(v5);

put_line(v1, v2);
put_line(v2, v3);
put_line(v3, v4);
put_line(v4, v5);
put_line(v5, v1);
pentagon_height = r*(1-Math.cos(2*theta));

var rotate_goem = new THREE.CylinderGeometry(pentagon_height, pentagon_height, 1, 64);
var material = new THREE.MeshPhongMaterial({color: "pink", side: THREE.DoubleSide, transparent: true, opacity: 0.5});

//var path_material = new THREE.LineBasicMaterial({color: "pink" });
var path = new THREE.Mesh(rotate_goem, material);
path.rotation.x = Math.PI/2;
path.position.set(r*Math.cos(2*theta), 0, 0);
scene.add(path);

put_marker(path.position);
var pos = new THREE.Vector3();
pos.copy(path.position);
pos.add(new THREE.Vector3(-pentagon_height, 0, 0));
put_marker(pos);

var pathr = r*(Math.cos(1*theta)-Math.cos(2*theta));

var rotate_goem = new THREE.CylinderGeometry(pathr, pathr, 1, 64);
var material = new THREE.MeshPhongMaterial({color: "yellow", side: THREE.DoubleSide, transparent: true, opacity: 0.5});
var path2 = new THREE.Mesh(rotate_goem, material);
var path5 = new THREE.Mesh(rotate_goem, material);
path2.rotation.x = Math.PI/2;
path5.rotation.x = Math.PI/2;

var path2center = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(1*theta));
var path5center = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(4*theta));
path2.position.copy(path2center);
scene.add(path2);

path5.position.copy(path5center);
scene.add(path5);

// var path2 = path.clone();
// path2.rotation.y = theta;
// var pos2 = v4.clone().add(v5).multiplyScalar(0.5);
// path2.position.copy(pos2);
// scene.add(path2);

// var path3 = path.clone();
// path3.rotation.y = theta*2;
// var pos3 = v5.clone().add(v1).multiplyScalar(0.5);
// path3.position.copy(pos3);
// scene.add(path3);

camera.position.set(0, 10, 10);

render();

function put_marker(v, color){
    var marker_len = 1;
    if(!color){
	color = "orange";
    }
    var geometry = new THREE.BoxGeometry(marker_len, marker_len, marker_len);
    var material = new THREE.MeshPhongMaterial({ color: color });
    var marker = new THREE.Mesh(geometry, material);
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
