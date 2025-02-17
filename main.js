const canvas= document.getElementById('gameCanvas');
const ctx= canvas.getContext('2d');
//contexto de renderização 2D
const box= 20;
const canvasSize= 400;
const speed= 100;
const restartButton= document.getElementById("restartButton");
const scoreDisplay= document.getElementById("scoreDisplay");

let snake;
let food;
let direction;
let score;
let game;

function init(){
    snake= [{x:7*box, y:7*box}];
    food= {x:Math.floor(Math.random()*(canvasSize/box))*box, y:Math.floor(Math.random()*(canvasSize/box))*box};
    direction= "RIGHT";
    score= 0;
    scoreDisplay.textContent=`Pontuação: ${score}`;
    if(game)clearInterval(game);
    game=setInterval(draw, speed);
    restartButton.style.display="none";
}

document.addEventListener("keydown",event=>{
    if(event.key==="ArrowUp" && direction!=="DOWN")direction="UP";
    if(event.key==="ArrowDown" && direction!=="UP")direction="DOWN";
    if(event.key==="ArrowRight" && direction!=="LEFT")direction="RIGHT";
    if(event.key==="ArrowLeft" && direction!=="RIGHT")direction="LEFT";
});

restartButton.addEventListener("click",init);

function draw(){
    ctx.clearRect(0,0,canvasSize, canvasSize);
    ctx.fillStyle="red";
    ctx.fillRect(food.x, food.y, box, box);
    snake.forEach((segment, index)=>{
        ctx.fillStyle=index===0?"green":"darkgreen";
        ctx.fillRect(segment.x, segment.y, box, box);
    });
    const head={...snake[0]};
    if(direction==="UP")head.y-=box;
    if(direction==="DOWN")head.y+=box;
    if(direction==="LEFT")head.x-=box;
    if(direction==="RIGHT")head.x+=box;
    
    if(head.x===food.x && head.y=== food.y){
        score++;
        scoreDisplay.textContent=`Pontuação: ${score}`;
        food={x:Math.floor(Math.random()*(canvasSize/box))*box, y:Math.floor(Math.random()*(canvasSize/box))*box};
    }
    else{
        snake.pop();
    }

    if(head.x<0||head.y<0||head.x>canvasSize|| head.y>canvasSize||snake.some(segment=>segment.x===head.x && segment.y===head.y)){
        clearInterval(game);
        ctx.fillStyle="#22577A";
        ctx.font="20px Arial";
        ctx.fillText("Fim do jogo! Pontuação: "+ score, 90, 200);
        restartButton.style.display="block";
        return
    }

    snake.unshift(head)
}
init();