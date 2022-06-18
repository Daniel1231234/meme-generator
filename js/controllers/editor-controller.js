"use strict"

var gCanvas
var gCtx
var gStartPos
var gIsClicked

const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function onInitMeme(img, lineIdx) {
  setSelectedLine(lineIdx)
  createCanvas()
  resizeCanvas()
  onSetLinePos()
  addListeners()
  renderMeme(img)
}

//get text from user for meme's lines
function onSetText(val) {
  setText(val)
  renderMeme(gCurrImg)
}

// manipulate lines
function onSwitchLine() {
  switchLine()
  renderMeme(gCurrImg)
}

function onAddLine() {
  addLine("new line")
  renderMeme(gCurrImg)
}

function onDeleteLine() {
  deleteLine()
  renderMeme(gCurrImg)
}

// manipulate text
function onChangeTextSize(num) {
  changeTextSize(num)

  renderMeme(gCurrImg)
}

function onChangeTextAlign(align) {
  changeTextAlign(align)
  renderMeme(gCurrImg)
}

function onChangeFontFamily(val) {
  // console.log(val)
  changeFontFamily(val)
  renderMeme(gCurrImg)
}

//manipulate colors
function onChangeStrokeColor(StrokeColor) {
  changeStrokeColor(StrokeColor)
  gCtx.strokeStyle = StrokeColor
  renderMeme(gCurrImg)
}

function onChangeColor(color) {
  changeColor(color)
  renderMeme(gCurrImg)
}

// canvas functions
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

function onSetLinePos() {
  const meme = getMeme()
  // console.log(meme)
  meme.lines[meme.selectedLineIdx].pos = {
    x: gCanvas.width / 2,
    y: gCanvas.height / 5,
  }
  setLinePos(meme.lines[meme.selectedLineIdx].pos)
}

function createCanvas() {
  gCanvas = document.querySelector("canvas")
  gCtx = gCanvas.getContext("2d")
}

// share and downloads functiona
function onDownloadMeme(elBtn) {
  var imgContent = gCanvas.toDataURL("image/jpeg")
  elBtn.href = imgContent
}

function onShareMeme() {
  const imgDataUrl = gCanvas.toDataURL("image/jpeg")
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector(
      ".user-msg"
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`
    document.querySelector(".share-container").innerHTML = `
    <a class="btn-share" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
       Share Now!  
    </a>`
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function onSave() {
  resetSelectedLine()
  renderMeme(gCurrImg)
  const meme = gCanvas.toDataURL("image/jpeg")
  console.log(meme)
  saveMemesToStorage(meme)
  renderSavedMemes()
  moveToSaved()
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append("img", imgDataUrl)

  fetch("//ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log("Got back live url:", url)

      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

//render emojis

function renderEmojies() {
  var emojis = getEmojis()
  var strPaddles = `<button class="left-paddle paddle hidden"> &larr; </button> <button class="right-paddle paddle"> &rarr; </button>`
  var emojisHTMLs = emojis.map(
    (emoji) =>
      `<button class="emoji" onclick="onAddEmoji(this, '${emoji}')">
    ${emoji} </button>
    `
  )
  document.querySelector(".emojis-area").innerHTML = emojisHTMLs.join("")
  document.querySelector(".emojis-area").innerHTML += strPaddles
}

function onAddEmoji(elBtn, emoji) {
  console.log(emoji)
  addEmoji(emoji)
  renderMeme(gCurrImg)
}
