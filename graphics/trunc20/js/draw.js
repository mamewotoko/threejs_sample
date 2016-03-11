var screen_size = [window.innerWidth, window.innerHeight*3/4];
var camera = new THREE.PerspectiveCamera(30, screen_size[0]/screen_size[1], 0.1, 1000);
var screen_canvas = document.getElementById("screen");
screen_canvas.width = screen_size[0]
screen_canvas.height = screen_size[1]
var renderer = new THREE.WebGLRenderer({ canvas: screen_canvas });
renderer.setSize(screen_size[0], screen_size[1]);
var control = new THREE.OrbitControls(camera, renderer.domElement);
var scene = new THREE.Scene();
var axes = buildAxes(10000);
scene.add(axes);

var axes = buildAxes(10000);
scene.add(axes);

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(0, 50, 50);
scene.add(light);

//triangle
var l = 10;
var r6 = l;
var h6 = 2*l*Math.sin(Math.PI/3);
var theta6 = 2*Math.PI/6;

var v0 = new THREE.Vector3(r6, 0, 0);
var v1 = new THREE.Vector3(r6*Math.cos(theta6), 0, -r6*Math.sin(theta6));
var v2 = new THREE.Vector3(r6*Math.cos(2*theta6), 0, -r6*Math.sin(2*theta6));
var v3 = new THREE.Vector3(r6*Math.cos(3*theta6), 0, -r6*Math.sin(3*theta6));
var v4 = new THREE.Vector3(r6*Math.cos(4*theta6), 0, -r6*Math.sin(4*theta6));
var v5 = new THREE.Vector3(r6*Math.cos(5*theta6), 0, -r6*Math.sin(5*theta6));

put_marker(v0);
put_marker(v1);
put_marker(v2);
put_marker(v3);
put_marker(v4);
put_marker(v5);

put_line(v0, v1);
put_line(v1, v2);
put_line(v2, v3);
put_line(v3, v4);
put_line(v4, v5);
put_line(v5, v0);

var upoffset = new THREE.Vector3(0, 0, -h6);
var up0 = v0.clone().add(upoffset);
var up1 = v1.clone().add(upoffset);
var up2 = v2.clone().add(upoffset);
var up3 = v3.clone().add(upoffset);
var up4 = v4.clone().add(upoffset);
var up5 = v5.clone().add(upoffset);

put_line(up0, up1, "yellow");
put_line(up1, up2, "yellow");
put_line(up2, up3, "yellow");
put_line(up3, up4, "yellow");
put_line(up4, up5, "yellow");
put_line(up5, up0, "yellow");

var right1 = v0.clone().add(new THREE.Vector3(l, 0, 0));
var right0 = right1.clone().add(new THREE.Vector3(l*Math.cos(-Math.PI/3), 0, -l*Math.sin(-Math.PI/3)));
var right5 = right0.clone().add(new THREE.Vector3(l*Math.cos(-2*Math.PI/3), 0, -l*Math.sin(-2*Math.PI/3)));
var right4 = v5.clone().add(new THREE.Vector3(l*Math.cos(-Math.PI/3), 0, -l*Math.sin(-Math.PI/3)));
put_line(right1, right0, "yellow");
put_line(right0, right5, "yellow");
put_line(right4, right5, "yellow");
put_line(v5, right4, "yellow");

var left2 = v3.clone().add(new THREE.Vector3(-l, 0, 0));
var left3 = left2.clone().add(new THREE.Vector3(l*Math.cos(-2*Math.PI/3), 0, -l*Math.sin(-2*Math.PI/3)));
var left4 = left3.clone().add(new THREE.Vector3(l*Math.cos(-Math.PI/3), 0, -l*Math.sin(-Math.PI/3)));
var left5 = left4.clone().add(new THREE.Vector3(l, 0, 0));

put_line(v3, left2, "yellow");
put_line(left2, left3, "yellow");
put_line(left3, left4, "yellow");
put_line(left4, left5, "yellow");
put_line(left5, v4, "yellow");

var bottom4 = v5.clone().add(new THREE.Vector3(l*Math.cos(-2*Math.PI/5), 0, -l*Math.sin(-2*Math.PI/5)));
var bottom2 = v4.clone().add(new THREE.Vector3(l*Math.cos(-3*Math.PI/5), 0, -l*Math.sin(-3*Math.PI/5)));
var bottom_offsetz = l*Math.cos(3*Math.PI/10);
var bottom3 = new THREE.Vector3(0, 0, bottom2.z+bottom_offsetz);

put_line(v4, bottom2, "green");
put_line(v5, bottom4, "green");
put_line(bottom2, bottom3, "green");
put_line(bottom3, bottom4, "green");

//pink
var leftup1 = v0.clone().add(new THREE.Vector3(l*Math.cos(Math.PI/15), 0, -l*Math.sin(Math.PI/15)));
var leftup2 = leftup1.clone().add(new THREE.Vector3(l*Math.cos(Math.PI/15+Math.PI*2/5), 0, -l*Math.sin(Math.PI/15+Math.PI*2/5)));
var leftup3 = v1.clone().add(new THREE.Vector3(l*Math.cos(Math.PI*3/5-Math.PI/3), 0, -l*Math.sin(Math.PI*3/5-Math.PI/3)));

put_line(v0, leftup1, "pink");
put_line(leftup1, leftup2, "pink");
put_line(leftup2, leftup3, "pink");
put_line(v1, leftup3, "pink");

//projected leftup3 moves
//y = Math.tan(Math.PI/6)*x + l*(Math.sin(Math.PI/3)+Math.sin(Math.PI*4/15) -Math.tan(Math.PI/6)*Math.cos(Math.PI/3)-Math.tan(Math.PI/6)*Math.cos(Math.PI*4/15))
// x = l (=r)
// y = xxx
var up_projected0_y = Math.tan(Math.PI/6)*l +
    l*(Math.sin(Math.PI/3)+Math.sin(Math.PI*4/15)
       -Math.tan(Math.PI/6)*Math.cos(Math.PI/3)-Math.tan(Math.PI/6)*Math.cos(Math.PI*4/15))

var tmps = l*Math.sin(Math.PI/3)
var tmpy = up_projected0_y - l*Math.sin(Math.PI/3)
var h1 = Math.sqrt(tmps*tmps-tmpy*tmpy);
var up_h1_0 = new THREE.Vector3(r6, h1, -up_projected0_y); 
put_marker(up_h1_0);
put_line(v1, up_h1_0);

var pup = draw_hexagon(v2, v1, up_h1_0);

// pentagon
//pen 0, 1, 2, 3, 4
//pen3 = up_h1_0
var up_pen3 = up_h1_0;

var pright = draw_pentagon(up_pen3, v1, v0);

var pright_bottom = draw_hexagon(pright[3], v0, v5);

var pbottom = draw_pentagon(pright_bottom[3], v5, v4);

var pleft = draw_hexagon(pbottom[3], v4, v3);

var pleft_up = draw_pentagon(pleft[3], v3, v2);

var p2_right_up = draw_hexagon(pup[3], pup[2], pright[4]);
var p2_right = draw_hexagon(pright[4], pright[3], pright_bottom[5]);

var p2_bottom_right = draw_hexagon(pright_bottom[4], pright_bottom[3], pbottom[4]);
var p2_bottom_left = draw_hexagon(pbottom[4], pbottom[3], pleft[5]);

var p2_left = draw_hexagon(pleft[4], pleft[3], pleft_up[4]);
var p2_left_up = draw_hexagon(pleft_up[4], pleft_up[3], pup[4]);

var p2_pentagon_right = draw_pentagon(p2_right[3], p2_right[2], pright_bottom[4]);

var p2_pentagon_left = draw_pentagon(p2_bottom_left[3], p2_bottom_left[2], pleft[4]);

var p2_bottom_up = draw_pentagon(p2_left_up[3], p2_left_up[2], pup[3]);

// put_marker(p2_bottom_left[4], "red");
// put_marker(p2_bottom_left[3], "green");
// put_marker(pleft[4], "blue");

camera.position.set(0, 80, 80);
render();

function draw_pentagon(p1, p2, p3){
    var v2_3 = p3.clone().sub(p2);
    var v2_1 = p1.clone().sub(p2);

    var ratio = 2*Math.cos(Math.PI/5);
    var p4 = p1.clone().add(v2_3.clone().multiplyScalar(ratio));
    var p5 = p3.clone().add(v2_1.clone().multiplyScalar(ratio));

    put_marker(p4);
    put_marker(p5);
    put_line(p3, p4);
    put_line(p4, p5);
    put_line(p5, p1);
    
    return [p1, p2, p3, p4, p5];
}

function draw_hexagon(p1, p2, p3){
    var v2_1 = p1.clone().sub(p2);
    var v2_3 = p3.clone().sub(p2);
    var p6 = p3.clone().add(v2_1.clone().multiplyScalar(2));
    var p4 = p1.clone().add(v2_3.clone().multiplyScalar(2));
    var p5 = p2.clone().add(v2_3.clone().add(v2_1).multiplyScalar(2));

    put_marker(p4);
    put_marker(p5);
    put_marker(p6);

    put_line(p3, p4);
    put_line(p4, p5);
    put_line(p5, p6);
    put_line(p6, p1);

    return [p1, p2, p3, p4, p5, p6];
}

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
    //console.log("dist", color, v1.distanceTo(v2))
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
