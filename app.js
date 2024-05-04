console.log("started");
let check = false;
let box=document.querySelectorAll(".box")
let Tbox;
let nextMove= (e)=>{
Array.from(box).forEach((button) => {
    if (!check){
    button.addEventListener("click", (ee)=>{
        ee.target.appendChild(e);
        e.classList.remove("active");
        console.log(ee.target.className);
        console.log(e.className);
        check=true;
        box.removeEventListener("click");
    })}
})}

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




Array.from(square).forEach((sq) =>{
  sq.addEventListener("click", (e)=>{
    console.log(e.target.className);
    e.target.classList.add("active");
    nextMove(e.target);
})})
