!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=class{constructor(){this.inter,this.x=0,this.y=0,this.anim=[],console.log("Class object"),console.log(window,"hehe"),this.currentAnim,this.currentFrame=0,this.inter=setInterval(()=>{this.update()},100)}call(){}update(){this.playAnim()}updateFrame(){return this.currentFrame=++this.currentFrame%this.currentAnim.frame,this.srcX=this.currentFrame*this.currentAnim.width,this.srcY=this.currentAnim.height*this.currentAnim.rows,!this.currentAnim.loop&&this.currentAnim.frame-1==this.currentFrame}render(){console.log("render me !");let e=document.getElementById("canvas").getContext("2d");e.imageSmoothingEnabled=!1,(new Image).src="picture.jpeg",e.drawImage(this.currentAnim.image,this.srcX,this.srcY,64,128,0,0,64,128)}addAnimation(e){console.log(e[0],"hello"),e.forEach(e=>{console.log(e.name),this.anim[e.name]=e,this.anim[e.name].image=new Image,this.anim[e.name].image.src=this.anim[e.name].file}),this.currentAnim=this.anim.idle}playAnim(){this.currentAnim&&(this.updateFrame()&&(this.currentAnim=this.anim.idle),this.render())}changeAnim(e){console.log("change ANIM !"),this.currentAnim=this.anim[e],this.currentFrame=0}};var o=[{name:"idle",file:"spritesRyu.png",width:64,height:128,frame:4,rows:0,loop:!0},{name:"punch",file:"spritesRyu.png",width:64,height:128,frame:4,rows:1,loop:!1}];window.onload=(()=>{console.log("hello");let e="normal";const t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];let n={letters:[],done:!1},i=document.getElementById("canvas");i.width=1024,i.height=512,i.getContext("2d").scale(4,4);setInterval(()=>{console.log(e),n&&a(n.letters)&&"normal"==e&&(e="validation",console.log("OK @@@@@@@@@@@@@@@@@@@@@@"),setTimeout(()=>{n.letters=l(5),e="normal",s()},500))},16);function l(e){let n=[];for(var r=0;r<e;r++)n.push({char:t[(o=26,Math.floor(Math.random()*Math.floor(o)))],valid:!1});var o;return n}function a(e){let t=!0;return e.forEach(e=>{e.valid||(t=!1)}),t}function s(){!function(){let e=document.body.getElementsByClassName("Letters");if(e){let t=[...e];console.log(t),t.forEach(e=>{e.parentNode.removeChild(e)})}let t=document.body.getElementsByClassName("LettersOK");if(t){let e=[...t];console.log(e),e.forEach(e=>{e.parentNode.removeChild(e)})}}(),n&&n.letters.forEach(e=>{let t=document.getElementById("LettersContent");var n=document.createElement("div"),r=document.createTextNode(e.char);n.appendChild(r),e.valid?n.className+="LettersOK":n.className+="Letters",t.appendChild(n)})}document.addEventListener("keydown",e=>{console.log(e.key);let t=0;for(;t<n.letters.length&&n.letters[t].valid;)t++;t!=n.letters.length&&(e.key==n.letters[t].char&&(n.letters[t].valid=!0),n&&a(n.letters)&&c&&c.changeAnim("punch"),s())}),n.letters=l(5);let c=new r;console.log(o),c.addAnimation(o),console.log(c)})}]);