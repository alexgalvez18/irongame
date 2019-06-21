const canvas = document.querySelector('.canvas')
const ctx = canvas.getContext('2d')
// const canvas2 = document.querySelector('.instructions')
// const ctx2 = canvas2.getContext('2d')
let scoreTag = document.querySelector ('.score')
let btn = document.querySelector ('button')



const images = {
    background: 'https://i.etsystatic.com/11598164/r/il/0daf56/933217164/il_794xN.933217164_htw0.jpg',
    cocker: './crypto.png',
    springer: './mathias3.png',
    lsd: './lsd.png',
    background2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOWYR9obPbf4mKwJWuGAZBnHGemwOqUa-mS8r2g-ttj0YMcA7bQ',
    bullet: './bone.png'

}


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
        this.x-=2
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
         this.x --
    }
}


// class Bonus {
//     constructor (y, img){
//         this.x = canvas.width
//         this.y = y
//         this.width = 30
//         this.height = 30
//         this.img = new Image
//         this.img.src = images.lsd
//     }
//     draw() {
//         ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
//         this.x--
// }
// }

class Bonus {
    constructor(y, img){
      this.x = canvas.width
      this.y = y
      this.width = 30
      this.height = 30
      this.coin1 = new Image()
      this.coin1.src = 'happy.png'
      this.coin2 = new Image()
      this.coin2.src = 'tongue-out.png'
      this.coin3 = new Image()
      this.coin3.src = 'wink.png'
      this.coin4 = new Image()
      this.coin4.src = 'confused.png'
      this.coin5 = new Image()
      this.coin5.src = 'surprised.png'
      this.img = this.coin1
    //   this.audio = new Audio()
    //   this.audio.src = "http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Coin_Sound_Effect.mp3"
    //   this.audio.volume = 0.2
    }
    draw(){
      
      if(frames % 20 === 0) {
        this.img =
        this.img === this.coin1
        ? this.coin2
        : this.img === this.coin2
        ? this.coin3
        : this.img === this.coin3
        ? this.coin4
        : this.img === this.coin4
        ? this.coin5
        : this.img === this.coin5
        ? this.coin1 : this.img
      }
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
      this.x--
    }
    // draw2(){
    //   ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    //   if(frames % 5 === 0) {
    //     this.img =
    //     this.img === this.coin1
    //     ? this.coin2
    //     : this.img === this.coin2
    //     ? this.coin3
    //     : this.img === this.coin3
    //     ? this.coin4
    //     : this.img === this.coin4
    //     ? this.coin5
    //     : this.img === this.coin5
    //     ? this.coin6 : this.coin1
    //   }
    //   this.x--
    // }
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
   
        draw(){
            this.x+=20
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
          }
      
      collision(item){
        return (this.x < item.x + item.width) && (this.x + this.width > item.x) && (this.y < item.y + item.height) && (this.y + this.height > item.y)
}
}