"use strict"

function createCanvas() {
  gCanvas = document.querySelector("canvas")
  gCtx = gCanvas.getContext("2d")
  resizeCanvas()
}

function onSetText(val) {
  console.log(val)
}

function onChangeTextSize() {}
