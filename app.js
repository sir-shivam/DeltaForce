import { ruleMove } from "./rules.js";
import { square } from "./pieces.js";
import { positions } from "./rules.js";
import { Undo } from "./rules.js";
let clicked =false;
export let lastSelect;
let box=document.querySelectorAll(".box");

// let nextMove= (e ,sq)=>{
// Array.from(box).forEach((button) => {
//     if (!check){
//     button.addEventListener("click", (ee)=>{
//         ee.target.appendChild(e);
//         e.classList.remove("active");
//         console.log(ee.target.className);
//         console.log(e.className);
//         check=true;
//         button.removeEventListener("click",(ee)=>{});
//         sq.removeEventListener("click", (e)=>{});
//     })}
// })}

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