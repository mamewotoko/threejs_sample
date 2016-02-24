var screen_size = [window.innerWidth, window.innerHeight/2];
var camera = new THREE.PerspectiveCamera(30, screen_size[0]/screen_size[1], 0.1, 1000);
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

//r_circle
var segments = 64;
var material = new THREE.LineBasicMaterial( { color: 0x888888 } );
var geometry = new THREE.CircleGeometry(r, segments);
// Remove center vertex
geometry.vertices.shift();
var rcircle =  new THREE.Line( geometry, material );
rcircle.rotation.x = Math.PI/2;
scene.add(rcircle);

//l_circle
material = new THREE.LineBasicMaterial( { color: "purple" } );
geometry = new THREE.CircleGeometry(l, segments);
geometry.vertices.shift();
var lcircle = new THREE.Line(geometry, material);
lcircle.rotation.x = Math.PI/2;
scene.add(lcircle);

var dtheta = Math.PI*2/6;
var q = [];
material = new THREE.LineBasicMaterial( { color: "aqua" } );
var o = new THREE.Vector3(0, 0, 0);
for(var i = 0; i < 6; i++){
    q.push(new THREE.Vector3(l*Math.cos(i*dtheta), 0, -l*Math.sin(i*dtheta)));
    geometry = new THREE.Geometry();
    geometry.vertices.push(o, q[i]);
    var ll = new THREE.Line(geometry, material);
    scene.add(ll);   
}

for(var i = 0; i < 6; i++){
    geometry = new THREE.Geometry();
    geometry.vertices.push(q[i], q[(i+1)%6]);
    var ll = new THREE.Line(geometry, material);
    scene.add(ll);
}

var b = l - l/(2*Math.sqrt(3));
var projh = Math.sqrt(triangle_height*triangle_height - b*b);

var v2rot = new THREE.Vector3(l*Math.cos(2*Math.PI/6), projh, -l*Math.sin(2*Math.PI/6));
var v0rot = new THREE.Vector3(l*Math.cos(2*Math.PI*3/6), projh, -l*Math.sin(2*Math.PI*3/6));
var v1rot = new THREE.Vector3(l*Math.cos(2*Math.PI*5/6), projh, -l*Math.sin(2*Math.PI*5/6));

put_marker(v2rot);
put_marker(v0rot);
put_marker(v1rot);

put_line(v0, v2rot);
put_line(v1, v2rot);
// console.log("1", v0.distanceTo(v2rot));
// console.log("2", v1.distanceTo(v2rot));

put_line(v1, v0rot);
put_line(v2, v0rot);

// console.log("3", v1.distanceTo(v0rot));
// console.log("4", v2.distanceTo(v0rot));

put_line(v2, v1rot);
put_line(v0, v1rot);

// console.log("5", v2.distanceTo(v1rot));
// console.log("6", v0.distanceTo(v1rot));

var v0out = new THREE.Vector3(l, projh, 0);
var v1out = new THREE.Vector3(l*Math.cos(2*Math.PI/3), projh, -l*Math.sin(2*Math.PI/3));
var v2out = new THREE.Vector3(l*Math.cos(2*Math.PI*2/3), projh, -l*Math.sin(2*Math.PI*2/3));

put_marker(v0out);
put_marker(v1out);
put_marker(v2out);

put_line(v0, v0out);
put_line(v1, v1out);
put_line(v2, v2out);

put_line(v0out, v2rot);
put_line(v0out, v1rot);

put_line(v1out, v2rot);
put_line(v1out, v0rot);

put_line(v2out, v0rot);
put_line(v2out, v1rot);

var v0up = new THREE.Vector3(v0.x, projh*2, v0.z);
var v1up = new THREE.Vector3(v1.x, projh*2, v1.z);
var v2up = new THREE.Vector3(v2.x, projh*2, v2.z);

put_marker(v0up);
put_marker(v1up);
put_marker(v2up);

put_line(v0up, v1up);
put_line(v1up, v2up);
put_line(v2up, v0up);

put_line(v0up, v0out);
put_line(v0up, v1rot);
put_line(v0up, v2rot);

put_line(v1up, v1out);
put_line(v1up, v0rot);
put_line(v1up, v2rot);

put_line(v2up, v2out);
put_line(v2up, v0rot);
put_line(v2up, v1rot);

console.log("v0", v0.distanceTo(v0out));
// console.log("v2up", v2up.distanceTo(v2out));
// console.log("v2up", v2up.distanceTo(v0rot));
// console.log("v2up", v2up.distanceTo(v1rot));

// console.log("v2up", v2up.distanceTo(v1rot));


// var path1center = new THREE.Vector3(v0.x, 0, v1.z);
// var path2center = new THREE.Vector3(v0.x, 0, v2.z);
// put_marker(path1center, "green");
// put_marker(path2center, "green");

// console.log("triangle_height", triangle_height);
// var geometry = new THREE.CylinderGeometry(triangle_height, triangle_height, 1, 32);
// var material = new THREE.MeshPhongMaterial({color: "white", transparent: true, opacity: 0.5});
// var path1 = new THREE.Mesh(geometry, material);
// path1.position.copy(path1center);
// path1.rotation.x = Math.PI/2;
// scene.add(path1);

// var path2 = new THREE.Mesh(geometry, material);
// path2.position.copy(path2center);
// path2.rotation.x = Math.PI/2;
// scene.add(path2);

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
