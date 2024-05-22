import { moveDirection } from "./app.js";
import { interval2 } from "./collission.js";
import { checkCollision } from "./collission.js";
import { boundary, comparing } from "./app.js";

export let movement;
let container;
export const bulletSpeed = 5; 


// creating bullet as element
function createBullet(Turn1) {
    if(Turn1){
       container= document.querySelector(`.Cannon_pink`);
    }
    else{
      container  = document.querySelector(`.Cannon_blue`);
    }
    const bullet = document.createElement("div");
    bullet.classList.add("bullet"); 
    bullet.style.position = "absolute"; 
    if(!Turn1){
        const containerHeight = container.offsetHeight ;
        bullet.style.top = container.offsetTop + containerHeight + "px";
        bullet.style.left = container.offsetLeft + container.offsetWidth / 2 + "px";
        movement= "down";

    }
    else{
        bullet.style.top = container.offsetTop  + "px";
        bullet.style.left = container.offsetLeft + container.offsetWidth / 2 + "px";
        movement="up";
    }

    container.appendChild(bullet);

    return bullet;
}

function moveBullet(bullet) {
    moveDirection(bullet);
    checkCollision(bullet);
    comparing(bullet);
    boundary(bullet); 
}

export function Shooting(Turn1) {
        const newBullet = createBullet(Turn1);
        moveBullet(newBullet);
}
