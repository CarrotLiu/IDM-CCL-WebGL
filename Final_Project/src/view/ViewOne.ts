import {
	Mesh,
	MathUtils,
	Renderer,
	BoxGeometry,
	MeshPhongMaterial,
	AmbientLight,
	PointLight,
	Group,
	Color,
	Material,
	TextureLoader,
	RepeatWrapping,
	Texture,
	MeshBasicMaterial,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
	Clock,
	Bone
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";
import { gsap } from "gsap";


export class ViewOne extends BaseView{

	group: Group;
	cube: Mesh;
	plane: Mesh;
	tl: any;
	alien: Group;
	alienHand: Group;
	initPos: number;
	initPlane: number;
	elbow: any;
	wrist: any;
	
	exampleTexture: Texture;
	
	lightAmbient: AmbientLight;
	lightPoint: PointLight;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.tl = gsap.timeline();

		this.alien = new Group();
		this.alienHand = new Group();
		this.exampleTexture = new Texture();
		this.group = new Group();
		this.scene.add(this.group);
		this.plane = new Mesh();
		this.initPos = 0;
		this.initPlane = -0.5;
		const cubeGeometry = new BoxGeometry();
		const cubeMaterial = new MeshPhongMaterial({ color: 0xf0bbbb });
		
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;

		// this.group.add(this.cube);

		this.lightAmbient = new AmbientLight(0x333333);
		this.scene.add(this.lightAmbient);

		this.lightPoint = new PointLight(0xffffff);
		this.lightPoint.position.set(-0.5, 0.5, 4);
		this.lightPoint.castShadow = true;
		this.lightPoint.intensity = 0.25;
		this.scene.add(this.lightPoint);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;


		let textureMaterial: Material;
		let textureLoader = new TextureLoader().setPath('../resources/textures/');
		textureLoader.load('1.png', (texture) => {
			const geometryPlane = new PlaneBufferGeometry(3, 3, 6, 6);
			const materialPlane = new MeshBasicMaterial({color: 0x00ff00, map: texture, transparent: true });
	
			this.plane = new Mesh(geometryPlane, materialPlane);
			this.plane.position.z = this.initPlane;
			this.plane.receiveShadow = true;
			// this.scene.add(this.plane);

			const modelLoader = new GLTFLoader().setPath('../resources/models/');
			modelLoader.load('alien_body.gltf', (gltf) => {
				
				this.alien = gltf.scene;
				// console.log(this.alien);

				this.alien.scale.set(0.9, 0.9, 0.9);
				this.alien.position.x = -2.5;
				this.alien.position.z = -0.8;

				const alien_body_mat = new MeshPhongMaterial({ color: 0x808080 });

				this.scene.add(this.alien)
				// this.group.add(this.alien);
			});

			const handLoader = new GLTFLoader().setPath('../resources/models/');
			handLoader.load('alienHand.gltf', (gltf) => {
				
				this.alienHand = gltf.scene;
				this.alienHand.traverse(child => {
					if ((child as Mesh).isMesh) {
					  child.castShadow = true;
					  child.receiveShadow = true;
					}
					if ((child as Bone).isBone && child.name === 'Bone005') { 
						this.elbow = child;
					  }
					if ((child as Bone).isBone && child.name === 'Bone001') { 
						this.wrist = child;
					}
				});
				// console.log(this.alien);
				console.log(gltf.scene);
				this.alienHand.scale.set(0.9, 0.9, 0.9);
				this.alienHand.position.x = -2.5;
				this.alienHand.position.z = -2.5;
				this.alienHand.position.y = 1;
				// this.alienHand.rotation.x = 90;
				const alien_body_mat = new MeshPhongMaterial({ color: 0x808080 });

				this.scene.add(this.alienHand)
				// this.group.add(this.alien);
			});
		});
	}
	


getHandDegrees(x: any, y: any, degreeLimit: any) {
		let dx = 0,
			dy = 0,
			xdiff: any,
			xPercentage: any,
			ydiff: any,
			yPercentage: any;
			let w = { x: window.innerWidth, y: window.innerHeight };
			// Left (Rotates neck left between 0 and -degreeLimit)
			// 1. If cursor is in the left half of screen
			if (x <= w.x / 2) {
			// 2. Get the difference between middle of screen and cursor position
			xdiff = w.x / 2 - x;  
			// 3. Find the percentage of that difference (percentage toward edge of screen)
			xPercentage = (xdiff / (w.x / 2)) * 100;
			// 4. Convert that to a percentage of the maximum rotation we allow for the neck
			dx = ((degreeLimit * xPercentage) / 100) * -1; 
		}
		// Right (Rotates neck right between 0 and degreeLimit)
		if (x >= w.x / 2) {
			xdiff = x - w.x / 2;
			xPercentage = (xdiff / (w.x / 2)) * 100;
			dx = (degreeLimit * xPercentage) / 100;
		}
		// Up (Rotates neck up between 0 and -degreeLimit)
		if (y <= w.y / 2) {
			ydiff = w.y / 2 - y;
			yPercentage = (ydiff / (w.y / 2)) * 100;
			// cut degreeLimit in half when looks up
			dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
		}
		// Down 
		if (y >= w.y / 2) {
			ydiff = y - w.y / 2;
			yPercentage = (ydiff / (w.y / 2)) * 100;
			dy = (degreeLimit * yPercentage) / 100;
		}
		return { x: dx, y: dy };
	}
		
	onHandMove(handPos: any, joint: any, degreeLimit: any): void {
		let degrees: any = this.getHandDegrees(handPos.x, handPos.y, degreeLimit);
		joint.rotation.y = MathUtils.degToRad(degrees.x);
		joint.rotation.x = MathUtils.degToRad(degrees.y);
	}


	alienMove(): void{
		this.tl.to(this.alien.position,
			{y: this.initPos += 0.1, duration: 1, ease:"sin.out", yoyo: true
			});
		// this.tl.to(this.alienHand.position,
		// 	{y: this.initPos += 0.1, duration: 1, ease:"sin.out", yoyo: true
		// 	}, "<");
			
		this.tl.to(this.alien.position,	
			{y: this.initPos -= 0.1, duration: 1, ease:"sin.in", yoyo: true
			}, ">" );
		// this.tl.to(this.alienHand.position,
		// 	{y: this.initPos += 0.1, duration: 1, ease:"sin.out", yoyo: true
		// 	}, "<2");
		// gsap.to(this.alien.position,
		// 	{ y: this.initPos -= 10, duration: 2, yoyo: true
		// } );
	}


	textMove(): void{
		this.tl.to(this.plane.position,
			{z: this.initPlane += 1.5, duration:0.5,ease:"sin.in", yoyo: true
			});
	}
	update(clock: Clock): void {
		if (this.alien != undefined) {
			this.alienMove();
		// 	let m = 1;
		// 	if (m < 1.3 && m >= 1){
		// 		this.alien.position.y += 0.01;
		// 		m += 0.01;
		// 	} else if (m > 1.3 && m < 6) {
		// 		this.alien.position.y -= 0.01;
		// 		m += 0.01
		// 	} else if(m >= 2){
		// 		m = 1;
		// 	} 
			// this.alien.rotateX(0.01);
			// this.alien.rotateY(0.01);
		}
		// if (this.alienHand != undefined){
		// 	this.onHandMove();
		// }
		
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

