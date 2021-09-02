// init declarations for HTML elements
const scoreDisplay = document.getElementById("score-display");
const timeDisplay = document.getElementById("time-display");
const blocks = [
  document.getElementById("btn1"), document.getElementById("btn2"), document.getElementById("btn3"), document.getElementById("btn4"), document.getElementById("btn5"), document.getElementById("btn6"), document.getElementById("btn7"), document.getElementById("btn8"), document.getElementById("btn9"), document.getElementById("btn10"),
  document.getElementById("btn11"), document.getElementById("btn12"),
  document.getElementById("btn13"), document.getElementById("btn14"),
  document.getElementById("btn15"), document.getElementById("btn16")
]



// init variable declarations
let used = [];
let hira = ["あ", "え", "い", "お", "う", "か", "け", "き"];
let kata = ["ア", "エ", "イ", "オ", "ウ", "カ", "ケ", "九"];
let colours = [
  "#3df58a", "#f53d3d", "#f5d63d", "#f5b13d",
  "#3ddcf5", "#3d6bf5", "#b83df5", "#f53dd6"
]
let bCount = 1;
let colour;
let pair = 0;
let time = 30;
let score = 0;
let over = false;



// check for value in a given array
function beenUsed(val, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] == val) return true;
  }
  return false;
}



// load the gameboard
blocks.forEach(function(block) {
  let _;
  let index;

  if(bCount <= 8) {
    while(true) {
      index = Math.floor(Math.random() * 8);
      _ = hira[index];
      if(beenUsed(_, used)) continue;
      else break;
    }
    used[bCount] = _;
  }else {
    while(true) {
      index = Math.floor(Math.random() * 8);
      _ = kata[index];
      if(beenUsed(_, used)) continue;
      else break;
    }
    used[bCount] = _;
  }

  bCount++;
  block.textContent = _;
  block.setAttribute("hirakata", hira[index]);

  block.addEventListener("click", function match() {
    pair++;
    block.style.backgroundColor = colour;
    block.style.color = "#ffffff";
    block.disabled = true;
  })
})



// changes colours in accordance with num of guessed pairs
const colourCycle = setInterval(() => {
  if(pair == 16) over = true;
  colour = colours[Math.ceil((pair-1)/2)];
}, 15)



// alters value of time each second
const timeProg = setInterval(() => {
  if(time >= 1) time -= 1;
}, 1000)



// updates the HTML element displaying remainin time
const updater = setInterval(() => {
  if(time == 0) {
    over = true;
  }
  timeDisplay.textContent = `Time: ${time}`;
}, 5)



// game end sequence
const endDetector = setInterval(() => {
  if(over) {
    // stopping timer functions
    clearInterval(colourCycle);
    clearInterval(timeProg);
    clearInterval(updater);

    let matched = [
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", ""
    ];

    blocks.forEach(function(block) {
      block.disabled = true;

      // detect pairs and calculate score
      for(let i = 0; i < blocks.length; i++) {
        if(blocks[i].style.backgroundColor == "") continue;
        if(block.id == blocks[i].id) continue;
        if(beenUsed(block.id, matched)) continue;
        if(block.getAttribute("hirakata") != blocks[i].getAttribute("hirakata")) continue;
        if(block.style.backgroundColor != blocks[i].style.backgroundColor) continue;

        matched[i] = blocks[i].id;
        score++;
      }
    })

    // update HTML element displaying score
    scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(endDetector);
  }
}, 100)