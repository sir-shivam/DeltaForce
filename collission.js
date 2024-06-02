
import { delPlay, interval8, interval4, interval6, interval7, interval9, play, transform, alerts } from "./app.js";
import { movement } from "./bullet.js";
import { interval3, interval5 } from "./app.js";
import { hitted } from "./pieces.js";
// import { comparing } from "./direction.js";
export let interval2;
let Titan;

function checkHit(bullet) {
  Titan = document.querySelector(".shiva");
    const TitanInfo = Titan.getBoundingClientRect();
    const bulletInfo = bullet.getBoundingClientRect();
  
    // Check if bullet rectangle overlaps with enemy rectangle
    return (
      bulletInfo.top < TitanInfo.bottom  && 
      bulletInfo.right > TitanInfo.left &&   
      bulletInfo.bottom > TitanInfo.top &&   
      bulletInfo.left < TitanInfo.right     
    );
  }

export  function checkCollision(bullet) {
    interval2 = setInterval( () => {
  if (checkHit(bullet)) {
    clearInterval(interval2);
    clearInterval(interval3);
    clearInterval(interval5);
    clearInterval(interval4);
    clearInterval(interval6);
    clearInterval(interval7);
    clearInterval(interval8);
    clearInterval(interval9);
    hitted();
    clearTimeout(0);
    bullet.parentNode.removeChild(bullet); 
    delPlay();
    if(Titan.className.includes("blue")){
    // alert("game over PINK wins ");
    alerts(false , "Pink");
  }
  else{
    alerts(false , "Blue");
    // alert("game over BLUE wins ");
  }

  }
}, 10);
}