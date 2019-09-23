//for rev. 74
var TEXT_COLOR = "#FFFFFF";
var TEXTURE_BACKGROUND_COLOR = "#00FF00";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-20);
document.body.appendChild(renderer.domElement);
//var control = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight(0x888888);
scene.add(light);
light = new THREE.DirectionalLight(0x888888, 1.0);
light.position.set(10, 10, 0);
scene.add(light);

var canvas = document.createElement("canvas");
canvas.width = 64;
canvas.height = 32;
//canvas.width = 16;
//canvas.height = 16;
var xc = canvas.getContext("2d");
xc.fillStyle=TEXTURE_BACKGROUND_COLOR;
xc.fillRect(0, 0, canvas.width, canvas.height);
xc.fillStyle=TEXT_COLOR;
//macでない場合どうなる?
xc.font = "18pt ヒラギノ角ゴ";
xc.fillText("お茶", 0, 22);

//1. 全面にテクスチャーをはった場合
//
var geometry = new THREE.CylinderGeometry(10, 10, 32, 128);
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
var material = new THREE.MeshPhongMaterial({ map: texture });
//var material = end_material;
var obj = new THREE.Mesh(geometry, material);
obj.position.x -= 15;
obj.rotation.y = -Math.PI/6;
scene.add(obj);

//2. 平らな面はテクスチャをやめる
geometry = new THREE.CylinderGeometry(10, 10, 32, 128);
var texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
var side_material = new THREE.MeshPhongMaterial({ map: texture });
var end_material = new THREE.MeshPhongMaterial({ color: TEXTURE_BACKGROUND_COLOR });
material = new THREE.MeshFaceMaterial([side_material, end_material]);

var axes = buildAxes(10000);
scene.add(axes);

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

camera.position.set(0, 40, 130);

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

//ps3
var L1 = 4;
var R1 = 5;
var L2 = 6;
var R2 = 7;
var UP = 12;
var DOWN = 13;
var LEFT = 14;
var RIGHT = 15;
//id: 

//sega
//up: axis5 -1
//down: axis5 1
//left: axis4 -1
//right: axis4 1
//x: b3
//y: b0
//z: b4
//a: b2
//b: b1
//c: b5
//mode: b8
//start: b9
//id: ca3-24
var unit_speed = 2;

var ps3 = {
    PREFIX: '54c-268-',
    handle: function(gp){
        var backward = gp.buttons[6].pressed;
        var forward = gp.buttons[7].pressed;
        var p = camera.position;
        if(buttonPressed(gp.buttons[LEFT])){
            camera.position.set(p.x-unit_speed, p.y, p.z)
        }
        if(buttonPressed(gp.buttons[RIGHT])){
            camera.position.set(p.x+unit_speed, p.y, p.z)
        }
        if(buttonPressed(gp.buttons[L2])){
            camera.position.set(p.x, p.y, p.z+unit_speed)
        }
        if(buttonPressed(gp.buttons[R2])){
            camera.position.set(p.x, p.y, p.z-unit_speed)
        }
        if(buttonPressed(gp.buttons[UP])){
            camera.position.set(p.x, p.y+unit_speed, p.z)
        }
        if(buttonPressed(gp.buttons[DOWN])){
            camera.position.set(p.x, p.y-unit_speed, p.z)
        }
    }
};

var sega = {
    PREFIX: 'ca3-24-',
    UP_DOWN_AXES: 5,
    LEFT_RIGHT_AXES: 4,
    X: 3,
    Y: 0,
    Z: 4,
    A: 2,
    B: 1,
    C: 5,
    MODE: 8,
    START: 9,

    up_pressed: function(gp){
        return Math.abs(gp.axis[UP_DOWN_AXES] - (-1)) < 0.001;
    },
    down_pressed: function(gp){
        return Math.abs(gp.axis[UP_DOWN_AXES] - (1)) < 0.001;
    },
    left_pressed: function(gp){
        return Math.abs(gp.axis[LEFT_RIGHT_AXES] - (-1)) < 0.001;
    },
    right_pressed: function(gp){
        return Math.abs(gp.axis[LEFT_RIGHT_AXES] - (1)) < 0.001;
    },
    x_pressed: function(gp){
        return gp.axis[X] == 1;
    },
    y_pressed: function(gp){
        return gp.axis[Y] == 1;
    },
    z_pressed: function(gp){
        return gp.axis[Z] == 1;
    },
    a_pressed: function(gp){
        return gp.axis[A] == 1;
    },
    b_pressed: function(gp){
        return gp.axis[B] == 1;
    },
    c_pressed: function(gp){
        return gp.axis[C] == 1;
    },

    //default handler
    handle: function(gp){
        if(this.left_pressed(gp)){
            camera.position.set(p.x-unit_speed, p.y, p.z)
        }
        if(this.right_pressed(gp)){
            camera.position.set(p.x+unit_speed, p.y, p.z)
        }
        if(this.up_pressed(gp)){
            camera.position.set(p.x, p.y+unit_speed, p.z)
        }
        if(this.down_pressed(gp)){
            camera.position.set(p.x, p.y-unit_speed, p.z)
        }
    }
};


function render() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        requestAnimationFrame(render);
        return;
    }
    // console.log("gamepads: "+gamepads)
    // var i;
    // for(i = 0; i < gamepads.length; i++){
    //     console.log("gp: " + i + " "+gamepads[i]);
    // }
    var gp = gamepads[0];
    if(gp == null){
        console.log("gamepads: press some button to start")
        requestAnimationFrame(render);
        return;
    }
    // var backward = gp.buttons[6].pressed;
    // var forward = gp.buttons[7].pressed;
    // var unit_speed = 2;
    // var p = camera.position;
    // if(buttonPressed(gp.buttons[LEFT])){
    //     camera.position.set(p.x-unit_speed, p.y, p.z)
    // }
    // if(buttonPressed(gp.buttons[RIGHT])){
    //     camera.position.set(p.x+unit_speed, p.y, p.z)
    // }
    // if(buttonPressed(gp.buttons[L2])){
    //     camera.position.set(p.x, p.y, p.z+unit_speed)
    // }
    // if(buttonPressed(gp.buttons[R2])){
    //     camera.position.set(p.x, p.y, p.z-unit_speed)
    // }
    // if(buttonPressed(gp.buttons[UP])){
    //     camera.position.set(p.x, p.y+unit_speed, p.z)
    // }
    // if(buttonPressed(gp.buttons[DOWN])){
    //     camera.position.set(p.x, p.y-unit_speed, p.z)
    // }

    if(gp.id.startsWith(ps3)){
        ps3.handle(gp);
    }
    else if(gp.id.startsWith(sega)){
        sega.handle(gp);
    }
    //console.log(camera.position.x+","+camera.position.y+","+camera.position.z)
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
