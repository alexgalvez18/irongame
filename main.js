const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
const canvas2 = document.querySelector('.instructions')
const ctx2 = canvas2.getContext('2d')
let score = document.querySelector ('.score')
let btn = document.querySelector ('button')

//aqui se dibuja el canvas 2 que es el de las instrucciones
function drawCanvas2() {
ctx2.fillStyle = "green";
ctx2.fillRect(10, 10, canvas2.width, canvas2.height)
}



let interval = 0
let springer = []
let frames = 0
score = 0
let lsd = []
let lsdTimer = 0
let bullets = [] 



const images = {
    background: 'https://i.etsystatic.com/11598164/r/il/0daf56/933217164/il_794xN.933217164_htw0.jpg',
    cocker: './crypto.png',
    springer: './mathias3.png',
    lsd: './lsd.png',
    background2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOWYR9obPbf4mKwJWuGAZBnHGemwOqUa-mS8r2g-ttj0YMcA7bQ',
    bullet: './bone.png'

}

//classes

class Board {
    constructor(img){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image()
        this.img.src = images.background
        this.img2 = new Image()
        this.img2.src = images.background2
        this.img.onload = () => {
            this.draw()
        }
        this.audio = new Audio()
        this.audio.src = './musica juego.mp3'
        this.audio1 = new Audio()
        this.audio1.src = './ladridos3.mp3'
        this.audio2 = new Audio ()
        this.audio2.src = './moonmen.mp3'
    }
    move() {
        this.x--
        if(this.x<- canvas.width) this.x = 0
    }
    //esto pinta un fondo cuando se termina el otro
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height)
        this.move()
    }
    draw2(){
        ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img2, this.x + canvas.width, this.y, this.width, this.height)
        this.move()
    }
}
    


class Character {
    constructor(x, y, img) {
      this.x = x
      this.y = y
      this.width = 35
      this.height = 55
      this.img = new Image()
      this.img.src = images.cocker
      this.img.onload = () => {
        this.draw()
    }
    } 
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      }
      fire() {

      }
      isTouching(spaniel) {
        return (
          this.x < spaniel.x + spaniel.width &&
          this.x + this.width > spaniel.x &&
          this.y < spaniel.y + spaniel.height &&
          this.y + this.height > spaniel.y
        )
      }
    moveUp() {
    if (this.y > canvas.height - this.height - 10) return
    this.y-= 10
      }
    moveDown() {
        if (this.y > canvas.height - this.height - 10) return
        this.y+= 10
          }
    moveRight() {
    if (this.x > canvas.width - this.width - 10) return
     this.x+= 10
    }
    moveLeft() {
        if (this.x > canvas.width - this.width - 10) return
         this.x-= 10
        }
        shoot () {
            //funcion de disparo
        }
}

class Bullet {
    constructor (x,y) {
        this.x = x
        this.y = y
        this.width = 30
        this.height = 10
        this.img = new Image()
        this.img.src = images.bullet
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y)
        this.x++
        // if (this.x>canvas.width) {
        //     ctx.cl
        // }
      }
    
}



class Springer {
    constructor (y, img) {
     this.x = canvas.width
     this.y = y
     this.width = 40
     this.height = 60
     this.health = 50
     this.img = new Image
     this.img.src = images.springer
    }
     draw() {
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
         this.x--
    }
}

class Bonus {
    constructor (y, img){
        this.x = canvas.width
        this.y = y
        this.width = 30
        this.height = 30
        this.img = new Image
        this.img.src = images.lsd
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        this.x--

}
}


// instancias
const board = new Board(images.background)
const cocker = new Character(10,  350, images.cocker)

function createBullet (dog) {
    bullets.push(new Bullet(dog.x, dog.y))
}

function shootBullet(dog) {
    createBullet(dog)
    bullets.forEach((bullets) => {
        bullets.draw()
})
}


function generateLsd() {
    let aux = Math.floor(Math.random() * canvas.height - 50)
    lsd.push(new Bonus(aux))
  }

  function drawLsd() {
   
    if (frames % 100 === 0) {
      generateLsd()    
    }
    lsd.forEach(lsd => {
      lsd.draw()
    })
  }

  function checkCollition1() {
    lsd.map(element => {
      if (cocker.isTouching(element)) {
        score += 2 
        lsd.splice(lsd.indexOf(element),1)
        lsdTimer +=3
      }
    })
  }


function generateSpringers() {
    let aux = Math.floor(Math.random() * canvas.height - 50)
    springer.push(new Springer(aux))
  }

  function drawSpringer() {
   
    if (frames % 200 === 0) {
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
        board.audio.play()}

    cocker.draw()
    drawSpringer()
    checkCollition()
    drawLsd()
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
        shootBullet(cocker)
    }
}
)

drawCanvas2()

btn.onclick = () => startGame()


