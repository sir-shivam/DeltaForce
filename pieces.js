
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"];
export let player=[32,58,1,3,4,60,23,27,28,57];
export let square=[];
export let pieces=[];
export let detector=[];
const sound1 = new Audio("./sound/movesound.mp3");
const hit1 = new Audio("./sound/hit.mp3");
sound1.preload="auto";
hit1.preload="auto";

export function playerMoving(){
    sound1.play();
}

export function hitted (){
    hit1.play();
}


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
            
            detector[j].id=("left");
            square[i].appendChild(detector[j++]);
            detector[j].id=("bottom");
            square[i].appendChild(detector[j++]);
    }
    // if((square[i].className).includes("Semi"))
    //     {
    //     }
    }

//     <div class="rotate">
//     <div class="rot1">
//     <div class="left">left</div>
//     <div class="right">right</div>
// </div>
// </div>

export let revolve = document.createElement("div");
revolve.classList.add("rotate");
let rev1 = document.createElement("div");
rev1.classList.add("rot1");
let left = document.createElement("div");
let right = document.createElement("div");
left.classList.add("left");
left.innerHTML="left";
right.classList.add("right");
right.innerHTML= "right";                        
rev1.appendChild(left);
rev1.appendChild(right);
revolve.appendChild(rev1);

    // reset function
    let reset = document.querySelector(".reset");
    reset.addEventListener("click", reseting);
    
export function reseting(){
        window.location.reload(true);
}
