"use strict"

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container")
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = 500
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

function setLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function resetSelectedLine() {
  gMeme.lines.forEach((_, idx) => {
    gMeme.lines[idx].isSelected = false
  })
  gMeme.selectedLineIdx = -1
}
