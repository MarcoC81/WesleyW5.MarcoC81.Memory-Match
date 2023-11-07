let timeOut; //adding variable incase we need to clearTimeout for whatever reason
let backImgLink = "images/backImage.png";
let score = 0;
let flippedOverCount = 0;
let flippedOverArray = [];
class Card {
    constructor(reference, imgLink, isTurned, isRevealed)
    {
        this.reference = reference;
        this.imgLink  = imgLink;
        this.isTurned = isTurned;
        this.isRevealed = isRevealed;
    }
    setImgLink(imgLink)
    {
        this.imgLink = imgLink;
    }
    setIsRevealed(isRevealed)
    {
        this.isRevealed = isRevealed;
    }
    setIsTurned(isTurned)
    {
        this.isTurned = isTurned;
    }
    getImgLink()
    {
        return this.imgLink;
    }
    getIsRevealed()
    {
        return this.isRevealed;
    }
    getIsTurned()
    {
        return this.isTurned;
    }
    getReference()
    {
        return this.reference;
    }
}
const scoreContainer = document.getElementById("scoreHolder");
const resetButton = document.getElementById("resetButton");
const card1 = new Card(document.getElementById("1"), "none", false, false);
const card2 = new Card(document.getElementById("2"), "none", false, false);
const card3 = new Card(document.getElementById("3"), "none", false, false);
const card4 = new Card(document.getElementById("4"), "none", false, false);
const card5 = new Card(document.getElementById("5"), "none", false, false);
const card6 = new Card(document.getElementById("6"), "none", false, false);
const card7 = new Card(document.getElementById("7"), "none", false, false);
const card8 = new Card(document.getElementById("8"), "none", false, false);
const card9 = new Card(document.getElementById("9"), "none", false, false);
const card10 = new Card(document.getElementById("10"), "none", false, false);
const card11 = new Card(document.getElementById("11"), "none", false, false);
const card12 = new Card(document.getElementById("12"), "none", false, false);
const card13 = new Card(document.getElementById("13"), "none", false, false);
const card14 = new Card(document.getElementById("14"), "none", false, false);
const card15 = new Card(document.getElementById("15"), "none", false, false);
const card16 = new Card(document.getElementById("16"), "none", false, false);
const cardArray = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13, card14, card15, card16];
let imgArray = ["images/FrontImg1.png", "images/FrontImg2.png", "images/FrontImg3.png", "images/FrontImg4.png", 
                  "images/FrontImg5.png", "images/FrontImg6.png", "images/FrontImg7.png", "images/FrontImg8.png",
                  "images/FrontImg1.png", "images/FrontImg2.png", "images/FrontImg3.png", "images/FrontImg4.png", 
                  "images/FrontImg5.png", "images/FrontImg6.png", "images/FrontImg7.png", "images/FrontImg8.png"];
let currentImgArray = [];
resetButton.addEventListener("click", resetGame);
function resetGame()
{
    flippedOverArray = [];
    flippedOverCount = 0;
    score = 0;
    currentImgArray = shuffle(imgArray);
    for (let i = 0; i < cardArray.length; i++)
    {
        cardArray[i].setIsRevealed(false);
        cardArray[i].setIsTurned(false);
        cardArray[i].getReference().querySelector("img").src = "images/backImage.png";
        cardArray[i].getReference().querySelector("img").alt = "images/backImage.png";
        cardArray[i].setImgLink(currentImgArray[i]);
        // cardArray[i].getReference().querySelector("img").src = currentImgArray[i];
        cardArray[i].getReference().addEventListener("click", () => {
            gameAction(cardArray[i]);
        });
    }
    scoreContainer.innerHTML = score;
    // console.log(currentImgArray);
}
function gameAction(card)
{
    if (!card.getIsTurned() && (!card.getIsRevealed()))
    {
        if (flippedOverCount < 1)
        {
            score++;
            flippedOverArray[0] = card;
            card.setIsTurned(true);
            card.getReference().querySelector("img").src = card.getImgLink();
            card.getReference().querySelector("img").alt = card.getImgLink();
            flippedOverCount++;
        }
        else if (flippedOverCount < 2)
        {
            score++;
            flippedOverArray[1] = card;
            card.setIsTurned(true);
            card.getReference().querySelector("img").src = card.getImgLink();
            card.getReference().querySelector("img").alt = card.getImgLink();
            flippedOverCount++;
            timeOut = setTimeout(() => 
            {
                var img1 = flippedOverArray[0].getImgLink();
                var img2 = flippedOverArray[1].getImgLink();
                if (img1==img2)
                {
                    flippedOverArray[0].setIsRevealed(true);
                    flippedOverArray[1].setIsRevealed(true);
                }
                else
                {
                    flippedOverArray[0].getReference().querySelector("img").src = "images/backImage.png";
                    flippedOverArray[1].getReference().querySelector("img").src = "images/backImage.png";
                    flippedOverArray[0].getReference().querySelector("img").alt = "images/backImage.png";
                    flippedOverArray[1].getReference().querySelector("img").alt = "images/backImage.png";
                    
                }
                flippedOverArray[0].setIsTurned(false);
                flippedOverArray[1].setIsTurned(false);
                flippedOverArray = [];
                flippedOverCount = 0;
                if (checkWin())
                {
                    window.confirm(generateVictoryMessage(score) +  ` Click the RESET button to play again!`);
                }
                else
                {
                    console.log("no win yet");
                }
            }, 500); 
        }
        scoreContainer.innerHTML = score;
    }
}
//fisher-yates shuffle method
const shuffle = (array) => {
    for (let i = array.length - 1; i >= 0; i--) {
           const randomIndex = Math.floor(Math.random() * (i + 1));
           array.push(array[randomIndex]);
           array.splice(randomIndex, 1);
       }
       return array;
}
function checkWin()
{
    var count = 0;
    for (let i = 0; i < cardArray.length; i++)
    {
        if (cardArray[i].getIsRevealed())
        {
            count++
        }
    }
    console.log(count);
    if (count >= 16)
    {
        return true;
    }
    return false;
}
function generateVictoryMessage(scoreInput)
{
    if (scoreInput <= 16)
    {
        return `You win!!!!! Your score is ${score}! That's the best score possible! Great job!`;
    } 
    else if (scoreInput < 25)
    {
        return `You win!!!!  Your score is ${score}! You're really good at this, that's an amazing score!`;
    }
    else if (scoreInput < 35)
    {
        return `You win!!!  Your score is ${score}! You have a pretty good memory! Or you're really lucky! :D`;
    }
    else if (scoreInput < 45)
    {
        return `You win!!  Your score is ${score}! Not bad of a score at all!`;
    }
    else if (scoreInput < 60)
    {
        return `You win!  Your score is ${score}! I'm sure you can get a better score!`;
    }
    else if (scoreInput >= 60)
    {
        return `You win.  Your score is ${score}. I'm angry at your score. >:(`;
    }
}
resetGame();  //initialize function