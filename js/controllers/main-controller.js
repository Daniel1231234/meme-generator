"use strict"

var gCurrImg

function init() {
  console.log("hi")
  renderGallery()
  renderKeywords()
  renderSaveMemes()
  // createCanvas()
}

function renderGallery() {
  const images = getImages()
  var uploadHTML = `  <label onchange="onImageInput(event)" class="fa-solid fa-upload gallery-img upload-img">
  <input name="uploadimg" type="file" class="input-upload" />
</label>`
  var strHTMLs = images.map(
    (img) =>
      `<img src='${img.url}'
         id='${img.id}'
         onclick="onClickImg('${img.id}')"
         class="gallery-img"
        >`
  )
  document.querySelector(".img-container").innerHTML = uploadHTML
  document.querySelector(".img-container").innerHTML += strHTMLs.join("")
}

function renderKeywords() {
  var keyWords = getKeyWords()

  var strHTML = `
    <button data-key="all" onclick="onFilterImgs(this.dataset.key)">All</button>`
  for (let key in keyWords) {
    strHTML += `<button class="select-key" data-key="${key}"
     onclick="onFilterImgs(this.dataset.key); onFontSizeUpKeyword(this.dataset.key)"
      style="font-size: ${keyWords[key] + 6}px;"> ${key} </button> 
      `
  }
  document.querySelector(".keywords-container").innerHTML = strHTML
}

function onFontSizeUpKeyword(keyword) {
  sizeUp(keyword)

  renderGallery()
  renderKeywords()
}

function onImageInput(ev) {
  loadImageFromInput(ev, onInitMeme)
  onMoveToEditor()
}

function loadImageFromInput(ev, onImageReady) {
  let reader = new FileReader()

  reader.onload = (event) => {
    let img = new Image()
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
    gCurrImg = img
  }
  reader.readAsDataURL(ev.target.files[0])
}

function onClickImg(imgId) {
  createMeme()
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
  createCanvas()
  onMoveToEditor()
  createMeme()

  var randImgIdx = getRandomImgIdx()
  var img = new Image()
  img.src = `images/${randImgIdx}.jpg`
  img.onload = () => {
    gCurrImg = img
  }
  setSelectedImg(img.Id)
  const randomLine = getRandomLine()
  addLine(randomLine)
  onInitMeme(img)
}

function moveToSaved() {
  renderSaveMemes()
  const mainContent = document.querySelector("main")
  const editArea = document.querySelector(".editor")
  const savedArea = document.querySelector(".saved-container")

  mainContent.style.display = "none"
  editArea.style.display = "none"
  savedArea.style.display = "block"
}

function renderSaveMemes() {
  updateGMemes()
  var imgsMemes = gSaveMemes
  var strImgsHtml = imgsMemes.map((img) => {
    const imgContent = img.dataUrl
    return `
        <a href="#" onclick="onSaveMemesClick(this,${img.id})">
        <img class='memes-items' src="${imgContent}"  alt="">
        <button onclick="onDeleteSavedMeme(event,${img.id})">Delete meme</button>
        </a>`
  })
  var elMemes = document.querySelector(".saved-memes-container")

  elMemes.innerHTML = strImgsHtml.join("")
}

function onDeleteSavedMeme(ev, id) {
  ev.preventDefault()
  deleteMeme(id)
  renderSaveMemes()
}

function onSaveMemesClick1(ellink, savedMemesId) {
  var savedMemes = gSaveMemes
  var currSavedMemes = savedMemes.find((memes) => {
    return memes.id === savedMemesId
  })
  ellink.href = currSavedMemes.dataUrl
  ellink.download = "my-saved-canvas"
}
