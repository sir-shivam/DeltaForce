
export let arr = ["Titan","Tank","Ricochets","SemiRicochets","Cannon","Titan","Tank","Ricochets","SemiRicochets","Cannon"];
export let color=["pink" , "blue"];
export let player=[7,29,23,1,5,58,36,42,64,60];
export let square=[];
export let pieces=[];
export let detector=[];
let j=0;

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

    if(i>4){j=0}
    else{j=1};
    square[i]=document.createElement("div");
    square[i].classList.add(`${arr[i]}_${color[j]}`);
    pieces[i]=(`${arr[i]}_${color[j]}`);
    square[i].classList.add(arr[i]);
    

    if(arr[i]=="Ricochets"){
        square[i].style.backgroundImage = `linear-gradient(to top right, ${color[j]} 50% , transparent 0%)`;
    }
    else if(arr[i]=="SemiRicochets"){
        square[i].style.backgroundImage = `linear-gradient(to bottom left, transparent 45%, ${color[j]} 45%, ${color[j]} 55%, transparent 0%)`;    
    }
    else{
    square[i].style.backgroundColor=`${color[j]}`;}
    square[i].innerText= arr[i];
    
}

for (let  i = 0; i < 30; i++) {
    detector[i]=document.createElement("div");
    detector[i].classList.add("detector");
    detector[i].id=("detector_left");
}
for(let j=0, i=0 ; i<arr.length ; i++){
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
    else if((square[i].className).includes("Tank") && i<5 ){
        detector[j].id=("top");
        square[i].appendChild(detector[j++]);   
    }
    else if((square[i].className).includes("Tank")&& i>4){
        detector[j].id=("bottom");
            square[i].appendChild(detector[j++]);
    }
    }

//creating extra Richochits
export function createRico(classes , boxno){
    if(classes.includes("pink")){
        document.querySelector(`#${boxno}`).appendChild(square[7]);
    }
    else{
    document.querySelector(`#${boxno}`).appendChild(square[2]);
} 
}

// reset function
let reset = document.querySelector(".reset");
reset.addEventListener("click", reseting);
    
export function reseting(){
        window.location.reload(true);
}
