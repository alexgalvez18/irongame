const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let btn = document.querySelector ('button')
let interval = 0

const images = {
    background: 'https://i.etsystatic.com/11598164/r/il/0daf56/933217164/il_794xN.933217164_htw0.jpg',
    cocker: './crypto.png'
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
        this.img.onload = () => {
            this.draw()
        }
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
    moveUp() {
    if (this.y > canvas.height - this.height - 10) return
    this.y+= 10
      }
    moveDown() {
        if (this.y > canvas.height - this.height - 10) return
        this.y-= 10
          }
    moveRight() {
    if (this.x > canvas.width - this.width - 10) return
     this.x+= 10
    }
    moveLeft() {
        if (this.x > canvas.width - this.width - 10) return
         this.x-= 10
        }
}

class Enemy {
    constructor (x,y, img) {
     this.x = x
     this.y = y
     this.width = 40
     this.height = 40
     this.img = new Image
     this.img.src = 

    }
}
// instancias
const board = new Board(images.background)
const cocker = new Character(10,  350, images.cocker)



function startGame(){
    if (interval) return
    interval = setInterval(update, 1000/60)
    
}
function update() {
    frames ++
    ctx.clearRect (0,0, canvas.width, canvas.height)
    board.draw ()
    cocker.draw ()
    // enemies.draw()
  }

  addEventListener( 'keydown', (event)=> {
    if (event.keyCode ===32) {
        
    }
}


)

btn = startGame()


