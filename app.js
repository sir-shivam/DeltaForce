console.log("started");
// function renderBoard() {
//     const boardElement = document.querySelector(".board");
//     boardElement.innerHTML = ''; // Clear existing content
//     // renderBoard(); // Initial rende
// }
// renderBoard(); // Initial render;


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