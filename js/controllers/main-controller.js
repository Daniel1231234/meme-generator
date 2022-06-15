"use strict"

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

function onClickImg(imgId) {
  setSelectedImg(imgId)

  onMoveToEditor()
  createCanvas()

  drawImg(imgId)
}

function onMoveToEditor() {
  const mainContent = document.querySelector("main")
  const editArea = document.querySelector(".editor")

  console.log(mainContent.classList)
  mainContent.style.display = "none"
  editArea.style.display = "flex"
}

function onFilterImgs(val) {
  console.log(val)
  setFilterImg(val)
  renderGallery()
}

function renderKeywords() {
  var keyWords = getKeyWords()

  var strHTML = `
    <button data-key="all" onclick="onFilterImgs(this.dataset.key)">All</button>`
  for (key in keyWords) {
    strHTML += `<button class="select-key" data-key="${key}"> ${key} </button> 
      `
  }
  document.querySelector(".keywords-container").innerHTML = strHTML
}
