export let movement;
import { interval2 } from "./collission.js";
let container;
export let interval;
// console.log(container , "hiii");
import { checkCollision } from "./collission.js";

const bulletSpeed = 5; 
let intervalId;


// creating bullet as element
function createBullet(Turn1) {
    if(Turn1){
       container= document.querySelector(`.Cannon_pink`);
    }
    else{
      container  = document.querySelector(`.Cannon_blue`);
    }
    console.log("out bullet");
    const bullet = document.createElement("div");
    bullet.classList.add("bullet"); 
    bullet.style.position = "absolute"; 
    if(!Turn1){
        const containerHeight = container.offsetHeight;
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
    console.log("end bullet");
    checkCollision(bullet);
        interval = setInterval(() => {
        const currentTop = parseInt(bullet.style.top);
        // console.log(currentTop , "top");
        if(movement==="down"){
            bullet.style.top = (currentTop + bulletSpeed) + "px";
            // Checking if bullet goes off-screen and remove it
        if (currentTop > 742 ) {
            clearInterval(interval);
            clearInterval(interval2);
            container.removeChild(bullet);
        }
        }
        else{
            bullet.style.top = (currentTop - bulletSpeed) + "px";

            // Checking if bullet goes off-screen and remove it
        if (currentTop < 58) {
            clearInterval(interval);
            clearInterval(interval2);
            container.removeChild(bullet);
        }
        }
        }, 10);                     // Moveing bullet every 10 milliseconds
        
}

export function Shooting(Turn1) {
    console.log("in bullet");
        const newBullet = createBullet(Turn1);
        moveBullet(newBullet);
}
