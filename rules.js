import { color } from "./pieces.js";
import { lastSelect } from "./app.js";
import { unSelect } from "./app.js";
import { Shooting } from "./bullet.js";
import { transform } from "./app.js";
import { delPlay } from "./app.js";


export let positions=[];
let b_post;
let Turn1;


//this fuction is called from app.js to show rule and posible move
export function ruleMove (element , Turn) {
    if(element[1]=== "Titan" || element[1]=== "Tank" || element[1]=== "Ricochets" || element[1]=== "SemiRicochets" || element[1]=== "Cannon" ) {
        let parentId = (document.querySelector(`.${element[0]}`)).parentElement.id;
        parentId=parentId.slice(3,6);
        console.log(parentId);
        if(parentId%8 === 0){
            b_post=[8,-1 , 7 , -8 ,-9];
        }
        else if (parentId%8 === 1){
            b_post=[1,-8 ,-7 , 8 ,9];
        }
        else{
            b_post= [1,-1,8,7,9,-8,-7,-9];
        }
       
        for(let i=0 ; i<8 ; i++){
            if(element[1] === "Cannon"){
                if(element[0].includes(color[0])){
                    positions[i]= 57+i;  
                }
                else{
                    positions[i]= 1+i; 
                }
            }
            else{
            positions[i]= parseInt(parentId) + b_post[i];}
            positions[i]=`box`+`${positions[i]}`;
        }

        
        showStep(Turn); // calling showstep funtion to highlet positions
        console.log("show act");
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
            if(!act_box.hasChildNodes()){
            act_box.addEventListener("click" , nextMove ); }  // on click on the highlited box it will call nextMove 
        }
    }
}

function nextMove(){
    console.log(this);                       //clicked position
    console.log(lastSelect[0]);
    let child= document.querySelector(`.${lastSelect[0]}`);
    this.appendChild(child);
    Shooting(Turn1);
    unSelect();
    transform();
    // delPlay();
    
}

export function Undo(){
    for(let i =0 ; i<positions.length ; i++){
        if((document.getElementById(positions[i]))!=null){
        ((document.getElementById(positions[i]))).style.backgroundColor= "initial";
        let act_box = ((document.getElementById(positions[i])));
        act_box.removeEventListener("click" , nextMove);        //remove prev posible move from clicking
    }}
    delPlay();
    (document.querySelector(".rotate")).style.display= "none";  //always hidden

} 

function rotate() {
    console.log("rotate");
    (document.querySelector(".rotate")).style.display= "block";
    (document.querySelector(".left")).addEventListener("click", action);
    (document.querySelector(".right")).addEventListener("click",action);
}

function action (){
    console.log(this.className);
    let last= document.querySelector(`.${lastSelect[0]}`);
    last.style.transform="rotate(90deg)";
    Shooting();
    unSelect();
}