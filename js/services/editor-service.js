"use strict"

var gLineMarkSize
var gEmojies = ["😎", "👊", "🎆", "🌈"]
var gMeme = {
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
    {
      txt: "Second line Example",
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

function makeLine(line) {
  // console.log(line)
  gCtx.textBaseline = "middle"
  gCtx.textAlign = line.align
  gCtx.strokeStyle = line.strokeColor
  gCtx.fillStyle = line.color
  gCtx.font = `${line.size}px ${line.fontFamily}`

  gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}

function moveLine(diffX, diffY) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x += diffX
  gMeme.lines[gMeme.selectedLineIdx].pos.y += diffY
}

function markLine(line) {
  if (!line) return
  const lineWidth = gCtx.measureText(line.txt).width + line.size
  const lineHeight = line.size + 50
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
      return line
    }
  })
  console.log(clickedLine)
  return clickedLine
}

function setSelectedLine(idx) {
  // console.log(idx)
  gMeme.selectedLineIdx = idx
}

function setLinePos(linePos) {
  gMeme.lines.filter((pos) => pos.x === linePos.x && pos.y === linePos.y)
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

function addLine(txt) {
  const line = {
    txt,
    size: 50,
    align: "center",
    color: "white",
    strokeColor: "black",
    fontFamily: "impact",
    isSelected: false,
    pos: {
      x: gCanvas.width / 2,
      y: gCanvas.height / 2,
    },
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  makeLine(line)
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}
