"use strict"

var gIsClicked
var gSaveMemes = []
const gTouchEvs = ["touchstart", "touchmove", "touchend"]

function onInitMeme(img, lineIdx) {
  setSelectedLine((lineIdx = 0))
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

function onSave() {
  saveMeme()
  renderSaveMemes()

  // moveToSaved()
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
  // document.querySelector(".emojis-area").innerHTML += strPaddles
}

function onAddEmoji(elBtn, emoji) {
  console.log(emoji)
  addEmoji(emoji)
  renderMeme(gCurrImg)
}
