"use strict"

var gCanvas
var gCtx

var gStartPos
const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container")
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth - 20
  // Unless needed, better keep height fixed.
  gCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawText(text, x, y) {
  gCtx.lineWidth = 2
  gCtx.strokeStyle = "brown"
  gCtx.fillStyle = "black"
  gCtx.font = "40px Arial"
  gCtx.fillText(text, x, y) //Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(text, x, y) //Draws (strokes) a given text at the given (x, y) position.
}

function getEvPos(ev) {
  console.log(ev.type)
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}
