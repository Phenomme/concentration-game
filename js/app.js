const superheroes = [
    
    /*spiderman*/  "https://i.etsystatic.com/18227704/r/il/c35704/3271341593/il_1588xN.3271341593_30ei.jpg",
   /*captian america*/ "https://files.idyllic.app/files/static/1353226?width=1080&optimizer=image",
   /*ironman */ "https://files.idyllic.app/files/static/250238",
   /*Thor*/ "https://cdn.openart.ai/published/xZjNALkMaYpY5z4SgjQP/UGFiYb18_VTIM_1024.webp",
   /*hulk */"https://static.artzone.ai/media/60256/conversions/kFVaSyq5eAK1eAnRokQw1l5n96NUCrrIMNvpJ8hz-w768.webp",
   /*deadpool */ "https://i.namu.wiki/i/wwXws31LiX8e14kn4QEHZy5u8LbEh3Ely1g2kIwVPM-B13JtyCC01-9GcIajlNb8PZ6IxMJujzIiYacQjWVnU2M4Qdkg9BRG6mYZrbB6WJpdjZ_ukuobTnqRU1xisDD1YxbkjcC5pJyGfqYtQZMH5Th9GhMW7y_BVFnYQRrmnVE.webp",
   /*wolverine*/ "https://hedwig-cf.netmarble.com/forum-common/mherosgb/futurefight_en/thumbnail/c1e27a0170fa4a9db8a1f6e804429bcc_1585743074967_d.jpg",
   /*blackpanter */ "https://cdn.openart.ai/uploads/image_orftaxdy_1691124012333_512.webp",
   /*storm */ "https://www.writeups.org/wp-content/uploads/Storm-Marvel-Comics-X-Men-Ororo-Munroe.jpg",
   /*blade*/ "https://s.cafebazaar.ir/images/upload/screenshot/com.wallzz.blade-cd79143c-eb26-4857-956e-01a2944cd438.jpeg?x-img=v1/format,type_webp,lossless_false/resize,h_600,lossless_false/optimize"


];

const cardBackImage = "https://styles.redditmedia.com/t5_25j23m/styles/communityIcon_2kk2ds8xprmc1.png"
let firstCard = null;
let secondCard = null;
let points = 0;
let timer;
let timeLeft = 90;
let incorrectGuesses = 0;
const maxIncorrectGuesses = 20;

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", restartGame);

function startGame() {
   document.getElementById("result-screen").classList.add("hidden");
   document.getElementById("game-board").innerHTML = "";
   points = 0;
   incorrectGuesses = 0;
   timeLeft = 90;
   document.getElementById("points").textContent = points;
   document.getElementById("timer").textContent = timeLeft;
   startTimer();

   const images = [...superheroes, ...superheroes].sort(() => Math.random() - 0.5);
   images.forEach(imgSrc => createCard(imgSrc));
}

function createCard(imgSrc) {
   const card = document.createElement("div");
   card.classList.add("card");

   card.innerHTML = `
       <div class="card-inner">
           <div class="card-front">
               <img src="${imgSrc}" alt="Superhero">
           </div>
           <div class="card-back">
               <img src="${cardBackImage}" alt="Card Back">
           </div>
       </div>
   `;

   card.addEventListener("click", () => flipCard(card, imgSrc));
   document.getElementById("game-board").appendChild(card);
}

function flipCard(card, imgSrc) {
   if (firstCard && secondCard) return;

   card.classList.add("flipped");
   if (!firstCard) {
       firstCard = { card, imgSrc };
   } else if (!secondCard) {
       secondCard = { card, imgSrc };
       checkForMatch();
   }
}

function checkForMatch() {
   if (firstCard.imgSrc === secondCard.imgSrc) {
       points += 10;
       document.getElementById("points").textContent = points;
       resetCards();
       checkForWin();
   } else {
       incorrectGuesses++;
       setTimeout(() => {
           firstCard.card.classList.remove("flipped");
           secondCard.card.classList.remove("flipped");
           resetCards();
       }, 1000);

       if (incorrectGuesses >= maxIncorrectGuesses) {
           endGame("Sorry, too many incorrect guesses! You lost.");
           resetCards

       }
   }
}

function resetCards() {
   firstCard = null;
   secondCard = null;
}

function checkForWin() {
   const allCards = document.querySelectorAll(".card");
   const matchedCards = document.querySelectorAll(".card.flipped");
   if (matchedCards.length === allCards.length) {
       endGame("Congratulations, you won!");
   }
}

function startTimer() {
   clearInterval(timer);
   timer = setInterval(() => {
       timeLeft--;
       document.getElementById("timer").textContent = timeLeft;
       if (timeLeft <= 0) {
           endGame("Time's up! You lost.");
           resetCards
       }
   }, 1000);
}

function endGame(message) {
   clearInterval(timer);
   document.getElementById("result-message").textContent = message;
   document.getElementById("result-screen").classList.remove("hidden");
}

function restartGame() {
   document.getElementById("result-screen").classList.add("hidden");
   startGame();
}

