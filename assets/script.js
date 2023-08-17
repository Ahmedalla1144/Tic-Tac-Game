//selecting all required elements
const selectBox = document.querySelector(".select_box"),
  selectXBtn = selectBox.querySelector(".playerx"),
  selectOBtn = selectBox.querySelector(".playero"),
  playboard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  winText = document.querySelector(".won-text"),
  replay = document.querySelector(".btn>button");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
  selectXBtn.onclick = () => {
    selectBox.classList.add("hide");
    playboard.classList.add("show");
  };
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide");
    playboard.classList.add("show");
    players.setAttribute("class", "players active player");
  };
};
//user click function
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playersign = "x";
let runBot = true;
function clickedBox(element) {
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${playerOIcon}" ></i>`;
    players.classList.add("active");
    playersign = "o";
    element.setAttribute("id", playersign);
  } else {
    element.innerHTML = `<i class="${playerXIcon}" ></i>`;
    players.classList.add("active");
    element.setAttribute("id", playersign);
  }
  selectWinner();
  playboard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);
}
//bot click func

function bot(runBot) {
  if (runBot) {
    playersign = "o";
    let array = [];
    for (i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}" ></i>`;
        players.classList.remove("active");
        playersign = "x";
        allBox[randomBox].setAttribute("id", playersign);
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}" ></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playersign);
      }
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none";
    playboard.style.pointerEvents = "auto";
    playersign = "x";
  }
}
// select the winner
function getId(classnum) {
  return document.querySelector(".box" + classnum).id;
}
function checkId(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}
function selectWinner() {
  if (
    checkId(1, 2, 3, playersign) ||
    checkId(4, 5, 6, playersign) ||
    checkId(7, 8, 9, playersign) ||
    checkId(1, 4, 7, playersign) ||
    checkId(2, 5, 8, playersign) ||
    checkId(3, 6, 9, playersign) ||
    checkId(1, 5, 9, playersign) ||
    checkId(3, 5, 7, playersign)
  ) {
    runBot = false;
    bot(runBot);
    setTimeout(() => {
      playboard.classList.remove("show");
    }, 700);
    resultBox.classList.add("show");
    winText.innerHTML = `Player <p>${playersign}</p> won the game!`;
    replay.onclick = () => {
      window.location.reload();
    };
  } else {
    if (
      getId(1) != "" &&
      getId(2) != "" &&
      getId(3) != "" &&
      getId(4) != "" &&
      getId(5) != "" &&
      getId(6) != "" &&
      getId(7) != "" &&
      getId(8) != "" &&
      getId(9) != ""
    ) {
      runBot = false;
      bot(runBot);
      setTimeout(() => {
        playboard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700);
      winText.innerText = `Match has been drawn!`;
      replay.onclick = () => {
        window.location.reload();
      };
    }
  }
}
