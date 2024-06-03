import { createRico, playerMoving} from "./pieces.js";
import { ahead, checkPause, clock, interval8, interval7, interval9, lastSelect, mode, deletedFlag, deletedPiece, deletedPost, normal } from "./app.js";
import { unSelect } from "./app.js";
import { Shooting } from "./bullet.js";
import { transform } from "./app.js";
import { delPlay } from "./app.js";


export let positions=[];
export let k=0;
export let isNormal="normal";
let boxId=[];
let pieceId=[];
let angleInitial=[];
let valoOfm=[];
let angle=[];
let rotating=[];
let childParent=[];
let b_post;
let Turn1;
let val=[1440,1440,1440,1440];

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
            if(act_box.hasChildNodes()){
                if(lastSelect[1]=="Ricochets" && mode=="hacker"){
                    // exchange of position
                    if(!act_box.querySelector("div").className.includes("Titan") ){
                        if(!act_box.querySelector("div").className.includes("Cannon")){
                            act_box.querySelector("div").removeEventListener("click", ahead )
                            act_box.addEventListener("click", nextMove);
                            act_box.style.backgroundColor= "#C7F6C7";
                        }
                    }
                }
            }
            else if(!act_box.hasChildNodes()){
                act_box.style.backgroundColor= "#C7F6C7";
            act_box.addEventListener("click" , nextMove ); }  // on click on the highlited box it will call nextMove 
        }
    }
}

let exchange=[];

function nextMove(){
    delPlay();
    let child= document.querySelector(`.${lastSelect[0]}`);
    if(this.hasChildNodes()){
        exchange[k]=true;
        let parId = child.parentNode;
        parId.appendChild(this.children[0]);
    }
    checkPause();
    playerMoving();
    isNormal="normal";
    childParent[k]=this.id;
    rotating[k]=false;
    pieceId[k++]=lastSelect[0];
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
    isNormal="normal";
    pieceId[k] = lastSelect[0];
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
    valoOfm[k]=m;
    angleInitial[k]=val[m];
    if(this.className=="right"){
        val[m]= parseInt(val[m]) + 90;
    }
    else{
    val[m] = parseInt(val[m]) - 90;}
    angle[k++]=val[m];
    last.style.transform=`rotate(${val[m]}deg)`;
    playerMoving();
    Shooting(Turn1);
    unSelect();
}

let Un = document.querySelector(".undo");
let Rd = document.querySelector(".redo");
Un.addEventListener("click",UndoMain);
Rd.addEventListener("click",RedoMain);

function UndoMain() {
    if(k>0){
        isNormal="undo";
        --k;
        if(deletedFlag[k]){
            createRico(deletedPiece[k] , deletedPost[k]);
        }
     if(rotating[k]){
        // console.log("rotatied",angleInitial);
        let child= document.querySelector(`.${pieceId[k]}`);
        childParent[k] = child.parentElement.id;
        child.style.transform = `rotate(${angleInitial[k]}deg)`;
        val[valoOfm[k]]=angleInitial[k];
    }
    else {
        let child= document.querySelector(`.${pieceId[k]}`);
        if(exchange[k]){
            child.parentNode.appendChild((document.querySelector(`#${boxId[k]}`)).children[0]);
        }
    childParent[k] = child.parentElement.id;
    (document.querySelector(`#${boxId[k]}`)).appendChild(child);}

    
    
    clearInterval(interval8);
    clearInterval(interval9);
    clearInterval(interval7);
    delPlay();
    transform();}
}

function RedoMain() {
    if(childParent[k]!=null ){
        isNormal="redo";
    if(rotating[k]){
        let child= document.querySelector(`.${pieceId[k]}`);
        child.style.transform=`rotate(${angle[k]}deg)`;
        val[valoOfm[k]]=angle[k];
    }
    else {let child= document.querySelector(`.${pieceId[k]}`);
    if(exchange[k]){
        child.parentNode.appendChild((document.querySelector(`#${childParent[k]}`)).children[0]);
    }
    (document.querySelector(`#${childParent[k]}`)).appendChild(child);
    }

    if(deletedFlag[k]){
        document.querySelector(`.${deletedPiece[k]}`).remove();
    }
    k++;
  clearInterval(interval8);
  clearInterval(interval9);
  clearInterval(interval7);
  delPlay();
    transform();}
}
let stepArray=[];
let step=0;
export function screen(){
    if(mode=="hacker"){
        let alpha=k;
        if(isNormal=="normal"){alpha=alpha-1;}
        else if(isNormal=="redo"){alpha=alpha-1;}
    let d1 = document.createElement("div");
    d1.classList.add("d1");
    let d2 = document.createElement("div");
    d2.classList.add("d2");
    d2.innerHTML=pieceId[alpha];
    stepArray[step++]=pieceId[alpha];
    let d3 = document.createElement("div");
    d3.classList.add("d3");
    if(isNormal=="undo"){
        if(rotating[alpha]){
            d3.innerText=angleInitial[alpha]%360;
        }
        else{
        d3.innerText=childParent[alpha];}
        stepArray[step++]=childParent[alpha];
    }
    else{
        d3.innerText=boxId[alpha];
        stepArray[step++]=boxId[alpha];
        
    }
    let d4 = document.createElement("div");
    d4.classList.add("d4");
    if(isNormal=="undo"){
        d4.innerText=boxId[alpha];
        stepArray[step++]=boxId[alpha];
    }
    else{
        if(rotating[alpha]){
            d4.innerText=angle[alpha]%360;
        }
        else{
        d4.innerText=childParent[alpha];}
        stepArray[step++]=childParent[alpha];
    }
    d1.appendChild(d2);
    d1.appendChild(d3);
    d1.appendChild(d4);
    (document.querySelector(".display")).appendChild(d1);
}
}

export function resetAll2(){
boxId=[];
pieceId=[];
angleInitial=[];
angle=[];
rotating=[];
k=0;
childParent=[];
val=[1440,1440,1440,1440];
} 

document.querySelector(".alert0").addEventListener("click", ()=>{
    document.querySelector(".alert1").style.display="none";
    window.location.reload(true);
})

document.querySelector(".download0").addEventListener("click", ()=> {
    const strg =JSON.stringify(stepArray);
    localStorage.setItem("gameHistory", strg);
    console.log("saved");

        // const retrived =JSON.parse(localStorage.getItem("gameHistory"));
        // console.log(retrived);
})

export function normal2 (){
    let b = k;
    while(b!=(k+20)){
    console.log("heloo");
    childParent[b]=null;
    rotating[b]=null;
    pieceId[b]=null;
    angleInitial[b]=null;
    angle[b]=null;
    exchange[b]=null;
    normal(b);
    b++;
    }
}