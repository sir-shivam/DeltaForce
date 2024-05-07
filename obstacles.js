import { interval } from "./bullet.js";
import { interval2 } from "./collission.js";
import { pieces } from "./pieces.js"; 
//   "Titan_blue"   ,"Tank_blue"  ,"Ricochets_blue"  ,"SemiRicochets_blue"  ,"Cannon_blue"  ,"Titan_pink"  ,"Tank_pink"  ,"Ricochets_pink"  ,"SemiRicochets_pink"  ,"Cannon_pink"


// console.log(pieces);
export let interval3;
let Rico = [];
let RicoInfo = [];
let bullInfo;
// console.log(document.querySelector(`.${pieces[1]}`).getBoundingClientRect());
export function ricoPosition(){

    //  Rico[0] = (document.querySelector(`.Ricochets_pink`));
    //  Rico[1] = (document.querySelector(`.Ricochets_blue`));
    //  Rico[2] = (document.querySelector(`.SemiRicochets_pink`));
    //  Rico[3] = (document.querySelector(`.SemiRicochets_blue`));
     for(let i =0 ; i<pieces.length; i++){
        
        Rico[i] = document.querySelector(`.${pieces[i]}`);
        RicoInfo[i]= Rico[i].getBoundingClientRect();
     }
}

export function comparing (bullet){
    ricoPosition();
    console.log(bullet);
    interval3 = setInterval(()=>{
        let i=0;
        console.log(bullet.getBoundingClientRect());
        bullInfo=bullet.getBoundingClientRect();
        for( i =0 ; i< Rico.length ; i++){
        let test;
        if(!pieces[i].includes("Cannon") ){
        test = (bullInfo.top > RicoInfo[i].top && 
        bullInfo.top < RicoInfo[i].bottom && 
        bullInfo.right > RicoInfo[i].left &&   
        bullInfo.left < RicoInfo[i].right );
        }
        if(test){
            clearInterval(interval3);
            clearInterval(interval);
            clearInterval(interval2);
            console.log("collide yahuuuu");
            console.log (Rico[i]);
            // bullet.parentNode.removeChild(bullet);
            return (Rico[i]);
        }
        }

    }, 10);
}

export function moveLeft (){
    
}
