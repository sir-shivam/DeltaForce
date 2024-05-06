import { movement } from "./bullet.js";
export let interval2;

import { interval } from "./bullet.js";

let Titan;
function checkHit(bullet) {
  if (movement!="down"){
    Titan = document.querySelector(".Titan_blue");
  }
  else{
  Titan = document.querySelector(".Titan_pink");
  }
    console.log(Titan, "done");
    const TitanInfo = Titan.getBoundingClientRect();
    const bulletInfo = bullet.getBoundingClientRect();

    console.log(bulletInfo.top , TitanInfo.bottom);
  
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
    console.log("Collision ");
  if (checkHit(bullet)) {
    // Handle collision! (e.g., remove bullet, play sound, update score)
    clearInterval(interval2);
    clearInterval(interval);
    bullet.parentNode.removeChild(bullet); // Remove bullet from DOM
    console.log("Collision detected!"); 
    // break;
  }
}, 10);
// }
  }