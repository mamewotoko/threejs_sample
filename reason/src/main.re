open ReasonJs.Dom;

module Camera = {
  type t;
  external create_parspective : int => int => float => int => t = "THREE.PerspectiveCamera" [@@bs.new];
};

module Controlls = {
  type t;
  external create_orbit_controlls : unit => t = "THREE.OrbitControls" [@@bs.new];
};

module Light = {
  type t;
  /* color -> light */
  external create_ambient_ligtht : int => t = "THREE.AmbientLight" [@@bs.new];
  /* color -> xxx -> light */
  external create_directional_ligtht : int => float => t = "THREE.DirectionalLight" [@@bs.new];
};

module Scene = {
  type t;
  external create : unit => t = "THREE.Scene" [@@bs.new];
  external add_camera: t => Camera.t => unit  = "add" [@@bs.send];
  external add_light: t => Light.t => unit  = "add" [@@bs.send];
};

module Geometry = {
  type t;
  external create_cylinder : float => float => float => int => t = "THREE.CylinderGeometry" [@@bs.new];
};

module Material = {
  type t;
  external create_meshphong : unit => t = "THREE.MeshPhongMaterial" [@@bs.new];
};

module Renderer = {
  type t;
  external create_webgl : unit => t = "THREE.WebGLRenderer" [@@bs.new];
  external set_size : t => int => int => unit = "setSize" [@@bs.send];
  external render : t => Scene.t => Camera.t => unit = "render" [@@bs.send];
};

let renderer = Renderer.create_webgl();
let controll = Controlls.create_orbit_controlls();
let scene = Scene.create ();
let camera = Camera.create_parspective 75 (Window.innerWidth window/Window.innerHeight window) 0.1 1000;      
/* external renderer_set_size : int => int => unit =  */
let setup = fun () => {
  let text_color = "#FFFFFF";
  let texture_background_color = "#00FF00";
  let geometry = Geometry.create_cylinder 10.0 10.0 32.0 128;
  let material = Material.create_meshphong ();
  Renderer.set_size renderer (Window.innerWidth window) (Window.innerHeight window);
  
};

/* render is defined as js */
