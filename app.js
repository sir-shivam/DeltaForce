import { ruleMove } from "./rules.js";
import { square } from "./pieces.js";
import { positions } from "./rules.js";
import { Undo } from "./rules.js";
let clicked =false;
export let lastSelect;
let box=document.querySelectorAll(".box");


const unSelect = () =>{
  let prev = document.querySelector(`.${lastSelect[0]}`);
  prev.classList.remove("active");
  Undo();

}


Array.from(square).forEach((sq) =>{
  sq.addEventListener("click", (e)=>{
    if(clicked){
      unSelect();
    }
    clicked=true;
    lastSelect=`${e.target.className}`;
    lastSelect= lastSelect.split(" ");
    lastSelect[0];
    console.log(lastSelect);
    e.target.classList.add("active");
    ruleMove(lastSelect);
})})