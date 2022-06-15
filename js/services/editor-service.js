"use strict"

function drawImg(imgId) {
  var img = new Image()
  img.src = `images/${imgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}
