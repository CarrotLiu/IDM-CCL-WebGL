import './style.scss';
import * as THREE from 'three';
// import * as ML5 from 'ml5';
// import * as p5 from 'p5';
import { Scene, PerspectiveCamera } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { ViewOne } from './view/ViewOne';
import { BaseView } from './view/BaseView';


declare let p5: any;
declare let ml5: any;

let handpose: any;
let resullts: any;
let predictions: Array<any> = [];
let handPosition: any;
let model = {
	activeView: 0,
	pointerPosition: new THREE.Vector2(0,0)
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

let stats: any;

let raycaster: THREE.Raycaster;

let poseNet: any;
let poses: Array<any> = [];
let videoTexture: any;
let videoElement: any;

var video: any = document.getElementById("video");
var canvas = document.getElementById("canvas");
var sketch = function (p: any) {
  
	p.setup = function() {
	  	let canvas: any = p.createCanvas(window.innerWidth, window.innerHeight);
	  	canvas.hide();
		let videoOptions = {
			audio: false, video: {
				width: canvas.width,
				height: canvas.height,
			}
		}
		video = p.createCapture(videoOptions);
		handpose = ml5.handpose(video, function(){console.log("Model ready!")});
		//@ts-ignore
		handpose.on("predict", results => {
			predictions = results;
		  });
		video.hide();
	  
	};
	p.draw = function(){
		for (let i = 0; i < predictions.length; i += 1) {
			const prediction = predictions[i];
			for (let j = 0; j < prediction.landmarks.length; j += 1) {
				console.log(predictions[0].landmarks[9][0])
				handPosition = {x: predictions[0].landmarks[9][0], y: predictions[0].landmarks[9][1]}
				viewOne.onHandMove(handPosition, viewOne.elbow, 50);
				viewOne.onHandMove(handPosition, viewOne.wrist, 30);
			}
		}
	}
  };
let myp5 = new p5(sketch);

let viewOne: ViewOne;
let views: BaseView[] = [];

let texts = [];

let textInput: any = document.getElementById("text");  //get a hold of something in the DOM
    textInput.addEventListener("keydown", function (e: any) {
        if (e.key === "Enter") {  
     		createNewText(textInput.value);
        }
    });

function createNewText(text_msg: any) {
    console.log("Created New Text");

	viewOne.plane.position.x = viewOne.cube.position.x;
	viewOne.scene.add(viewOne.plane);
    let canvas: any = document.createElement("canvas");
	viewOne.textMove();
}

function main() {
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initScene() {
	
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	viewOne = new ViewOne(model, renderer);
	views.push(viewOne);

	// // Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('pointermove', onPointerMove);
}

function onWindowResize() {
	viewOne.onWindowResize();

}

function onPointerMove(event: any) {
	model.pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	model.pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let delta = clock.getDelta();

	// shaderMat.uniforms.u_time.value += delta;

	switch (model.activeView) {
		case 0:
			viewOne.update(clock);
			break;

		default:
			break;
	}

	if (stats) stats.update();

	renderer.render(views[model.activeView].scene, views[model.activeView].camera);
}

main();


interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}
