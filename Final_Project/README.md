# Final Project -- Arrival

## Video demo
<https://drive.google.com/file/d/1-_6pdV1FbVD1AYpNofSyp4zKZ2nKXmLb/view?usp=sharing>

Visit from China: <https://share.weiyun.com/HQy716wx>

## Live Demo
<https://carrotliu.github.io/IDM-CCL-WebGL/Final_Project/dist/>


## Concept
In this project, I want to simulate the communication between human and alien on the web. The idea comes from “Arrival”, a movie about the arrival of aliens on earth and the scientists who tries to communicate with them. The aliens use circular patterns as their language, and perceive events in a non-linear way. The linguistist tries to communicate with them with body language and human language.
![arrival1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival1.png) 

There’re two main interactions: 1) 3D model alien’s hand position would move with the user’s hand when the hand is detected in front of the camera:

![arrival2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival2.jpg)

2) when user put the hand down, the position of the alien’s hand will be fixed. User then type texts and hit enter, a circular pattern would appear gradually from where the alien’s hand is (want to achieve a 3D ink effect, but currently only able to do a plane moving in a foggy environment):

![arrival3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/arrival3.gif)

## Process

Add fog: 
```javascript
const color = 0xffffff;  // white
const near = 3;
const far = 5;
this.scene.fog = new Fog(color, near, far);
this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 5);
this.camera.position.z = 4;
this.scene.background = new Color(0xffffff); 
```
Blender modeling and rigging:
Modeling:

![blender1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender1.png)

Rigging:

![blender2](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender2.png)

In the scene:

![blender3](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender3.png)


Find the joint name in console message:
![console1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/console1.jpg)


Mashing up ml5, p5 and three.js in typescript:
This part is the hardest for me... Initially, I tried to import the p5 and ml5 using npm. But typescript keep complaining that the module is not declared. I tried several bash commands, as well as changing the coding of tsconfig.json, package-loack.json. But the import command keeps returns error about ml5js.
With the help of Professor Cotter, I managed to use the following code to silence the error:
```javascript
declare let ml5: any;
```

I tried to load the camera capture and p5 canvas:
```javascript
console.log("Start Up PoseNet")
let canvas: any = p5.createCanvas(window.innerWidth, window.innerHeight);
canvas.hide();
video = p5.createCapture(videoOptions);
video.hide();
```
But it returns an error saying that createCanvas/createCapture is not a function:
![error1](https://github.com/CarrotLiu/IDM-CCL-WebGL/blob/main/Final_Project/blender4.png)

I tried several ways including adding "declare let p5:any" to javascript, using cdn link rather than npm import, using terminal commands, etc.
Finally, I get rid of the module import method and use p5 instance instead:

```javascript
var sketch = function (p: any) {
	p.setup = function() {
	  	let canvas: any = p.createCanvas(window.innerWidth, window.innerHeight);
		video = p.createCapture(videoOptions);
	};
	p.draw = function(){
	}
  };
```

I call the hand animation function in p5 draw function. 
```javascript
handPosition = {x: predictions[0].landmarks[9][0], y: predictions[0].landmarks[9][1]}
viewOne.onHandMove(handPosition, viewOne.elbow, 50);
viewOne.onHandMove(handPosition, viewOne.wrist, 30);
```

In the future, I will continue to develop the alien's pattern animation in threejs.

## Credit
[Three.js skeleton interaction](https://tympanus.net/codrops/2019/10/14/how-to-create-an-interactive-3d-character-with-three-js/)
[ml5js handpose](https://editor.p5js.org/jeeyoonhyun/sketches/YiDt-sf59)
