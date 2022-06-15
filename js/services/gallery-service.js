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

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 1,
  lines: [
    {
      txt: "say what?",
      size: 20,
      align: "center",
      color: "black",
    },
  ],
}

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

function getImages() {
  // if (gFilterBy) {
  //   var imgs = []
  //   gImgs.forEach(img =>
  //     return)
  // }
  return gImgs
}

function setSelectedImg(id) {
  gMeme.selectedImgId = id
}

function setFilterImg(val) {
  gFilterBy = val
}

function getKeyWords() {
  return gKeywordSearchCountMap
}
