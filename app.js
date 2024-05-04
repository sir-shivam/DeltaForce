console.log("started");
// function renderBoard() {
//     const boardElement = document.querySelector(".board");
//     boardElement.innerHTML = ''; // Clear existing content
//     // renderBoard(); // Initial rende
// }
// renderBoard(); // Initial render;
let box=document.querySelectorAll(".box")
let Tbox;

let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon"];
let square=[];
for (let  i = 0; i < arr.length; i++) {
    square[i]=document.createElement("div");
    square[i].classList.add(arr[i]);
}
console.log(square[2].className);
box62.appendChild(square[2]);
box55.appendChild(square[1]);
box51.appendChild(square[3]);
box64.appendChild(square[4]);
box60.appendChild(square[0]);


const nextMove = ()=>{
    let Nbox = document.getElementById(`${Tbox}`);
        Nbox.appendChild(square[2]);}
// Array.from(square).forEach((button) => {
//     button.addEventListener("click", (e) => {

//     }
// })

square[2].addEventListener("click", ()=>{
    console.log("clicked on a piece");
    square[2].classList.add("active");
    Array.from(box).forEach((button) => {
        for(let i=1 ; i!= 0 ; i--){
        button.addEventListener("click", (e)=>{
            e.target.appendChild(square[2]);
            square[2].classList.remove("active");
        })}
    })
    
})
