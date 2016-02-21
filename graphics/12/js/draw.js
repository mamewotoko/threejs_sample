var screen_size = [window.innerWidth, window.innerHeight/2];
var camera = new THREE.PerspectiveCamera(100, screen_size[0]/screen_size[1], 0.1, 1000);
var screen_canvas = document.getElementById("screen");
var renderer = new THREE.WebGLRenderer({ canvas: screen_canvas });
renderer.setSize(screen_size[0], screen_size[1]);
var control = new THREE.OrbitControls(camera, renderer.domElement);
var scene = new THREE.Scene();

//                 v1
//          v2        
//
//   ------------+------ v0
// 
//          v3
//                 v4

var display_sphere = false;
var display_circle = false;

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
var pentagon_height = r*(1-Math.cos(2*theta));

var upper_group = new THREE.Object3D();
upper_group.rotation.y = Math.PI/5;
scene.add(upper_group);

var v0 = new THREE.Vector3(r, 0, 0);
var v1 = new THREE.Vector3(r*Math.cos(theta), 0, -r*Math.sin(theta));
var v2 = new THREE.Vector3(r*Math.cos(theta*2), 0, -r*Math.sin(theta*2));
var v3 = new THREE.Vector3(r*Math.cos(theta*3), 0, -r*Math.sin(theta*3));
var v4 = new THREE.Vector3(r*Math.cos(theta*4), 0, -r*Math.sin(theta*4));

put_marker(v0, "orange", "1-v0");
put_marker(v1, "orange", "1-v1");
put_marker(v2, "orange", "1-v2");
put_marker(v3, "orange", "1-v3");
put_marker(v4, "orange", "1-v4");

put_marker(v0, "orange", "6-v0", upper_group);
put_marker(v1, "orange", "6-v1", upper_group);
put_marker(v2, "orange", "6-v2", upper_group);
put_marker(v3, "orange", "6-v3", upper_group);
put_marker(v4, "orange", "6-v4", upper_group);

// put_line(v0, v1, "purple");
// put_line(v1, v2, "green");
// put_line(v2, v3, "red");
// put_line(v3, v4, "yellow");
// put_line(v4, v0, "pink");

put_line(v0, v1);
put_line(v1, v2);
put_line(v2, v3);
put_line(v3, v4);
put_line(v4, v0);

put_line(v0, v1, undefined, upper_group);
put_line(v1, v2, undefined, upper_group);
put_line(v2, v3, undefined, upper_group);
put_line(v3, v4, undefined, upper_group);
put_line(v4, v0, undefined, upper_group);

var pos = [v0, v1, v2, v3, v4];
var geometry = new THREE.SphereGeometry(l, 8, 8);
var material = new THREE.MeshPhongMaterial({color: "white", wireframe:true});
for(var i = 0; i < pos.length; i++){
    var m = new THREE.Mesh(geometry, material);
    m.position.copy(pos[i]);
    m.visible = display_sphere;
    scene.add(m);
}

var pathr = r*(Math.cos(1*theta)-Math.cos(2*theta));

var rotate_goem = new THREE.CylinderGeometry(pathr, pathr, 0.5, 64);
var material = new THREE.MeshPhongMaterial({color: "white", side: THREE.DoubleSide, transparent: true, opacity: 0.5});
var path2 = new THREE.Mesh(rotate_goem, material);
var path5 = new THREE.Mesh(rotate_goem, material);
path2.rotation.x = Math.PI/2;
path5.rotation.x = Math.PI/2;

path2.visible = display_circle;
path5.visible = display_circle;

var path2center = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(1*theta));
var path5center = new THREE.Vector3(r*Math.cos(2*theta), 0, -r*Math.sin(4*theta));
path2.position.copy(path2center);
scene.add(path2);

// put_marker(path2center, "yellow");
// put_marker(path5center, "yellow");

// path5.position.copy(path5center);
// scene.add(path5);

// colorlist = ["red", "green", "purple", "pink"];
// for(var i = 1; i < 5; i++){
//     var color = colorlist[i-1];
//     var rot1 = rotation_matrix(i*theta);
//     var path1center2d = multiply(rot1, [path2center.x, path2center.z]);
//     var path0center2d = multiply(rot1, [path5center.x, path5center.z]);
    
//     var path1center = new THREE.Vector3(path1center2d[0], 0, path1center2d[1]);
//     var path0center = new THREE.Vector3(path0center2d[0], 0, path0center2d[1]);

//     put_marker(path1center, color);
//     put_marker(path0center, color);
  
//     var path0 = new THREE.Mesh(rotate_goem, material);
//     var path1 = new THREE.Mesh(rotate_goem, material);

//     path0.visible = display_circle;
//     path1.visible = display_circle;

//     path0.name = color+"-0";
//     path1.name = color+"-1";

//     path0.rotation.copy(new THREE.Euler(-Math.PI/2, 0, -i*theta, 'XZY'));
//     path1.rotation.copy(new THREE.Euler(-Math.PI/2, 0, -i*theta, 'XZY'));
    
//     path1.position.copy(path1center);
//     scene.add(path1);    

//     path0.position.copy(path0center);
//     scene.add(path0);
// }

var x2 = -r*(Math.sin(4*theta)*Math.cos(theta/2)-Math.cos(4*theta)*Math.sin(theta/2))/Math.sin(theta/2);

var projr = -r*(Math.sin(4*theta)*Math.cos(theta/2)-Math.cos(4*theta)*Math.sin(theta/2))/Math.sin(theta/2);
var projl = Math.sqrt((x2-r*Math.cos(theta))*(x2-r*Math.cos(theta)) + r*Math.sin(theta)*r*Math.sin(theta));
// shoulder
var proja = r*(Math.cos(theta)-Math.cos(2*theta));
var projb = projl - proja;
// proja*proja = projb*projb + projh*projh
var projh = Math.sqrt(proja*proja - projb*projb);

//var colors = [ 0xFF0000, 0xdd0000, 0x990000, 0x660000, 0x330000 ];
for(var i = 0; i < 5; i++){
    var projv2_1_bottom = new THREE.Vector3(projr*Math.cos(i*theta), 0, -projr*Math.sin(i*theta));
    var projv2_1_line = new THREE.Vector3(projr*Math.cos(i*theta), projh, -projr*Math.sin(i*theta));

    put_marker(projv2_1_line, undefined, "2-v"+i);
    put_line(pos[i], projv2_1_line);

    put_marker(yminus(projv2_1_line), undefined, "5-v"+i, upper_group);
    put_line(pos[i], yminus(projv2_1_line), undefined, upper_group);

    // geometry = new THREE.Geometry();
    // geometry.vertices.push(projv2_1_bottom);
    // geometry.vertices.push(projv2_1_line);

    // material = new THREE.LineBasicMaterial({color: "darkgreen", linewidth: 3 });
    // var line = new THREE.Line(geometry, material);
    //scene.add(line);
    //put_line(projv2_1_line, projv2_1_bottom, "darkgreen");
}

var rot = Math.PI-Math.acos(projb/proja);
var rot_center = new THREE.Vector3();
rot_center.addVectors(v2,v3).multiplyScalar(0.5);
var rpos1 = new THREE.Vector3(pentagon_height*Math.cos(rot), pentagon_height*Math.sin(rot), 0)
    .add(rot_center);
put_marker(rpos1, "orange", "2-v0");
var obj = scene.getObjectByName("2-v2");
put_line(rpos1, obj.position);
obj = scene.getObjectByName("2-v3");
put_line(rpos1, obj.position);


put_line(rpos1, obj.position);
var lineto = [[3,4],[4,0],[0,1],[1,2]];
for(var i = 1; i < 5; i++){
    var rotmat = rotation_matrix(-i*theta);
    var rottop = multiply(rotmat, [rpos1.x, rpos1.z]);
    var p = new THREE.Vector3(rottop[0], rpos1.y, rottop[1]);
    put_marker(p, undefined, "3-v"+i);
    
    var o1 = scene.getObjectByName("2-v"+lineto[i-1][0]);
    put_line(p, o1.position);
    var o2 = scene.getObjectByName("2-v"+lineto[i-1][1]);
    put_line(p, o2.position);
    
}
var top_y = rpos1.y + projh;
upper_group.position.y = top_y;

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
