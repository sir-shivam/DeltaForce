
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"]
export let player=[55,10,44,12,4,51,52,50,54,64]
export let square=[];


for (let  i = 0; i < arr.length; i++) {
    let j;
    if(i>4){j=0}
    else{j=1};
    square[i]=document.createElement("div");
    square[i].classList.add(`${arr[i]}_${color[j]}`);
    square[i].classList.add(arr[i]);
    square[i].style.backgroundColor=`${color[j]}`;
    console.log(color[j]);
    square[i].innerText= arr[i];
    
}

for(let i=0 ; i<arr.length ; i++){
    let boxes = document.querySelector(`#box${player[i]}`);
    boxes.appendChild(square[i]);
}