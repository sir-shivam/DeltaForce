import { color, pieces, playerMoving, revolve } from "./pieces.js";
import { checkPause, clock, intervaal8, interval7, interval9, lastSelect, pauseActive, play } from "./app.js";
import { unSelect } from "./app.js";
import { Shooting } from "./bullet.js";
import { transform } from "./app.js";
import { delPlay } from "./app.js";


export let positions=[];
let boxId=[];
let pieceId=[];
let k=0;
let childParent=[];
let b_post;
let Turn1;
let val = 360;

//called from app.js to show rule and posible move
export function ruleMove (element , Turn ,e) {
    if(element[1]=== "Titan" || element[1]=== "Tank" || element[1]=== "Ricochets" || element[1]=== "SemiRicochets" || element[1]=== "Cannon" ) {
        let parentId = (document.querySelector(`.${element[0]}`)).parentElement.id;
        boxId[k] = parentId;
        parentId=parentId.slice(3,6);
        if(element[1] === "Cannon"){
            b_post=[1,-1];
        }
        if(parentId%8 === 0){
            if(element[1] === "Cannon"){
                b_post=[-1];
            }
            else{b_post=[8,-1 , 7 , -8 ,-9];}
        }
        else if (parentId%8 === 1){
            
            if(element[1] === "Cannon"){
                b_post=[1];
            }
            else{b_post=[1,-8 ,-7 , 8 ,9];}
   
        }
        else{
            if(element[1] === "Cannon"){
                b_post=[1,-1];
            }
            else {b_post= [1,9,-7,8,-8,7,-1,-9];}
        }

       
        for(let i=0 ; i<8 ; i++){
            positions[i]= parseInt(parentId) + b_post[i];
            positions[i]=`box`+`${positions[i]}`;
        }
        showStep(Turn);
        if( element[1]=== "Ricochets" || element[1]=== "SemiRicochets"  ){
            document.querySelector(`.${element[0]}`).appendChild(revolve);
            console.log("appppppending");
            rotate();
        }  
    }
}

//to highlight next step
function showStep(Turn) {
    Turn1=Turn;
    for(let i =0 ; i<positions.length ; i++){                //posiontions is array of all posible steps
        if((document.getElementById(positions[i]))!=null){    
            let act_box = ((document.getElementById(positions[i])));
            act_box.style.backgroundColor= "#C7F6C7";
            if(!act_box.hasChildNodes()){
            act_box.addEventListener("click" , nextMove ); }  // on click on the highlited box it will call nextMove 
        }
    }
}

function nextMove(){
    checkPause();
    playerMoving();
    pieceId[k++]=lastSelect[0];
    clearInterval(interval7);
    clock.innerHTML="20";
    let child= document.querySelector(`.${lastSelect[0]}`);
    this.appendChild(child);
    Shooting(Turn1);
    unSelect();
}

export function Undo(){
    for(let i =0 ; i<positions.length ; i++){
        if((document.getElementById(positions[i]))!=null){
        ((document.getElementById(positions[i]))).style.backgroundColor= "initial";
        let act_box = ((document.getElementById(positions[i])));
        act_box.removeEventListener("click" , nextMove);        //remove prev posible move from clicking
    }}
    
} 

function rotate() {
    (document.querySelector(".rotate")).style.display= "block";
    (document.querySelector(".left")).addEventListener("click", action);
    (document.querySelector(".right")).addEventListener("click",action);
}

function action (){
    console.log(this.className);
    let last= document.querySelector(`.${lastSelect[0]}`);
    if(this.className="left"){
        val = parseInt(val) - 90;
    }
    else{
    val = parseInt(val) + 90;}
    last.style.transform=`rotate(${val}deg)`;
    playerMoving();
    Shooting(Turn1);
    (document.querySelector(".rotate")).style.display= "none";  //always hidden
    unSelect();
    // play();
    // transform();
}

let Un = document.querySelector(".undo");
let Rd = document.querySelector(".redo");
Un.addEventListener("click",UndoMain);
Rd.addEventListener("click",RedoMain);

function UndoMain() {
    if(k>0){
    let child= document.querySelector(`.${pieceId[--k]}`);
    childParent[k] = child.parentElement.id;
    (document.querySelector(`#${boxId[k]}`)).appendChild(child);
    clock.innerHTML="20";
    clearInterval(intervaal8);
    clearInterval(interval9);
    clearInterval(interval7);
    delPlay();
    transform();}
}
function RedoMain() {
    if(childParent[k]!=null ){
    let child= document.querySelector(`.${pieceId[k]}`);
    (document.querySelector(`#${childParent[k++]}`)).appendChild(child);
  clearInterval(intervaal8);
  clearInterval(interval9);
  clearInterval(interval7);
  clock.innerHTML="20";
  delPlay();
    transform();}
}