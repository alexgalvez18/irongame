

//aqui se dibuja el canvas 2 que es el de las instrucciones
function drawCanvas2() {


}



let interval = 0
let springer = []
let frames = 0
let score = 0
let lsd = []
let lsdTimer = 0
let bullets = [] 




// instancias
const board = new Board(images.background)
const cocker = new Character(10,  350, images.cocker)



function drawBullet(){
    
    bullets.forEach((element, i) => {
      if(element.x > canvas.width){
        return bullets.splice(i, 1);
        }
        
        element.draw()
      springer.forEach((element1, index) =>{
        if(element.collision(element1)) {
            bullets.splice(i, 1)
            springer.splice(index, 1)
            score+=2
            scoreTag.innerHTML = score
        }
   })
    })
}

function randomNum (max, min) {
    return Math.floor(Math.random()*(max-min)+min)
}

function generateLsd() {
    let aux = randomNum (30, 550)
    lsd.push(new Bonus(aux))
  }

  function drawLsd() {
   
    if (frames % 500 === 0) {
      generateLsd()    
    }
    lsd.forEach(lsd => {
      lsd.draw()
    })
  }

  function checkCollition1() {
    lsd.map(element => {
      if (cocker.isTouching(element)) {
        score += 10
        lsd.splice(lsd.indexOf(element),1)
        lsdTimer +=3
        scoreTag.innerHTML = score
      }
    })
  }

 

function generateSpringers() {
    let aux = randomNum (30, 550)
    springer.push(new Springer(aux))
  }

  function drawSpringer() {
   
    if (frames % 150 === 0) {
      generateSpringers()    
    }
    springer.forEach(springer => {
      springer.draw()
    })
  }

  function checkCollition() {
    springer.map(enemy => {
      if (cocker.isTouching(enemy)) {
        gameOver()
      }
    })
  }


function startGame(){
    if (interval) return
    board.audio.play()
    interval = setInterval(update, 1000/60) 
    
}
function gameOver() {
    clearInterval(interval)
    interval = false
    board.audio.pause()
    board.audio2.pause()
    lsd = []
    board.draw3()
    board.audio1.play()
    
  }

function update() {
    frames ++
    
    if (lsdTimer>0){
        ctx.clearRect (0,0, canvas.width, canvas.height)
        board.draw2()
        board.audio.pause()
        board.audio2.play()
    } else {ctx.clearRect (0,0, canvas.width, canvas.height)
        board.draw()
        board.audio2.pause()
        board.audio.play()
        drawBullet()
    }

    cocker.draw()
    drawSpringer()
    checkCollition()
    drawLsd()
    // drawBullet()
    checkCollition1()
    if (lsdTimer>0 && frames % 200 === 0) {
        lsdTimer --    
      }

    // enemies.draw()
  }

  addEventListener( 'keydown', (event)=> {
      event.preventDefault()

    if (event.keyCode === 13){
        startGame()
    } else if (event.keyCode ===38) {
        cocker.moveUp()
    } else if (event.keyCode === 40) {
        cocker.moveDown()
    } else if (event.keyCode === 39){
        cocker.moveRight()
    } else if (event.keyCode === 37) {
        cocker.moveLeft()
    } else if (event.keyCode === 32){
        bullets.push(new Bullet(cocker.x + 80, cocker.y + 35))
    }
}
)

// if(keys[70] || keys[32]){
//     if(frames%30==0){
//       blastings01.push(new Blast01(spaceship.x + 120, spaceship.y + 55))
//     }
//   }

drawCanvas2()

btn.onclick = () => startGame()


