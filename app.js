import { ruleMove, screen } from "./rules.js";
import { color,  hitted, player, square } from "./pieces.js";
import { Undo } from "./rules.js";
import { bulletSpeed, movement } from "./bullet.js";
import { checkCollision, interval2 } from "./collission.js";
import { detector, pieces } from "./pieces.js"; 
//   "Titan_blue"   ,"Tank_blue"  ,"Ricochets_blue"  ,"SemiRicochets_blue"  ,"Cannon_blue"  ,"Titan_pink"  ,"Tank_pink"  ,"Ricochets_pink"  ,"SemiRicochets_pink"  ,"Cannon_pink"
export let mode="hacker";
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
export let bullet_move="up";
let Rico = [];
let RicoInfo = [];
let bullInfo;
let detectorInfo=[];
let hit=0;
let hit_parent = "";
let test;
let clicked =false;
let square1=square;
square1 = square1.splice(0,5);
let squareTurn = square;


export function transform(){
if(Turn){

  squareTurn=square1;
  Turn=false;
  //////console.log(bullet_move);
  bullet_move ="down";
  //////console.log(bullet_move);
  path_i=0;
  document.querySelector(".space").innerHTML=color[1];
  screen();
  disabling();
  play();
}

else{
  squareTurn=square;
  Turn=true;
  //////console.log(bullet_move);
  bullet_move="up";
  //////console.log(bullet_move);
  path_i=0;
  document.querySelector(".space").innerHTML=color[0];
  screen();
  disabling();
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

export function ahead (e){
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
  if(document.querySelector(`.${lastSelect[0]}`)!= null){
    let prev = document.querySelector(`.${lastSelect[0]}`);
    prev.classList.remove("active");}
    document.querySelector(".rotate").style.display="none";
    Undo();
  }

play();
counting();

let pause = document.querySelector(".pause");
pauseActive=true;
clearInterval(interval7); 
pause.innerHTML=`<i class="fa-solid fa-play"></i>`;

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
                //////console.log("hitting rico");
                if(hit_parent=="" || hit_parent!=detector[j].parentNode){
                  //////console.log(detector[j].id);
                  hit=1;
                  if((detector[j].parentNode.classList)[1]=="Ricochets"){
                    if( (detector[j].id=="left" || detector[j].id=="bottom")){
                    hit=0;
                    hitted();
                    if(mode=="hacker"){
            clearInterval(interval6);
            (detector[j].parentNode).style.background = "none";
            ((detector[j].parentNode).parentNode).removeChild(detector[j].parentNode);}
            else {
              clearInterval(interval3);
            clearInterval(interval2);
            clearInterval(interval5);
            clearInterval(interval4);
            clearInterval(interval6);
            clearInterval(interval7);
            // hitted();
            bullet.parentNode.removeChild(bullet);
            unSelect();
            delPlay();
            transform();
            }
                }
                }
                else if((detector[j].parentNode.classList)[1]=="Tank" && mode=="hacker"){
                  clearInterval(interval6);
                  hit=0;
            clearInterval(interval3);
            console.log("in takkkkkkkkkkkkk");
            detector[j].parentNode.classList.add("shivam");
            setTimeout(()=>{
              document.querySelector(".shivam").classList.remove("shivam");
            },160);
            break;
                }
                path_i=0;
                clearInterval(interval6);
                nextDirection(detector[j]);
                hit_parent = detector[j].parentNode; }
                break;
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
            // clearInterval(interval2);
            clearInterval(interval4);
            clearInterval(interval6);
            hit=0;
            bullet.style.top = (RicoInfo[i].top + RicoInfo[i].bottom) /2 -10+ "px";
            bullet.style.left = (RicoInfo[i].left + RicoInfo[i].right ) /2 -5 +"px";
            moveDirection(bullet);
            break; 
            }

            
        else if(Rico[i]!=null){
        if ((test && !Rico[i].className.includes("Rico") )){
          if(!Rico[i].className.includes("shivam") && mode=="hacker"){
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
            break;}
            }  } }
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
    else if((e.id)==="bottom"){ path_i--;} 
}

export function moveDirection (bullet){
    clearInterval(interval10);
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
interval7 = setInterval(()=>{
  let time = clock.innerHTML;
  time=parseInt(time)-1;
  if(time<0){
    clearInterval(interval7);
    clock.innerHTML=time;
    if(Turn){
    alert("other party BLUE  wins");}
    else{
      alert("other party PINK  wins");
    }
    time=20;
    clock.innerHTML=time;
  }
  else{
    clock.innerHTML=time;
  }
}, 1000);
}

// pause function 
pause.addEventListener("click" , countdown);
export function countdown(){
  if(!pauseActive){
    pauseActive=true;
    clearInterval(interval7);
    pause.innerHTML=`<i class="fa-solid fa-play"></i>`;
  }
  else{
    pauseActive=false;
    clearInterval(interval7);
    pause.innerHTML=`<i class="fa-solid fa-pause"></i>`;
    counting();
  }
}

export function checkPause(){
  if(pauseActive){
    pauseActive=false;
    clearInterval(interval7);
    pause.innerHTML=`<i class="fa-solid fa-pause"></i>`;
    counting();
  }
}
let interval10;
export let direct = [false,false,false,false];
//directional move
let tick = document.querySelectorAll(".directMove");
Array.from(tick).forEach((tk) =>{
tk.addEventListener("click", ()=> {

  if(tk.id =="left1"){
    document.querySelector("#right1").style.backgroundColor="initial";
    direct[1]=false;
    document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
     document.querySelector("#right2").style.backgroundColor="initial";
      direct[3]=false;
      if(!Turn){
      bullet_move="down";}
      else{
        bullet_move="up";
      }
  if(direct[0]){
    document.querySelector("#left1").style.backgroundColor="initial";
    direct[0]=false;
  }
  else{
  direct[0]=true;
  tk.style.backgroundColor = "blue";}}

  else if(tk.id=="right1"){
    document.querySelector("#left1").style.backgroundColor="initial";
    direct[0]=false;
    document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
      document.querySelector("#right2").style.backgroundColor="initial";
      direct[3]=false;
      if(!Turn){
      bullet_move="down";}
      else{
        bullet_move="up";
      }
    if(direct[1]){
      document.querySelector("#right1").style.backgroundColor="initial";
    direct[1]=false;
    }
    else{
    direct[1]=true;
    tk.style.backgroundColor = "blue";}
  }
  else if (tk.id=="left2"){
    document.querySelector("#right1").style.backgroundColor="initial";
    direct[1]=false;
    document.querySelector("#left1").style.backgroundColor="initial";
    direct[0]=false;
    document.querySelector("#right2").style.backgroundColor="initial";
    direct[3]=false;
    if(direct[2]){
      document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
    if(!Turn){
      bullet_move="down";}
      else{
        bullet_move="up";
      }
    }
    else{
    direct[2]=true;
    tk.style.backgroundColor = "blue";
    bullet_move="left";
    path_i=0;
  }

  }
  else if(tk.id=="right2"){
    document.querySelector("#left1").style.backgroundColor="initial";
    direct[0]=false;
    document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
    document.querySelector("#right1").style.backgroundColor="initial";
    direct[1]=false;
    if(direct[3]){
      document.querySelector("#right2").style.backgroundColor="initial";
    direct[3]=false;
    if(!Turn){
    bullet_move="down";}
    else{
      bullet_move="up";
    }
    }
    else{
    direct[3]=true;
    tk.style.backgroundColor = "blue";
    bullet_move="right";
    path_i=0;
  }

  }

})})

export function disabling(){
  document.querySelector("#left1").style.backgroundColor="initial";
    direct[0]=false;
    document.querySelector("#right1").style.backgroundColor="initial";
    direct[1]=false;
    document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
    document.querySelector("#right2").style.backgroundColor="initial";
    direct[3]=false;
    if(direct[2]){
      document.querySelector("#left2").style.backgroundColor="initial";
    direct[2]=false;
    if(!Turn){
      bullet_move="down";}
      else{
        bullet_move="up";
      }
}}

export function checkDirecting(bullet){
  if(direct[0]){
    interval10 = setInterval(() => {
      const currentLeft = parseInt(bullet.style.left);
      bullet.style.left = (currentLeft - bulletSpeed) + "px";
  }, 10);
  }
  else if(direct[1]){
    interval10 = setInterval(() => {
      const currentLeft = parseInt(bullet.style.left);
      bullet.style.left = (currentLeft + bulletSpeed) + "px";
  }, 10);
  }
  else if(direct[2]){
    interval10 = setInterval(() => {
      const currentLeft = parseInt(bullet.style.left);
      bullet.style.left = (currentLeft - bulletSpeed) + "px";
  }, 10);
  bullet_move="left";
  path_i=0;
  }
  else if(direct[3]){
    interval10 = setInterval(() => {
      const currentLeft = parseInt(bullet.style.left);
      bullet.style.left = (currentLeft + bulletSpeed) + "px";
  }, 10);
  bullet_move="right";
  path_i=0;
  }
}

let toggle = document.querySelector(".toggle");
toggle.addEventListener("click" , toggling);

    function toggling(){
          toggle.style.transition = " transform 0.3s ease-in";
          if(mode=="normal"){
          toggle.style.transform = "translate(100%)";
          mode="hacker";
          nTh();
      }
      else{
          toggle.style.transform = "translate(0%)";
          mode="normal";
          nTh();
      }
      }

        export function nTh(){
          // delPlay();
      if(mode=="normal"){
          document.querySelector(".history").style.display = "none";
          document.querySelector(".display").style.display = "none";
          document.querySelector(".direct1").style.display = "none";
        }
        else{
          document.querySelector(".history").style.display = "block";
          document.querySelector(".display").style.display = "block";
          document.querySelector(".direct1").style.display = "block";
          // auto();     //creating pieces
        }
        
        for(let j=0 ,i=0 ; i<pieces.length ; i++){
          let boxes = document.querySelector(`#box${player[i]}`);
          let square5 = document.querySelector(`.${pieces[i]}`);
          boxes.appendChild(square5);}
        delPlay();
        disabling();
        Undo();
        if(document.querySelector(".active")!=null  ){
        document.querySelector(".active").classList.remove("active");}
        Turn=true;
        squareTurn = square;
        path_i=0;
        bullet_move ="up";
        let time=20;
        clock.innerHTML=time;
        let pause = document.querySelector(".pause");
        pauseActive=true;
        clearInterval(interval7); 
        pause.innerHTML=`<i class="fa-solid fa-play"></i>`;
        play();
    }
