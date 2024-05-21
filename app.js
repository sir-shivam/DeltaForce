import { ruleMove } from "./rules.js";
import { player, square } from "./pieces.js";
import { Undo } from "./rules.js";
export let lastSelect;
export let Turn = true ;
export let path_i= 0;
export let bullet_move ="up";
let clicked =false;
let square1=square;
square1 = square1.splice(0,5);
let squareTurn = square;


export function transform(){
if(Turn){
  squareTurn=square1;
  Turn=false;
  bullet_move ="down";
  path_i=0;
  play();
}

else{
  squareTurn=square;
  Turn=true;
  bullet_move="up";
  path_i=0;
  play();
}
}

// // // console.log((document.querySelector("#box64")).getBoundingClientRect());
// // // console.log((document.querySelector("#box1")).getBoundingClientRect());

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