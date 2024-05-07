
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"]
export let player=[8,10,45,13,4,61,51,50,16,64]
export let square=[];
export let pieces=[];

for (let  i = 0; i < arr.length; i++) {
    let j;
    if(i>4){j=0}
    else{j=1};
    square[i]=document.createElement("div");
    square[i].classList.add(`${arr[i]}_${color[j]}`);
    pieces[i]=(`${arr[i]}_${color[j]}`);
    square[i].classList.add(arr[i]);
    square[i].style.backgroundColor=`${color[j]}`;
    console.log(color[j]);
    square[i].innerText= arr[i];
    
}

for(let i=0 ; i<arr.length ; i++){
    let boxes = document.querySelector(`#box${player[i]}`);
    boxes.appendChild(square[i]);
}