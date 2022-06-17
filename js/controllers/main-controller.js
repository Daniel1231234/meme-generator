"use strict"

var gCurrImg
var gSavedMemes

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

// function onImageInput(ev) {
//   loadImageFromInput(ev, renderMeme)
// }

function onClickImg(imgId) {
  setSelectedImg(imgId)

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

  renderEmojies()
}

//TODO: fix filter search for each letter
function onFilterImgs(val) {
  setFilterImg(val)
  renderGallery()
}

function moveToGallery() {
  window.location = "index.html"
}

function onToggleMenu() {
  document.querySelector(".backdrop").classList.toggle("open-menu")
  document.querySelector(".navbar").classList.toggle("open-menu")
}

function onGenerateRanMeme() {
  var randImgIdx = getRandomImgIdx()
  // var randImg = getImages()[randImgIdx]
  // console.log(randImg)
  onClickImg(randImgIdx)

  getRnadomLine()
}

function moveToSaved() {
  const mainContent = document.querySelector("main")
  const editArea = document.querySelector(".editor")
  const savedArea = document.querySelector(".saved-container")

  mainContent.style.display = "none"
  editArea.style.display = "none"
  savedArea.style.display = "block"
}

function renderSavedMemes() {
  const savedMemes = getSavedMemes()
  if (!savedMemes) return

  var strHTMLs = savedMemes.map((meme, idx) => {
    ;`<img class="gallery-img" src=${meme} alt="" />
    <button class="fa fa-solid fa-trash-can delete-saved-btn" onclick="removeMemeFromStorage(${idx})">
    </button>
  `
  })
  document.querySelector(".saved-memes-container").innerHTML = strHTMLs.join("")
}

function removeMemeFromStorage(idx) {
  const savedMemes = getSavedMemes()
  savedMemes.splice(idx, 1)
  saveToStorage(STORAGE_KEY, savedMemes)
  renderSaved()
}
