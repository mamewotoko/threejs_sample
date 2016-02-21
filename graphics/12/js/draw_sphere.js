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

put_line(v1, v2, "green");
put_line(v2, v3, "red");
put_line(v3, v4, "yellow");
put_line(v4, v5, "pink");
put_line(v5, v1, "purple");
pentagon_height = r*(1-Math.cos(2*theta));

//var pos = [v1, v2, v3, v4, v5];
var pos = [v1, v2];
var geometry = new THREE.SphereGeometry(l, 8, 8);
//var material = new THREE.MeshPhongMaterial({color: "white", transparent: true, opacity: 0.5});
var material = new THREE.MeshPhongMaterial({color: "white", wireframe:true});
for(var i = 0; i < pos.length; i++){
    var m = new THREE.Mesh(geometry, material);
    m.position.copy(pos[i]);
    scene.add(m);
}

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

function put_line(v1, v2, color){
    if(!color){
	color = 0xff00ff;
    }
    var material = new THREE.LineBasicMaterial({color: color });
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

//2x2
function multiply(mat, vec){
    return [mat[0][0]*vec[0]+mat[0][1]*vec[1], mat[1][0]*vec[0]+mat[1][1]*vec[1]];
}

function rotation_matrix(theta){
    return [[Math.cos(theta), -Math.sin(theta)],
	    [Math.sin(theta), Math.cos(theta)]];
}
