import { color } from "./pieces.js";


export let positions=[];
let b_post = [8,7,9,1,-1];

function showStep() {
    for(let i =0 ; i<positions.length ; i++){
        ((document.getElementById(positions[i]))).style.backgroundColor= "#C7F6C7";
    }

}

export function Undo(){
    for(let i =0 ; i<positions.length ; i++){
        ((document.getElementById(positions[i]))).style.backgroundColor= "initial";
    }
} 

export function ruleMove (element) {
    if(element[1]=== "Titan" || element[1]=== "Tank" ) {
        let parentId = (document.querySelector(`.${element[0]}`)).parentElement.id;
        parentId=parentId.slice(3,6);
        console.log(parentId);
        for(let i=0 ; i<5 ; i++){
            if(element[0].includes(color[1])){
            positions[i]= parseInt(parentId) + b_post[i];
            }
            else{ positions[i]= parseInt(parentId) - b_post[i];}
            positions[i]=`box`+`${positions[i]}`;
            console.log(positions[i]);
        }
        showStep();
    }
}