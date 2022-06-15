"use strict"

function init() {
  console.log("hi")
  renderGallery()
}

function renderGallery() {
  const images = getImages()
  console.log(images)
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
