// Assignment 4 - Xinyu Liu Carrot

import * as PIXI from "pixi.js";
import * as dat from "dat.gui";
import { gsap } from "gsap";
import { Model, SceneState } from './model';
import { ContextSystem, LineStyle, UPDATE_PRIORITY } from "pixi.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {$} from "jquery";


let tl = gsap.timeline();
let bl1 = gsap.timeline();
let bl2 = gsap.timeline();
let bl3 = gsap.timeline();
let bl4 = gsap.timeline();
let mModel = new Model();
let CurvePoints: Array<PIXI.AnimatedSprite> =[];
let Kids: Array<PIXI.AnimatedSprite> =[];
let Path: Array<any> = [];
let app = new PIXI.Application({
  width: window.innerWidth,
  height: 2000
 });
let renderer = new PIXI.Renderer({
  width: window.innerWidth,
  height: window.innerHeight * 3
});
let KidTextures_1: Array<any> = [];
let KidTextures_2: Array<any> = [];
let KidTextures_3: Array<any> = [];
let Buildings_1: PIXI.Container = new PIXI.Container;
let Buildings_2: PIXI.Container = new PIXI.Container;
let Buildings_3: PIXI.Container = new PIXI.Container;
let Buildings_4: PIXI.Container = new PIXI.Container;
let buildingH1: any = [];
let buildingH2: any = [];
let buildingH3: any = [];
let buildingH4: any = [];
let buildingW1: any = [];
let buildingW2: any = [];
let buildingW3: any = [];
let buildingW4: any = [];
let buildingC1: any = [0x9CB529, 0x8B3422, 0x855A51, 0xB58829, 0x71291A, 0xB54229];
let buildingC2: any = [0x297588, 0x294588, 0x3C2988, 0x6C2988, 0x882975, 0x882946];
let buildingC3: any = [0x00000];

// load kid texture
app.loader
    .add('kid1_1', 'assets/spr_kids/kid1_1.png')
    .add('kid1_2', 'assets/spr_kids/kid1_2.png')
    .add('kid1_3', 'assets/spr_kids/kid1_3.png')
    .add('kid1_4', 'assets/spr_kids/kid1_4.png')
    .add('kid1_5', 'assets/spr_kids/kid1_5.png')
    .add('kid1_6', 'assets/spr_kids/kid1_6.png')
    .add('kid1_7', 'assets/spr_kids/kid1_7.png')
    .add('kid1_8', 'assets/spr_kids/kid1_8.png')
    .add('kid2_1', 'assets/spr_kids/kid2_1.png')
    .add('kid2_2', 'assets/spr_kids/kid2_2.png')
    .add('kid2_3', 'assets/spr_kids/kid2_3.png')
    .add('kid2_4', 'assets/spr_kids/kid2_4.png')
    .add('kid2_5', 'assets/spr_kids/kid2_5.png')
    .add('kid2_6', 'assets/spr_kids/kid2_6.png')
    .add('kid2_7', 'assets/spr_kids/kid2_7.png')
    .add('kid2_8', 'assets/spr_kids/kid2_8.png')
    .add('kid3_1', 'assets/spr_kids/kid3_1.png')
    .add('kid3_2', 'assets/spr_kids/kid3_2.png')
    .add('kid3_3', 'assets/spr_kids/kid3_3.png')
    .add('kid3_4', 'assets/spr_kids/kid3_4.png')
    .add('kid3_5', 'assets/spr_kids/kid3_5.png')
    .add('kid3_6', 'assets/spr_kids/kid3_6.png')
    .add('kid3_7', 'assets/spr_kids/kid3_7.png')
    .add('kid3_8', 'assets/spr_kids/kid3_8.png')
    .load(onLoaded);


// PIXI.Loader.shared.add("assets/spriteSheetTrial.json").load(onLoaded);

// After loading
function onLoaded() {

    // Push textures to arrays
    for (let i = 0; i < 8; i++) {
        const texture = PIXI.Texture.from(`kid1_${i + 1}`);
        KidTextures_1.push(texture);
    }

    for (let i = 0; i < 8; i++) {
      const texture = PIXI.Texture.from(`kid2_${i + 1}`);
      KidTextures_2.push(texture);
  }

    for (let i = 0; i < 8; i++) {
      const texture = PIXI.Texture.from(`kid3_${i + 1}`);
      KidTextures_3.push(texture);
    }

    // define path points
    var path = [
      350, 450, 
      window.innerWidth - 20, 500,
      window.innerWidth + 20, 500, 
      window.innerWidth + 20, 800, 
      50, 800, 
      50, 1300, 
      500, 1450,
      window.innerWidth - 20, 1500, 
      window.innerWidth + 20, 1500,
      window.innerWidth + 20, 1700,
      50, 1700,
      50, 1950,
      300, 1990,
      window.innerWidth + 30, 2000,
      
    ]; 
  
    // declare path
    let path2 = [
      {x: -20, y: 60}
    ];
 
  
    for (let i = 0; i < 10; i++) {
      const element = new PIXI.Graphics();
      const container = new PIXI.Container();

      buildingH1[i] = {
        value: Math.floor(Math.random() * 180) + 200,
      };
      buildingW1[i] = {
        value: Math.floor(Math.random() * 200) + 100,
      };

      let AllBW = 0;

      for (let j = 0; j < buildingW1.length; j++){
        AllBW += buildingW1[j];
      }

      element.x = AllBW + 20;
      element.y = 500;
      element.beginFill(buildingC1[Math.floor(Math.random() * 3)]);
      element.drawRect(0, 0, buildingW1[i], buildingH1[i]);
      element.setTransform(window.innerWidth, window.innerHeight, 1, 1, Math.PI, 0, 0, 0, 0);

      container.addChild(element);
      container.pivot.x = container.width / 2;
      container.pivot.y = container.height / 2;
      Buildings_1.addChild(container);
      app.stage.addChild(container);
    }

    // push path pointsto the declared path
    for (let i = 0; i < path.length; i = i + 2) {
      path2.push({x: path[i], y: path[i+1]})
    }

  
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


      // create kid1 AnimatedSprite
      const kid1 = new PIXI.AnimatedSprite(KidTextures_1);
      kid1.x = -20;
      kid1.y = 60;
      kid1.animationSpeed = 0.3;
      kid1.anchor.set(0.5, 0.7);
      kid1.scale.set(0.1);
      kid1.gotoAndPlay(0);
      Kids.push(kid1);
      app.stage.addChild(kid1);

      const kid2 = new PIXI.AnimatedSprite(KidTextures_2);
      kid2.x = -20;
      kid2.y = 60;
      kid2.animationSpeed = 0.3;
      kid2.anchor.set(0.5, 0.7);
      kid2.scale.set(0.1);
      kid2.gotoAndPlay(0);
      Kids.push(kid2);
      app.stage.addChild(kid2);

      const kid3 = new PIXI.AnimatedSprite(KidTextures_3);
      kid3.x = -20;
      kid3.y = 60;
      kid3.animationSpeed = 0.3;
      kid3.anchor.set(0.5, 0.7);
      kid3.scale.set(0.1);
      kid3.gotoAndPlay(0);
      Kids.push(kid3);
      app.stage.addChild(kid3);

      for(let i = 0; i < buildingH1.length; i++) {
        bl1.to(Buildings_1.getChildAt(i), {height: buildingH1[i], duration: 2, ease: "elastic.out(1, 0.3)",repeat:1, yoyo:true},"<");
      }

      gsap.to(kid1, {
        duration: 50,
        // delay: 1, 
        repeat: 50,
        repeatDelay: 1,
        ease: "none",
        motionPath:{          
          path: path2,
          // align: path2,
          // alignOrigin: [0.5, 0.5],
          autoRotate: true,
          useRadians: true,
          curviness: 0.5
          // type: "cubic"
        }
        
      });

      gsap.to(kid2, {
        // scrollTrigger: {
          // pin: true,
          // start: "top",
          // end: 'bottom += 550%',
          // scrub: 1,
          // snap: 1 / (window.innerWidth + 1000),
          // markers: true,
          // onUpdate: self => {
          //   gsap.to(kid2, {rotation: () => self.direction === 1 ? 0 : -180, overwrite: 'auto'});
          // }
        // },
        duration: 50,
        delay: 0.5, 
        repeat: 50,
        repeatDelay: 1,
        ease: "none",
        immediateRender: true,
        motionPath:{
          path: path2,
          autoRotate: true,
          useRadians: true,
          curviness: 0.5
          // type: "cubic",
          
        }
      });

      gsap.to(kid3, {
        duration: 50,
        delay: 1, 
        repeat: 50,
        repeatDelay: 1,
        ease: "none",
        motionPath:{
          path: path2,
          autoRotate: true,
          useRadians: true,
          // type: "cubic",
          curviness: 0.5
        }
      });

      const gui = new dat.GUI()
      let timelineFolder = gui.addFolder("timeline");
      timelineFolder.open();
      let tlCallbacks = {
          pause: () => tl.pause(),
          play: () => tl.play(),
          reverse: () => tl.reverse(),
          progress: 0
      }
    
      timelineFolder.add(tlCallbacks, "pause");
      timelineFolder.add(tlCallbacks, "play");
      timelineFolder.add(tlCallbacks, "reverse");
      timelineFolder.add(tlCallbacks, "progress", 0.0, 1.0, 0.01).onChange((value) => {
          tl.play()
          tl.progress(value)
          tl.pause()
      });
  

      //   let context = {
      //     CurvePoints
      //   };
        // app.ticker.add(update, context);
    
  // Application Display

  document.body.style.margin = '0';
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  app.renderer.resize(window.innerWidth, 2000);
  app.renderer.backgroundColor = 0x00000;
  // app.renderer.backgroundAlpha = 0;



  // Handle window resizing
  window.addEventListener('resize', (_e) => {
      app.renderer.resize(window.innerWidth, 2000);
  });

  document.body.appendChild(app.view);
  // renderer.render(app.stage);

    // start animating
    app.start();


 
  
  
 
}

// let elaspsedTime = 0;

// function update(this: any, delta: number) {

//   elaspsedTime += 0.1;

//   for (let i = 0; i < 50; i ++) {
//     Path.push({x: 10 * i, y: Math.sin(0.1 * elaspsedTime)})
//   }

//   this.CurvePoints.forEach((point: PIXI.AnimatedSprite, i: number) => {

//     point.x = 50 * i;

//   });

// }

// for(let i = 0; i < Kids.length; i++){
//   gsap.to(Kids[i], {
//     duration: 12,
//     delay: i * 0.5, 
//     repeat: 12,
//     repeatDelay: 2,
//     ease: "none",
//     motionPath:{
//       path: path2,
//       // autoRotate: true,
//       // curviness: 1
//     }
//   });
// }
