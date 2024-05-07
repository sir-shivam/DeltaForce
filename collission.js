import { interval } from "./bullet.js";
import { movement } from "./bullet.js";
import { interval3 } from "./obstacles.js";
// import { comparing } from "./direction.js";
export let interval2;
let Titan;


function checkHit(bullet) {
  if (movement!="down"){
    Titan = document.querySelector(".Titan_blue");
  }
  else{
  Titan = document.querySelector(".Titan_pink");
  }
    const TitanInfo = Titan.getBoundingClientRect();
    const bulletInfo = bullet.getBoundingClientRect();
  
    // Check if bullet rectangle overlaps with enemy rectangle
    if(movement!="down"){
    return (
      bulletInfo.top < TitanInfo.bottom && 
      bulletInfo.right > TitanInfo.left &&   
      bulletInfo.left < TitanInfo.right     
    );
  }
  else{
    return(
      bulletInfo.top > TitanInfo.top && 
      bulletInfo.right > TitanInfo.left &&   
      bulletInfo.left < TitanInfo.right 
    )

  }
  }

export  function checkCollision(bullet) {
    interval2 = setInterval( () => {
  if (checkHit(bullet)) {
    clearInterval(interval2);
    clearInterval(interval3);
    clearInterval(interval);
    bullet.parentNode.removeChild(bullet); 
    console.log("Collision detected!"); 
  }
}, 10);
}