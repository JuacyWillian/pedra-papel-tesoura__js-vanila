(function(win, doc) {
  "use strict";

  let user_score = 0;
  let draw_score = 0;
  let ai_score = 0;

  const winnerTable = {
    paper_scissor: -1,
    rock_paper: -1,
    scissor_rock: -1,
    paper_rock: 1,
    scissor_paper: 1,
    rock_scissor: 1
  };

  let gameHistory=[]

  let choices = doc.querySelectorAll(".choices>div");
  Array.prototype.forEach.call(choices, function(choice) {
    choice.addEventListener("click", onChoiceClicked);
  });

  function aiChoiceFunc() {
    const choices = ["rock", "scissor", "paper"];
    return choices[Math.floor(Math.random() * 3)];
  }

  function onChoiceClicked(ev) {
    ev.preventDefault();
    const userChoice = this.id;

    const aiCoice = aiChoiceFunc();

    const winner = getWinner(userChoice, aiCoice);
    if (winner == "user") {
      user_score += 1;
      doc.querySelector(".score #user-score p").textContent = user_score;
    }
    if (winner == "ai") {
      ai_score += 1;
      doc.querySelector(".score #ai-score p").textContent = ai_score;
    }
    if (winner == "draw") {
      draw_score += 1;
      doc.querySelector(".score #draw-score p").textContent = draw_score;
    }
    writeResults(userChoice, aiCoice, winner);
  }

  function writeResults(user, ai, result) {
    let spans = doc.querySelectorAll("#game-results span");
    spans[0].textContent = user;
    spans[1].textContent = ai;
    spans[2].textContent = result;

    let list = doc.querySelector('#history #list');
    let li = doc.createElement('li')
    li.textContent = result
    list.appendChild(li)
  }

  function getWinner(user, ai) {
    if (user === ai) return "draw";
    return winnerTable[`${user}_${ai}`] >= 0 ? "user" : "ai";
  }
})(window, document);
