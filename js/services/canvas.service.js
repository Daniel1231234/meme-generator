"use strict"

var gCanvas
var gCtx

function drawImg() {
  var img = new Image() //create a new html img element
  img.src = "img/1.jpg" //send a network req to get that image, define the img src
  //when the image ready draw it on the canvas
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}
