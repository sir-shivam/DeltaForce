import { ruleMove } from "./rules.js";
import { player, square } from "./pieces.js";
import { positions } from "./rules.js";
import { Undo } from "./rules.js";

console.log(box1.offsetTop  , 1234);
console.log(box64.offsetHeight, 1234);

let clicked =false;
export let lastSelect;
let box=document.querySelectorAll(".box");
export let Turn = true ;
let square1=square;
square1 = square1.splice(0,5);
console.log(square1 , "hello")
let squareTurn = square;
console.log(squareTurn , "hello2")


export function transform(){
if(Turn){
  squareTurn=square1;
  Turn=false;
 
  console.log(squareTurn , "hello2 true")
  play();
}
else{
  squareTurn=square;
  Turn=true;
 
  console.log(squareTurn , "hello flase")
  play();
}
}

export function play(){
Array.from(squareTurn).forEach((sq) =>{
  console.log(squareTurn , "hello 1111")
  sq.addEventListener("click", ahead )})
}

function ahead (e){
  if(clicked){
    unSelect();
  }
  clicked=true;
  lastSelect=`${e.target.className}`;
  lastSelect= lastSelect.split(" ");
  // lastSelect[0];
  console.log(lastSelect);                  //lastselect contains the target class
  e.target.classList.add("active");
  ruleMove(lastSelect ,Turn);
}


export function delPlay(){
  Array.from(squareTurn).forEach((sq) =>{
    console.log(squareTurn , "hello 1111")
    sq.removeEventListener("click", ahead )})
  }
  
export const unSelect = () =>{
    let prev = document.querySelector(`.${lastSelect[0]}`);
    prev.classList.remove("active");
    Undo();
  
  }

play();