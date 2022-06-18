"use strict"

const STORAGE_KEY = "savedMemesDB"
var gLineMarkSize
var gEmojies = ["😎", "👊", "🎆", "🌈", "💩", "❤", "🔞", "💲", "🍕", "💃🏾"]
var gMeme

createMeme()

function createMeme() {
  if (!gMeme) {
    var meme = {
      selectedImgId: 1,
      selectedLineIdx: 0,
      lines: [
        {
          txt: "First line Example",
          size: 50,
          align: "center",
          color: "white",
          strokeColor: "black",
          fontFamily: "impact",
          isSelected: false,
          pos: {},
        },
      ],
    }
    gMeme = meme
  }

  return gMeme
}

function moveLine(diffX, diffY) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += diffX
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diffY
}

function switchLine(toLineIdx = gMeme.selectedLineIdx + 1) {
  gMeme.selectedLineIdx = toLineIdx
  gMeme.selectedLineIdx %= gMeme.lines.length
}

function markLine(line) {
  if (!line) return
  const lineWidth = gCtx.measureText(line.txt).width + line.size
  const lineHeight = line.size + 40
  gCtx.strokeStyle = "yellow"
  gCtx.strokeRect(
    line.pos.x - lineWidth / 2,
    line.pos.y - lineHeight / 2,
    lineWidth,
    lineHeight
  )
  gLineMarkSize = { lineWidth, lineHeight }
}

function getSelectedImg() {
  var imgs = getImages()
  var selectedImg = imgs.find((img) => img.id === gMeme.selectedImgId)
  // console.log(gMeme)
  return selectedImg
}

function getMeme() {
  return gMeme
}

function isLineClicked(clickedPos) {
  const clickedLine = gMeme.lines.find((line) => {
    if (
      Math.sqrt(
        (clickedPos.x - line.pos.x) ** 2 + (clickedPos.y - line.pos.y) ** 2
      ) <=
      gCtx.measureText(line.txt).width / 2
    ) {
      console.log("line pos: ", line.pos)
      return line
    }
  })
  // console.log(clickedLine)
  return clickedLine
}

function setSelectedLine(idx = 0) {
  // console.log(idx)
  // resetSelectedLine()
  gMeme.lines[idx].isSelected = true
  gMeme.selectedLineIdx = idx
}

function setText(val) {
  console.log(val)
  gMeme.lines[gMeme.selectedLineIdx].txt = val
}

function changeTextSize(num) {
  gMeme.lines[gMeme.selectedLineIdx].size += num
}

function changeTextAlign(align) {
  gMeme.lines[gMeme.selectedLineIdx].align = align
}

function changeFontFamily(font) {
  console.log(font)
  gMeme.lines[gMeme.selectedLineIdx].fontFamily = font
}

function changeStrokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function changeColor(fillColor) {
  gMeme.lines[gMeme.selectedLineIdx].color = fillColor
}

function addLine(txt, size = 50, color = "white", strokeColor = "black") {
  const line = {
    txt,
    size,
    align: "center",
    color,
    strokeColor,
    fontFamily: "impact",
    isSelected: false,
    pos: {
      x: gCanvas.width / 2,
      y: gCanvas.height / 2,
    },
  }
  console.log(line)
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  drawLine(line)
  markLine(line)
}

function resetSelectedLine(idx = 0) {
  // gMeme.lines[idx].isSelected = false
  // gMeme.selectedLineIdx = -1

  gMeme.lines.forEach((_, idx) => {
    gMeme.lines[idx].isSelected = false
  })
  gMeme.selectedLineIdx = -1
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getEmojis() {
  return gEmojies
}

function addEmoji(strEmoji) {
  addLine(strEmoji)
}

function saveMeme() {
  const data = gCanvas.toDataURL()
  gSaveMemes.push({ dataUrl: data, id: gSaveMemes.length + 1 })
  console.log(gSaveMemes)
  saveToStorage(STORAGE_KEY, gSaveMemes)
}

function updateGMemes() {
  var saveMemes = loadFromStorage(STORAGE_KEY)
  console.log(saveMemes)
  if (!saveMemes || !saveMemes.length) {
    saveMemes = []
  }
  gSaveMemes = saveMemes
  saveToStorage(STORAGE_KEY, gSaveMemes)
}
