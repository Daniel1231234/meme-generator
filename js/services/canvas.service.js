"use strict"

var gCanvas
var gCtx
var gStartPos

function drawLine(line) {
  gCtx.textBaseline = "middle"
  gCtx.textAlign = line.align
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.color
  gCtx.font = `${line.size}px ${line.fontFamily}`

  gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function setLinePos(linePos) {
  gMeme.lines.filter((pos) => pos.x === linePos.x && pos.y === linePos.y)
}

function resizeCanvas() {
  var elContainer = document.querySelector(".canvas-container")
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = 500
}

function onMove(ev) {
  if (gIsClicked) {
    const pos = getEvPos(ev)
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    renderMeme(gCurrImg)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    gStartPos = pos
  }
}

function onDown(ev) {
  // console.log(ev.offsetX, ev.offsetY)
  const pos = getEvPos(ev)
  console.log(pos)
  const isClicked = isLineClicked(pos)
  const lines = getMeme().lines
  if (isClicked) {
    setSelectedLine(lines.indexOf(isClicked))
    gStartPos = pos
    gIsClicked = true
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    renderMeme(gCurrImg)
    // markLine(gMeme.lines[gMeme.selectedLineIdx])

    document.querySelector(".canvas-container").style.cursor = "grabbing"
  } else {
    resetSelectedLine()
    renderMeme(gCurrImg)
  }
}

function onUp(ev) {
  gIsClicked = false
  document.querySelector(".canvas-container").style.cursor = "grab"
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function addMouseListeners() {
  gCanvas.addEventListener("mousemove", onMove)
  gCanvas.addEventListener("mousedown", onDown)
  gCanvas.addEventListener("mouseup", onUp)
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  // Resizes the canvas and renders it as window size changes
  window.addEventListener("resize", () => {
    resizeCanvas()
    renderMeme(gCurrImg)
  })
}

function addTouchListeners() {
  gCanvas.addEventListener("touchmove", onMove)
  gCanvas.addEventListener("touchstart", onDown)
  gCanvas.addEventListener("touchend", onUp)
}

function renderMeme(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  const meme = getMeme()
  const lines = meme.lines
  lines.forEach((line) => drawLine(line))
  markLine(gMeme.lines[gMeme.selectedLineIdx])
}
