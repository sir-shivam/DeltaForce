
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"]
export let player=[1,2,3,4,5,60,61,62,63,57]
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
    let box1 = document.querySelector(`#box${player[i]}`);
    box1.appendChild(square[i]);
}
