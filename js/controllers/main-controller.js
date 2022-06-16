"use strict"

var gCurrImg

function init() {
  console.log("hi")
  renderGallery()
  renderKeywords()
}

function renderGallery() {
  const images = getImages()
  var strHTMLs = images.map(
    (img) =>
      `<img src='${img.url}'
         id='${img.id}'
         onclick="onClickImg('${img.id}')"
         class="gallery-img"
        >`
  )
  document.querySelector(".img-container").innerHTML = strHTMLs.join("")
}

function renderKeywords() {
  var keyWords = getKeyWords()

  var strHTML = `
    <button data-key="all" onclick="onFilterImgs(this.dataset.key)">All</button>`
  for (let key in keyWords) {
    strHTML += `<button class="select-key" data-key="${key}"
     onclick="onFilterImgs(this.dataset.key)"> ${key} </button> 
      `
  }
  document.querySelector(".keywords-container").innerHTML = strHTML
}

function onImageInput(ev) {
  loadImageFromInput(ev, renderMeme)
}

function onClickImg(imgId) {
  setSelectedImg(imgId)
  // var currImg = getSelectedImg()

  var img = new Image()
  img.src = `images/${imgId}.jpg`
  img.onload = () => {
    gCurrImg = img
  }
  onMoveToEditor()
  onInitMeme(img)
}

function onMoveToEditor() {
  const mainContent = document.querySelector("main")
  const editArea = document.querySelector(".editor")

  mainContent.style.display = "none"
  editArea.style.display = "flex"
}

//TODO: fix filter search for each letter
function onFilterImgs(val) {
  setFilterImg(val)
  renderGallery()
}

function moveToGallery() {
  window.location = "index.html"
}
