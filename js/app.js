document.addEventListener("DOMContentLoaded", () => {
   const gameHands = document.querySelector(".game__hands");
   const hands = gameHands.querySelectorAll(".game__hands-item");
   const gameStart = document.querySelector(".game__start");
   const winnerAlert = document.querySelector(".game__winner");
   const scoreNumber = document.querySelector(".score__number");
   const playAgainButton = document.querySelector("#play-again");
   const rules = document.querySelector(".rules");
   const closeRulesButton = document.querySelector(".close__rules");
   const showRulesButton = document.querySelector("#rules");

   let score = 0;
   
   addingEventListener();

   //Adding event listeners.
   function addingEventListener () {
      hands.forEach((hand, index) => {
         hand.addEventListener("click",  () => {
            startGame(index)
         });
      })
      playAgainButton.addEventListener("click", restartGame);
      closeRulesButton.addEventListener("click", closeRules);
      showRulesButton.addEventListener("click", showRules);
   }
   
   //Functions.
   function startGame (index) {
      const handPicked = hands[index];

      onBottom(document.querySelector(".game__hands"), gameStart);

      createUserPick(handPicked);
      createHousePick();
      setTimeout(() => {
         setWinner(gameStart.querySelector(".game__user").querySelector(".game__hands-item"), gameStart.querySelector(".game__house").querySelector(".game__hands-item"));
      }, 2500);
   }
   //Function to hide the object and show an object2.
   function onBottom(object, object2) {
      object.classList.add("onbottom");
      setTimeout(() => {
         object.classList.remove("onbottom");
         object.classList.add("noshow");

         object2.classList.remove("noshow");
         object2.classList.add("ontop");
      }, 100)
   }
   
   //Function to create the user pick.
   function createUserPick (handPicked) {
      if (!gameStart.querySelector(".game__user")){
         const userPick = document.createElement("DIV");
         userPick.classList.add("game__user");
         userPick.appendChild(handPicked);

         const textPicked = document.createElement("H2");
         textPicked.classList.add("picked__title");
         textPicked.innerHTML = "YOU PICKED";
         
         userPick.appendChild(textPicked);
         
         userPick.classList.add("pick", "flex");

         gameStart.appendChild(userPick);
      } 
   }

   //Function to create the house pick.
   function createHousePick () {
      if (!gameStart.querySelector(".game__house")){
         const housePick = document.createElement("DIV");
         const _housePick = document.createElement("DIV");

         housePick.classList.add("game__house");
         _housePick.classList.add("game__hands-item", "flex");
         housePick.appendChild(_housePick);

         const textPicked = document.createElement("H2");
         textPicked.classList.add("picked__title");
         textPicked.innerHTML = "THE HOUSE PICKED";
         
         housePick.appendChild(textPicked);
         
         housePick.classList.add("pick", "flex");

         gameStart.appendChild(housePick);

         selectRandomPick(gameStart.querySelector(".game__house").querySelector(".game__hands-item"))
      }
   }

   //Function to select a random pick for the house.
   function selectRandomPick (item){
      const randomIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      let counter = 20;
      let index = 0;

      const interval = setInterval(() => {
         counter--;

         item.innerHTML = hands[index].innerHTML;
         item.id = hands[index].getAttribute("id");

         index++;
         
         if (counter === 0){
            item.innerHTML = hands[randomIndex].innerHTML;
            item.id = hands[randomIndex].getAttribute("id"); 

            clearInterval(interval);
         } 
         if (index === 3) index = 0;
      }, 100);
   }

   //Function to set the winner:
   function setWinner(userPick, housePick) {
      if (userPick.getAttribute("data-win") === housePick.getAttribute("id")){
         createWinner("YOU WIN");
         score++;
      } 
      else if (userPick.getAttribute("id") === housePick.getAttribute("id")) createWinner("DRAW");
      else{
         createWinner("YOU LOSE");
         score--;
      } 

      scoreNumber.innerHTML = (score < 0 ? 0 : score);
   }

   //Function to create a winner/draw object.
   function createWinner(winner) {
      const winnerTitle = winnerAlert.querySelector(".winner__title");
      winnerTitle.innerHTML = winner;

      winnerAlert.classList.remove("noshow");
   }

   //Function to restart the game.
   function restartGame() {
      gameStart.innerHTML = "";
      gameStart.classList.add("noshow");

      winnerAlert.classList.add("noshow");

      gameHands.innerHTML = "";
      hands.forEach(hand => {
         gameHands.appendChild(hand);
      });
      gameHands.classList.remove("noshow", "ontop");
   }

   //Function to close the rules display.
   function closeRules() {
      rules.classList.add("noshow");
   }

   //Function to show the rules display.
   function showRules() {
      rules.classList.remove("noshow");
   }
})