
import { square } from "./pieces.js";

let check = false;
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


Array.from(square).forEach((sq) =>{
  sq.addEventListener("click", (e)=>{
    console.log(e.target.className);
    e.target.classList.add("active");
    // nextMove(e.target ,sq);
})})