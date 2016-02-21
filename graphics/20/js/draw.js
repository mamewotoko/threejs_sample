var screen_size = [window.innerWidth, window.innerHeight/2];
var camera = new THREE.PerspectiveCamera(100, screen_size[0]/screen_size[1], 0.1, 1000);
var screen_canvas = document.getElementById("screen");
var renderer = new THREE.WebGLRenderer({ canvas: screen_canvas });
renderer.setSize(screen_size[0], screen_size[1]);
var control = new THREE.OrbitControls(camera, renderer.domElement);
var scene = new THREE.Scene();
var axes = buildAxes(10000);
scene.add(axes);

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(0, 10, 10);
scene.add(light);

//triangle
var l = 10;
var theta = 2*Math.PI/3;

var r = l/Math.sqrt(3);
var triangle_height = r*(1-Math.cos(theta));

var v0 = new THREE.Vector3(r, 0, 0);
var v1 = new THREE.Vector3(r*Math.cos(theta), 0, -r*Math.sin(theta));
var v2 = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(2*theta));

put_marker(v0);
put_marker(v1);
put_marker(v2);
put_line(v0, v1);
put_line(v1, v2);
put_line(v2, v0);

var path1center = new THREE.Vector3(v0.x, 0, v1.z);
var path2center = new THREE.Vector3(v0.x, 0, v2.z);
put_marker(path1center, "green");
put_marker(path2center, "green");

console.log("triangle_height", triangle_height);
var geometry = new THREE.CylinderGeometry(triangle_height, triangle_height, 1, 32);
var material = new THREE.MeshPhongMaterial({color: "white", transparent: true, opacity: 0.5});
var path1 = new THREE.Mesh(geometry, material);
path1.position.copy(path1center);
path1.rotation.x = Math.PI/2;
scene.add(path1);

var path2 = new THREE.Mesh(geometry, material);
path2.position.copy(path2center);
path2.rotation.x = Math.PI/2;
scene.add(path2);

camera.position.set(0, 10, 10);
render();

function put_marker(v, color, name, parent){
    var marker_len = 1;
    if(!color){
	color = "orange";
    }
    var geometry = new THREE.BoxGeometry(marker_len, marker_len, marker_len);
    var material = new THREE.MeshPhongMaterial({ color: color });
    var marker = new THREE.Mesh(geometry, material);
    if(name){
	marker.name = name;
    }
    marker.position.copy(v);
    if(parent){
	parent.add(marker);
    }
    else {
	scene.add(marker);
    }
}

function put_line(v1, v2, color, parent){
    if(!color){
	color = 0xff00ff;
    }
    var material = new THREE.LineBasicMaterial({color: color });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(v1, v2);
    var line = new THREE.Line( geometry, material );
    if(parent){
	parent.add(line);
    }
    else {
	scene.add(line);
    }
}

function render() {
    requestAnimationFrame(render);
    control.update();
    renderer.render(scene, camera);
}

//2x2
function multiply(mat, vec){
    return [mat[0][0]*vec[0]+mat[0][1]*vec[1], mat[1][0]*vec[0]+mat[1][1]*vec[1]];
}

function rotation_matrix(theta){
    return [[Math.cos(theta), -Math.sin(theta)],
	    [Math.sin(theta), Math.cos(theta)]];
}

function yminus(v){
    return new THREE.Vector3(v.x, -v.y, v.z);
}
