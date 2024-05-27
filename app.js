import { ruleMove } from "./rules.js";
import { color,  hitted, player, square } from "./pieces.js";
import { Undo } from "./rules.js";
import { bulletSpeed } from "./bullet.js";
import { checkCollision, interval2 } from "./collission.js";
import { detector, pieces } from "./pieces.js"; 
//   "Titan_blue"   ,"Tank_blue"  ,"Ricochets_blue"  ,"SemiRicochets_blue"  ,"Cannon_blue"  ,"Titan_pink"  ,"Tank_pink"  ,"Ricochets_pink"  ,"SemiRicochets_pink"  ,"Cannon_pink"
export let pauseActive = false;
export let interval3;
export let lastSelect;
export let col=false;
export let interval7;
export let intervaal8,interval9;

export let interval5;
export let interval6;
export let Turn = true ;
export let path_i= 0;
export let interval4;
export let clock=document.querySelector(".clock");
let Rico = [];
let RicoInfo = [];
let bullInfo;
let detectorInfo=[];
let hit=0;
let hit_parent = "";
// let path= ["up","right","down","left"];
let test;
let bullet_move="up";
let clicked =false;
let square1=square;
square1 = square1.splice(0,5);
let squareTurn = square;


export function transform(){
if(Turn){
  squareTurn=square1;
  Turn=false;
  console.log(bullet_move);
  bullet_move ="down";
  console.log(bullet_move);
  path_i=0;
  document.querySelector(".space").innerHTML=color[1];
  play();
}

else{
  squareTurn=square;
  Turn=true;
  console.log(bullet_move);
  bullet_move="up";
  console.log(bullet_move);
  path_i=0;
  document.querySelector(".space").innerHTML=color[0];
  play();
}
counting();
}

export function play(){
path_i=0;
hit_parent="";
Array.from(squareTurn).forEach((sq) =>{
  sq.addEventListener("click", ahead )})
}

function ahead (e){
  if(clicked){
    unSelect();
  }
  checkPause();
  clicked=true;
  lastSelect=`${e.target.className}`;
  lastSelect= lastSelect.split(" ");        //lastselect contains the target class
  e.target.classList.add("active");
  
  ruleMove(lastSelect ,Turn , e);
}

export function delPlay(){
  Array.from(squareTurn).forEach((sq) =>{
    sq.removeEventListener("click", ahead )})
  }
  
  
export const unSelect = () =>{
    let prev = document.querySelector(`.${lastSelect[0]}`);
    prev.classList.remove("active");
    if(document.querySelector(".rotate")!= null){
    (document.querySelector(".rotate")).style.display= "none";}
    Undo();
  }

play();
counting(); 

export function comparing (bullet){
    ricoPosition();
    interval6 = setInterval(()=> {
        let test2;
        bullInfo=bullet.getBoundingClientRect();
        for(let j =0 ; j< detector.length ; j++){
        test2= (bullInfo.top > detectorInfo[j].top  && 
            bullInfo.top < detectorInfo[j].bottom   && 
            bullInfo.right  >   detectorInfo[j].left &&   
            bullInfo.left < detectorInfo[j].right );
        
            if(test2 ){
                console.log("hitting rico");
                if(hit_parent=="" || hit_parent!=detector[j].parentNode){
                  console.log(detector[j].id);
                  hit=1;
                  if((detector[j].parentNode.classList)[1]=="Ricochets"){
                    if( (detector[j].id=="left" || detector[j].id=="bottom")){
                    hit==0;
                    hitted();
                    console.log(detector[j].parentNode);
                    // clearInterval(interval3);
            // clearInterval(interval2);
            // clearInterval(interval5);
            // clearInterval(interval4);
            // clearInterval(interval6);
            // clearInterval(interval7);
            (detector[j].parentNode).style.background = "none";
            // (detector[j].parentNode).appendChild(div1);
            // (detector[j].parentNode).appendChild(div2);
            // (detector[j].parentNode).appendChild(div3);
            // (detector[j].parentNode).appendChild(div4);
            ((detector[j].parentNode).parentNode).removeChild(detector[j].parentNode);

            // bullet.parentNode.removeChild(bullet);
            // delPlay();
            // unSelect();
            // transform();
            break;
                }
                }
                clearTimeout(interval6);
                nextDirection(detector[j]);
                console.log("changing diraection");
                hit_parent = detector[j].parentNode; }
            }  }   }, 10);
    
    interval3 = setInterval(()=>{
        bullInfo=bullet.getBoundingClientRect();
        for( let i =0 ; i< pieces.length ; i++){
        test = ( bullInfo.top < RicoInfo[i].bottom -15  && 
        bullInfo.bottom > RicoInfo[i].top +15 && 
        bullInfo.right  > RicoInfo[i].left +15  &&   
        bullInfo.left < RicoInfo[i].right -15 );
        
        if(test && hit==1){
          hitted();
            clearInterval(interval3);
            clearInterval(interval2);
            clearInterval(interval4);
            clearTimeout(interval6);
            console.log("collide yahuuuu");
            hit=0;
            console.log(bullet.style.top);
            bullet.style.top = (RicoInfo[i].top + RicoInfo[i].bottom) /2 -10+ "px";
            bullet.style.left = (RicoInfo[i].left + RicoInfo[i].right ) /2 -5 +"px";
            moveDirection(bullet);
            break; 
            }

            
        else if ((test && !Rico[i].className.includes("Rico") )){
            // console.log(RicoInfo[i]);
            console.log("different part");
            console.log(Rico[i]); 
            console.log(bullet.style.top);
            clearInterval(interval3);
            clearInterval(interval2);
            clearInterval(interval5);
            clearInterval(interval4);
            clearInterval(interval6);
            clearInterval(interval7);
            hitted();
            bullet.parentNode.removeChild(bullet);
            unSelect();
            delPlay();
            transform();
            break;
            }   }
        }, 10);
}

export function ricoPosition(){
    for(let i =0 ; i<detector.length; i++){
       Rico[i] = document.querySelector(`.${pieces[i]}`);
       if(Rico[i] != null){
       RicoInfo[i]= Rico[i].getBoundingClientRect();}
       detectorInfo[i]= detector[i].getBoundingClientRect();
    }
}


function nextDirection (e){ 
    if((e.id)===("right")){ path_i++}
    else if((e.id)===("left")){ path_i++}
    else if((e.id)===("top")){path_i--}
    else if((e.id)==="bottom"){ path_i--;
    } 
}

export function moveDirection (bullet){
    console.log(bullet_move);
    console.log(path_i);
    if ((bullet_move ==="up" && path_i<0) || (bullet_move ==="down" && path_i >0)){
    interval4 = setInterval(() => {
        const currentLeft = parseInt(bullet.style.left);
        bullet.style.left = (currentLeft - bulletSpeed) + "px";
    }, 10);
    bullet_move="left";
    }
    else if((bullet_move ==="up" && path_i>0) || (bullet_move ==="down" &&path_i <0)){
        interval4 = setInterval(() => {
            const currentLeft = parseInt(bullet.style.left);
            bullet.style.left = (currentLeft + bulletSpeed) + "px";
        }, 10);
        bullet_move="right";
        }
        else if ((path_i===0  && bullet_move === "up") || (bullet_move ==="left" && path_i>0) || (bullet_move ==="right" &&path_i<0)){
            bullet_move= "up";
     interval4 = setInterval(() => {
         const currentTop = parseInt(bullet.style.top);
         bullet.style.top = (currentTop - bulletSpeed) + "px";
        }, 10);
        
     }
     
     else if ((path_i===0  && bullet_move === "down") || (bullet_move ==="left" && path_i<0) || (bullet_move ==="right" &&path_i>0)){
            bullet_move= "down";
     interval4 = setInterval(() => {
         const currentTop = parseInt(bullet.style.top);
         bullet.style.top = (currentTop + bulletSpeed) + "px";
        }, 10);
        
     }
     path_i=0;
     comparing(bullet);
     checkCollision(bullet);
    }

export function boundary(bullet){
  let board=document.querySelector(".board").getBoundingClientRect();
    interval5=setInterval(()=>{
         let bulletBound = bullet.getBoundingClientRect();
    if (bulletBound.top<board.top || bulletBound.top > board.bottom ||bulletBound.left <board.left || bulletBound.left >board.right) {

            clearInterval(interval2);
            clearInterval(interval3);
            clearInterval(interval4);
            clearInterval(interval5);
            clearInterval(interval7);
        console.log("out of box");
        bullet.parentNode.removeChild(bullet); 
        delPlay();
        transform();
    }
},10);
}

// creating slide
let line = document.querySelector(".three_lines");
let threeActive= false;
line.addEventListener("click", ()=>{
  let slide= document.querySelector(".slide");
  if(threeActive){
    line.style.backgroundColor = "initial";
    // line hover to apply
    slide.style.marginLeft="-740%";
    slide.style.display="none";
    threeActive = false; 
  }
  else {
    line.style.backgroundColor = "slategray"
    slide.style.marginLeft="-40%";
    slide.style.display="block";
    threeActive = true; 
  // slide.style.transition = "display 2s ease-out"
  }
})

// timer

export function counting(){
  clearInterval(intervaal8);
  clearInterval(interval9);
  intervaal8 = setInterval(() => {
    if(col){
      col=false;
      clock.style.color="white";
      clock.style.border="4px solid white"
      document.querySelector(".space").style.backgroundColor="initial";
      document.querySelector(".space").style.color  ="white";
    document.querySelector(".space").style.border=`3px solid white`;
    }
  }, 500);
  interval9 =setInterval(() => {
    console.log("changing");
    if(!Turn){
    col=true;
    clock.style.border=`4px solid ${color[1]}`
    clock.style.color=color[1];
    document.querySelector(".space").style.color=color[1];
    document.querySelector(".space").style.backgroundColor="white";
    document.querySelector(".space").style.border=`3px solid ${color[1]}`;
  }
    else{
      col=true;
      clock.style.color=color[0];
    clock.style.border=`4px solid ${color[0]}`;
    document.querySelector(".space").style.color=color[0];
    document.querySelector(".space").style.backgroundColor="initial";

    document.querySelector(".space").style.border=`3px solid ${color[0]}`;
    }
}, 1000);
// clock=document.querySelector(".clock");
interval7 = setInterval(()=>{
  let time = clock.innerHTML;
  time=parseInt(time)-1;
  if(time<0){
    clearInterval(interval7);
    clock.innerHTML=time;
    alert("other party wins");
    time=20;
    clock.innerHTML=time;
  }
  else{
    clock.innerHTML=time;
  }
}, 1000);
}

// pause function 
let pause = document.querySelector(".pause");
pause.addEventListener("click" , countdown);
export function countdown(){
  if(!pauseActive){
    pauseActive=true;
    clearInterval(interval7);
    pause.innerHTML="Play";
  }
  else{
    pauseActive=false;
    clearInterval(interval7);
    pause.innerText="Pause";
    counting();
  }
}

export function checkPause(){
  if(pauseActive){
    pauseActive=false;
    clearInterval(interval7);
    pause.innerText="Pause";
    counting();
  }
}