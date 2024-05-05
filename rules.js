import { color } from "./pieces.js";

export let positions=[];
let b_post = [1,-1,8,7,9];

//to highlight next step
function showStep() {
    for(let i =0 ; i<positions.length ; i++){                //posiontions is array of all posible steps
        if((document.getElementById(positions[i]))!=null){    
            let act_box = ((document.getElementById(positions[i])))
            act_box.style.backgroundColor= "#C7F6C7";
            act_box.addEventListener("click" , nextMove );   
        }
    }
}

function nextMove(){
    
}

export function Undo(){
    for(let i =0 ; i<positions.length ; i++){
        if((document.getElementById(positions[i]))!=null){
        ((document.getElementById(positions[i]))).style.backgroundColor= "initial";
        let act_box = ((document.getElementById(positions[i])));
        act_box.removeEventListener("click" , nextMove);        //remove prev posible move from clicking
    }}
    (document.querySelector(".rotate")).style.display= "none";  //always hidden

} 

function rotate() {
    console.log("rotate");
    (document.querySelector(".rotate")).style.display= "block";
}

export function ruleMove (element) {
    if(element[1]=== "Titan" || element[1]=== "Tank" || element[1]=== "Ricochets" || element[1]=== "SemiRicochets" || element[1]=== "Cannon" ) {
        let parentId = (document.querySelector(`.${element[0]}`)).parentElement.id;
        parentId=parentId.slice(3,6);
        console.log(parentId);
        let j;
        if(element[1]=== "Cannon"){
            j=2
        }
        else{
            j=5;
        }
        for(let i=0 ; i<j ; i++){
            if(element[0].includes(color[1])){
            positions[i]= parseInt(parentId) + b_post[i];
            }
            else{ positions[i]= parseInt(parentId) - b_post[i];}
            positions[i]=`box`+`${positions[i]}`;
            console.log(positions[i]);
        }
        showStep();
        if( element[1]=== "Ricochets" || element[1]=== "SemiRicochets"  ){
            rotate();
        }
    }
}



