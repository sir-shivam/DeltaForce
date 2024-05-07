import { ruleMove } from "./rules.js";
import { player, square } from "./pieces.js";
import { Undo } from "./rules.js";
export let lastSelect;
export let Turn = true ;

let clicked =false;
let square1=square;
square1 = square1.splice(0,5);
let squareTurn = square;


export function transform(){
if(Turn){
  squareTurn=square1;
  Turn=false;
  play();
}

else{
  squareTurn=square;
  Turn=true;
  play();
}
}

export function play(){
Array.from(squareTurn).forEach((sq) =>{
  sq.addEventListener("click", ahead )})
}

function ahead (e){
  if(clicked){
    unSelect();
  }
  clicked=true;
  lastSelect=`${e.target.className}`;
  lastSelect= lastSelect.split(" ");        //lastselect contains the target class
  e.target.classList.add("active");
  ruleMove(lastSelect ,Turn);
}


export function delPlay(){
  Array.from(squareTurn).forEach((sq) =>{
    sq.removeEventListener("click", ahead )})
  }
  
  
export const unSelect = () =>{
    let prev = document.querySelector(`.${lastSelect[0]}`);
    prev.classList.remove("active");
    Undo();
  
  }

play();