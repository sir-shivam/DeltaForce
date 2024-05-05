import { square } from "./pieces.js";
console.log(square);
let shouter = square[9].className;
shouter= shouter.split(" ");
console.log(shouter);
let container = document.querySelector(`.${shouter[0]}`)
console.log(container);

const bulletSpeed = 5; 
let intervalId;


// creating bullet as element
function createBullet() {
    console.log("out bullet");
    const bullet = document.createElement("div");
    bullet.classList.add("bullet"); 
    bullet.style.position = "absolute"; 
    bullet.style.top = container.offsetTop + "px";
    bullet.style.left = container.offsetLeft + container.offsetWidth / 2 + "px"; 

    container.appendChild(bullet);

    return bullet;
}

function moveBullet(bullet) {
    console.log("end bullet");
    const interval = setInterval(() => {
        const currentTop = parseInt(bullet.style.top);
        bullet.style.top = (currentTop - bulletSpeed) + "px";

        // Checking if bullet goes off-screen and remove it
        if (currentTop - bulletSpeed < 0) {
            clearInterval(interval);
            container.removeChild(bullet);
        }
    }, 10); // Move the bullet every 10 milliseconds
}

export function Shooting() {
    console.log("in bullet");
        const newBullet = createBullet();
        moveBullet(newBullet);
}




