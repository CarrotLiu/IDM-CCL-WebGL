import{A as u,G as g}from"./vendor.e238bf30.js";const f=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function c(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=c(t);fetch(t.href,e)}};f();let d=[],h,w,a,s=window.innerHeight-50,o=(window.innerWidth-100)/3,p=[9640485,16440280,16117743],m=[15718865,14199964,10066820],b=[16763392,2362624,6589952],y=[16765696,16752896,10963968];const D=async()=>{let n=new u;document.body.style.margin="0",n.renderer.view.style.position="absolute",n.renderer.view.style.display="block",n.renderer.resize(window.innerWidth,window.innerHeight),n.renderer.backgroundColor=4344137;let r=new g;n.stage.addChild(r);let c=new g;n.stage.addChild(c);let l=new g;n.stage.addChild(l),window.addEventListener("resize",e=>{n.renderer.resize(window.innerWidth,window.innerHeight)}),document.body.appendChild(n.view);let t={petal:c,center:l,backgroundBox:r};n.ticker.add(M,t)};function M(n){new Date().getMonth()==11||new Date().getMonth()==0||new Date().getMonth()==1?(d=p,h=23,w=20,a=5):new Date().getMonth()==2||new Date().getMonth()==3||new Date().getMonth()==4?(d=m,h=25,w=20,a=5):new Date().getMonth()==5||new Date().getMonth()==6||new Date().getMonth()==7?(d=b,h=30,w=15,a=30):(new Date().getMonth()==8||new Date().getMonth()==9||new Date().getMonth()==10)&&(d=y,h=30,w=8,a=3);let r=(60-new Date().getSeconds())%6;(new Date().getSeconds()-r)/6;let c=(60-new Date().getMinutes())%6;(new Date().getMinutes()-c)/6;let l=(24-new Date().getHours())%6,t=(new Date().getHours()-l)/6;console.log(1%6),this.backgroundBox.clear(),this.backgroundBox.beginFill(d[2]);for(let e=0;e<3;e++)this.backgroundBox.pivot.x=(window.innerWidth-100)/6,this.backgroundBox.pivot.y=window.innerHeight/2-25,this.backgroundBox.drawRoundedRect(25+o/2+e*(o+25),window.innerHeight/2,o,s,30);this.backgroundBox.endFill(),this.petal.clear(),this.petal.beginFill(d[0]);for(let e=0;e<t;e++)this.petal.drawEllipse(25+o/2,window.innerHeight/5+15+e*s/5-h,w,h);this.petal.endFill(),this.center.clear(),this.center.beginFill(d[1]);for(let e=0;e<4;e++)this.center.drawCircle(25+o/2,window.innerHeight/5+15+e*s/5,a);for(let e=0;e<5;e++)for(let i=0;i<2;i++)this.center.drawCircle(50+4*o/3+i*o/3,s/6+25+e*s/6,a);for(let e=0;e<5;e++)for(let i=0;i<2;i++)this.center.drawCircle(75+7*o/3+i*o/3,s/6+25+e*s/6,a);this.center.endFill()}D();
