// import { bullet_move} from "./app.js";
import { bulletSpeed } from "./bullet.js";
import { checkCollision, interval2 } from "./collission.js";
import { detector, pieces } from "./pieces.js"; 
//   "Titan_blue"   ,"Tank_blue"  ,"Ricochets_blue"  ,"SemiRicochets_blue"  ,"Cannon_blue"  ,"Titan_pink"  ,"Tank_pink"  ,"Ricochets_pink"  ,"SemiRicochets_pink"  ,"Cannon_pink"
export let interval3;
export let interval4;
export let interval5;
export let interval6;
let bullet_move = "up";
let Rico = [];
let RicoInfo = [];
let bullInfo;
let detectorInfo=[];
let hit=0;
let hit_parent;
let path_i = 0;
let path= ["up","right","down","left"];
let test;

export function ricoPosition(){
     for(let i =0 ; i<detector.length; i++){
        Rico[i] = document.querySelector(`.${pieces[i]}`);
        if(Rico[i] != null){
        RicoInfo[i]= Rico[i].getBoundingClientRect();}
        detectorInfo[i]= detector[i].getBoundingClientRect();
     }
}

export function comparing (bullet){
    ricoPosition();
    interval6 = setInterval(()=> {
        let test2;
        for(let j =0 ; j< detector.length ; j++){
        test2= (bullInfo.top > detectorInfo[j].top  && 
            bullInfo.top < detectorInfo[j].bottom   && 
            bullInfo.right  >   detectorInfo[j].left &&   
            bullInfo.left < detectorInfo[j].right );
        
            if(test2 ){
                console.log("hitting rico");
                console.log(detector[j].parentNode)
    
                if(hit_parent=="" || hit_parent!=detector[j].parentNode){
                hit=1;
                clearTimeout(interval6);
                hit_parent = detector[j].parentNode; 
                nextDirection(detector[j]);}
            //     if(hit>6){
            //     clearInterval(interval2);
            // clearInterval(interval3);
            // clearInterval(interval4);
            // clearInterval(interval5);
            //     }
            }
        
        }

    },10);
    
    interval3 = setInterval(()=>{
        // console.log("checking again");
        let i=0;
        test;
        bullInfo=bullet.getBoundingClientRect();
        for( i =0 ; i< pieces.length ; i++){
        if(!pieces[i].includes("Cannon") ){
            // console.log("check");
        test = ( bullInfo.top < RicoInfo[i].bottom -35  && 
        bullInfo.bottom > RicoInfo[i].top +35  && 
        bullInfo.right  > RicoInfo[i].left +35  &&   
        bullInfo.left < RicoInfo[i].right -35);
        }
        
            
            // console.log(path[path_i]);
        //   if(test){  console.log(detector[i]);
        //     console.log(hit);
        //     console.log(test);
        //   }

        if(test && hit==1){
            clearInterval(interval3);
            clearInterval(interval2);
            // clearInterval(interval3);
            clearInterval(interval4);
            clearTimeout(interval6);
            // clearInterval(interval5);
            // clearInterval(interval2);
            // clearInterval(interval4);
            console.log("collide yahuuuu");
            // // console.log(RicoInfo[i]);
            // // console.log(bullet.getBoundingClientRect());
            // // console.log (Rico[i]);
            // Rico[i].style.transform = "rotate(90deg)"
            // // console.log(RicoInfo[i]);
            // // console.log(bullet.getBoundingClientRect());
            //call a function checking posrittion of entering
            hit=0;
            test=false;
            
            moveDirection(bullet);
            // moveLeft(bullet);
            comparing(bullet);   //to check again 
            
            
            break;

        }


        else if (test && hit==0 ){
            console.log("different part");
            console.log(RicoInfo[i]);
            console.log(Rico[i]); 
            console.log(bullInfo);
                
           }
        //     clearInterval(interval4);
        
        // else if (test && (!RicoInfo[i].includes("Rico"))) {
        //     // clearInterval(interval);
        //     clearInterval(interval2);
        //     clearInterval(interval3);
        //     // clearInterval(interval5);
        //     // bullet.parentNode.removeChild(bullet);
        // }
        }

    }, 10);
}

function nextDirection (e){ 
    if((e.id)===("right")){ path_i++}
    else if((e.id)===("left")){ path_i++}
    else if((e.id)===("top")){path_i--}
    else if((e.id)==="bottom"){ path_i--;
        // console.log("hello");
    }
    // console.log (path_i);
    // console.log (e.id);
    
}

export function moveDirection (bullet){
    if ((bullet_move ==="up" && path_i<0) || (bullet_move ==="down" && path_i >0)){
    // if( (path_i===0  && bullet_move === "up") || (bullet_move ==="left" && path_i>0) || (bullet_move ==="right" &&path_i<0) ){
    interval4 = setInterval(() => {
        // console.log("moving left");
        const currentLeft = parseInt(bullet.style.left);
        bullet.style.left = (currentLeft - bulletSpeed) + "px";
    }, 10);
    bullet_move="left";
    }
    else if((bullet_move ==="up" && path_i>0) || (bullet_move ==="down" &&path_i <0)){
        interval4 = setInterval(() => {
            // console.log("moving right");
            const currentLeft = parseInt(bullet.style.left);
            bullet.style.left = (currentLeft + bulletSpeed) + "px";
        }, 10);
        bullet_move="right";
        }
        else if ((path_i===0  && bullet_move === "up") || (bullet_move ==="left" && path_i>0) || (bullet_move ==="right" &&path_i<0)){
        // else   if( (bullet_move ==="up" && path_i<0) || (bullet_move ==="down" &&path_i >0)){
            bullet_move= "up";
     interval4 = setInterval(() => {
         // console.log("moving up");
         const currentTop = parseInt(bullet.style.top);
         bullet.style.top = (currentTop - bulletSpeed) + "px";
        }, 10);
        
     }
     
    //  if(path[path_i]==="down")
        else if ((path_i===0  && bullet_move === "down") || (bullet_move ==="left" && path_i<0) || (bullet_move ==="right" &&path_i>0 )){
     interval4 = setInterval(() => {
         // console.log("moving down");
         const currentTop = parseInt(bullet.style.top);
         bullet.style.top = (currentTop + bulletSpeed) + "px";
        }, 10);
        bullet_move="down";
     }
     else{
        clearInterval(interval4);
     }
     path_i=0;
    }



export function boundary(bullet){
    interval5=setInterval(()=>{
         let bulletBound = bullet.getBoundingClientRect();
    if (bulletBound.top<64 || bulletBound.top > 755 ||bulletBound.left <280 || bulletBound.left >935 ) {
            clearInterval(interval2);
            clearInterval(interval3);
            clearInterval(interval4);
            clearInterval(interval5);

        // console.log("out of box");
        bullet.parentNode.removeChild(bullet); 
    }
},10);
}
