import { color, pieces, playerMoving} from "./pieces.js";
import { ahead, checkPause, clock, intervaal8, interval7, interval9, lastSelect, pauseActive, play } from "./app.js";
import { unSelect } from "./app.js";
import { Shooting } from "./bullet.js";
import { transform } from "./app.js";
import { delPlay } from "./app.js";


export let positions=[];
let boxId=[];
let pieceId=[];
let angleInitial=[];
let angle=[];
let rotating=[];
let k=0;
let childParent=[];
let b_post;
let Turn1;
let val=[1440,1440,1440,1440];

//called from app.js to show rule and posible move
export function ruleMove (element , Turn ,e) {
    if(element[1]=== "Titan" || element[1]=== "Tank" || element[1]=== "Ricochets" || element[1]=== "SemiRicochets" || element[1]=== "Cannon" ) {
        let parentId = (document.querySelector(`.${element[0]}`)).parentElement.id;
        boxId[k] = parentId;
        console.log(boxId[k]);
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
            if(act_box.hasChildNodes()){
                if(lastSelect[1]=="Ricochets"){
                    // exchangeof position
                    if(!act_box.querySelector("div").className.includes("Titan") || !act_box.querySelector("div").className.includes("Cannon")  ){
                        act_box.querySelector("div").removeEventListener("click", ahead )
                        act_box.addEventListener("click", nextMove);
                    }
                }
            }
            else if(!act_box.hasChildNodes()){
            act_box.addEventListener("click" , nextMove ); }  // on click on the highlited box it will call nextMove 
        }
    }
}



function nextMove(){
    let child= document.querySelector(`.${lastSelect[0]}`);
    if(this.hasChildNodes()){
        let parId = child.parentNode;
        console.log(this.children[0]);
        parId.appendChild(this.children[0]);
    }
    checkPause();
    playerMoving();
    // screen();
    childParent[k]=this.id;
    rotating[k]=false;
    pieceId[k++]=lastSelect[0];
    console.log(lastSelect[0]);
    clearInterval(interval7);
    clock.innerHTML="20";
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
    pieceId[k] = lastSelect[0];
    console.log(pieceId[k]);
    rotating[k]=true;
    let last= document.querySelector(`.${lastSelect[0]}`);
    let m;
    if (lastSelect[0] == "SemiRicochets_pink"){
        m=0;
    }
    else if(lastSelect[0] == "Ricochets_pink"){
        m=1;
    }
    else if(lastSelect[0] == "SemiRicochets_blue"){
        m=2
    }
    else if(lastSelect[0] == "Ricochets_blue"){
        m=3
    }
    //console.log(val[m] , m , lastSelect);
    angleInitial[k]=val[m];
    console.log(angleInitial[k]);
    if(this.className=="right"){
        val[m]= parseInt(val[m]) + 90;
        //console.log("lefting");
    }
    else{
        //console.log("righting")
    val[m] = parseInt(val[m]) - 90;}
    angle[k++]=val[m];
    console.log(angle[k-1]);
    last.style.transform=`rotate(${val[m]}deg)`;
    playerMoving();
    Shooting(Turn1);
    // (document.querySelector(".rotate")).style.display= "none";  //always hidden
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
    if(rotating[k-1]){
        let child= document.querySelector(`.${pieceId[--k]}`);
        childParent[k] = child.parentElement.id;
        child.style.transform = `rotate(${angleInitial}deg)`;
    }
    else{
    let child= document.querySelector(`.${pieceId[--k]}`);
    childParent[k] = child.parentElement.id;
    (document.querySelector(`#${boxId[k]}`)).appendChild(child);}
    clock.innerHTML="20";
    clearInterval(intervaal8);
    clearInterval(interval9);
    clearInterval(interval7);
    delPlay();
    transform();}
}
function RedoMain() {
    if(childParent[k]!=null ){
    if(rotating[k]){
        let child= document.querySelector(`.${pieceId[k]}`);
        child.style.transform=`rotate(${angle[k]}deg)`;
    }
    else {let child= document.querySelector(`.${pieceId[k]}`);
    (document.querySelector(`#${childParent[k++]}`)).appendChild(child);
    }
  clearInterval(intervaal8);
  clearInterval(interval9);
  clearInterval(interval7);
  clock.innerHTML="20";
  delPlay();
    transform();}
}

export function screen(){
    let d1 = document.createElement("div");
    d1.classList.add("d1");
    let d2 = document.createElement("div");
    d2.classList.add("d2");
    d2.innerHTML=pieceId[k-1];
    let d3 = document.createElement("div");
    d3.classList.add("d3");
    d3.innerText=boxId[k-1];
    let d4 = document.createElement("div");
    d4.classList.add("d4");
    d4.innerText=childParent[k-1];
    d1.appendChild(d2);
    d1.appendChild(d3);
    d1.appendChild(d4);
    (document.querySelector(".display")).appendChild(d1);
}