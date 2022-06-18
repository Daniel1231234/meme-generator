"use strict"

var gFilterBy

var gKeywordSearchCountMap = {
  funny: 9,
  politics: 3,
  celebrity: 9,
  cute: 6,
  animal: 3,
  kiss: 2,
  sleep: 2,
  men: 8,
  kids: 3,
  toystory: 1,
}
const memesSentences = [
  "I never eat falafel",
  "DOMS DOMS EVERYWHERE",
  "Stop Using i in for loops",
  "Armed in knowledge",
  'Js error "Unexpected String"',
  "One does not simply write js",
  "I`m a simple man i see vanilla JS, i click like!",
  "JS, HTML,CSS?? Even my momma can do that",
  "May the force be with you",
  "I know JS",
  "JS Where everything is made up and the rules dont matter",
  "Not sure if im good at programming or good at googling",
  "But if we could",
  "JS what is this?",
  "Write hello world , add to cv 7 years experienced",
]

var gImgs = [
  {
    id: 1,
    url: "images/1.jpg",
    keywords: ["funny", "politics", "celebrity"],
  },

  {
    id: 2,
    url: "images/2.jpg",
    keywords: ["animal", "cute", "kiss"],
  },
  {
    id: 3,
    url: "images/3.jpg",
    keywords: ["baby", "animal", "cute", "sleep"],
  },
  {
    id: 4,
    url: "images/4.jpg",
    keywords: ["animal", "cute", "sleep"],
  },
  {
    id: 5,
    url: "images/5.jpg",
    keywords: ["baby", "cute"],
  },
  {
    id: 6,
    url: "images/6.jpg",
    keywords: ["funny", "celebrity"],
  },
  {
    id: 7,
    url: "images/7.jpg",
    keywords: ["funny", "cute", "kids"],
  },
  {
    id: 8,
    url: "images/8.jpg",
    keywords: ["celebrity", "funny"],
  },
  {
    id: 9,
    url: "images/9.jpg",
    keywords: ["funny", "kids", "cute"],
  },
  {
    id: 10,
    url: "images/10.jpg",
    keywords: ["funny", "celebrity", "politics", "men"],
  },
  {
    id: 11,
    url: "images/11.jpg",
    keywords: ["kiss", "men"],
  },
  {
    id: 12,
    url: "images/12.jpg",
    keywords: ["funny", "celebrity", "men"],
  },
  {
    id: 13,
    url: "images/13.jpg",
    keywords: ["celebrity", "men"],
  },
  {
    id: 14,
    url: "images/14.jpg",
    keywords: ["celebrity", "men"],
  },
  {
    id: 15,
    url: "images/15.jpg",
    keywords: ["celebrity", "men"],
  },
  {
    id: 16,
    url: "images/16.jpg",
    keywords: ["funny", "celebrity", "men"],
  },
  {
    id: 17,
    url: "images/17.jpg",
    keywords: ["politics", "men"],
  },
  {
    id: 18,
    url: "images/18.jpg",
    keywords: ["funny", "kids", "toystory"],
  },
]

// var gFonts = ["impact", "Ariel", "David", "Cursive", "Verdana"]

function getImages() {
  // const keyWords = gImgs.filter((img) => img.keywords)
  if (gFilterBy) {
    // var filterImgs = []
    let imgs = gImgs.filter((img) => img.keywords.includes(gFilterBy))
    // filterImgs.push(img)
    return imgs
  }
  return gImgs
}

function setSelectedImg(id) {
  gMeme.selectedImgId = id
}

function setFilterImg(val) {
  // gFilterBy = val === "all" ? "" : val.toLowerCase()
  if (val === "all") {
    gFilterBy = ""
    return
  }

  for (var key in gKeywordSearchCountMap) {
    var letters = key.split("")
    letters.filter((letter) => letter === gFilterBy)
  }
  gFilterBy = val
  console.log(gFilterBy)
}

function getKeyWords() {
  return gKeywordSearchCountMap
}

function sizeUp(word) {
  console.log(word)
  gKeywordSearchCountMap[word]++
}

// function loadImageFromInput(ev, onImageReady) {
//   var reader = new FileReader()
//   reader.onload = function (event) {
//     var img = new Image()
//     img.src = event.target.result
//     img.onload = onImageReady.bind(null, img)
//   }
//   reader.readAsDataURL(ev.target.files[0])
// }

function getRandomImgIdx() {
  var id = getRndomInt(gImgs[0].id, gImgs[gImgs.length - 1].id)
  return id
}

function getRnadomLine() {
  var randLineTxt = getRandArrStr(memesSentences)
  // var randFont = getArrStr(gFonts)
  var randColor = getRandomColor()
  var randColorStroke = getRandomColor()
  var randSize = getRndomInt(30, 70)
  console.log(randLineTxt, randSize, randColor, randColor)

  addLine(randLineTxt, randSize, randColor, randColorStroke)
}

function getRandArrStr(arr) {
  var idxStart = arr.indexOf(arr[0])
  var idxEnd = arr.indexOf(arr[arr.length - 1])
  var idx = getRndomInt(idxStart, idxEnd)

  return arr[idx]
}

function deleteMeme(deletedMemeIdx) {
  var deletedMeme = gSaveMemes.findIndex((meme) => meme.id === deletedMemeIdx)
  gSaveMemes.splice(deletedMeme, 1)
  saveToStorage(STORAGE_KEY, gSaveMemes)
}
