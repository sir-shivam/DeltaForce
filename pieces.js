
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"];
export let player=[32,58,1,3,4,60,23,27,28,57];
export let square=[];
export let pieces=[];
export let detector=[];


for (let  i = 0; i < arr.length; i++) {
    let j;
    if(i>4){j=0}
    else{j=1};
    square[i]=document.createElement("div");
    square[i].classList.add(`${arr[i]}_${color[j]}`);
    pieces[i]=(`${arr[i]}_${color[j]}`);
    square[i].classList.add(arr[i]);
    square[i].style.backgroundColor=`${color[j]}`;
    square[i].innerText= arr[i];
    
}

for (let  i = 0; i < 30; i++) {
    detector[i]=document.createElement("div");
    detector[i].classList.add("detector");
    detector[i].id=("detector_left");
}

for(let j=0 ,i=0 ; i<arr.length ; i++){
    let boxes = document.querySelector(`#box${player[i]}`);
    boxes.appendChild(square[i]);

    if((square[i].className).includes("Ricochets"))
        {   
            detector[j].id=("top");
            square[i].appendChild(detector[j++]);
            detector[j].id=("right");
            square[i].appendChild(detector[j++]);
    }
    if((square[i].className).includes("Semi"))
        {
            detector[j].id=("left");
            square[i].appendChild(detector[j++]);
            detector[j].id=("bottom");
            square[i].appendChild(detector[j++]);
        }
    }

    // reset function
    let reset = document.querySelector(".reset");
    reset.addEventListener("click", reseting);
    
export function reseting(){
        window.location.reload(true);
}
