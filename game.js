// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

//  This is the Play again Button
var playAgainButton = document.getElementById('button');

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 5;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

// This is the Username 
var userName =localStorage.getItem('user');
    document.getElementById("user-name").innerHTML = 'Name: ' + userName;
    if (!userName){
    userName = prompt("Please enter username");
    localStorage.setItem("user", userName)
    document.getElementById("user-name").innerHTML = 'Name: ' + userName;
    
}

// This is the change username BUTTUN function 
function changeUserName(){
    var userName = prompt('what is your name?');
    localStorage.setItem("user", userName);
    document.getElementById("user-name").innerHTML = 'Name: ' + userName;
}

// This is the PlayAgain
function rePlay() {
    var divs = document.querySelectorAll('.card');
    for (i = 0; i < divs.length; i++) {
        divs[i].classList.remove('flipped');
      }  
}


function hideShowCards (){
// This is the vars for the card divs and the text of the button
 
    var card =  document.querySelectorAll('.card');
    
    console.log (card);
   
    var toggleButton = document.getElementById('hide-show').innerHTML;
    
    // this state will show all cards
        if (toggleButton === "show") {
            for (i = 0; i < card.length; i++) {
            card[i].classList.add('flipped');
            document.getElementById('hide-show').innerHTML = "hide";
            
            }
        
            
        } else {// this will hide the cards
            for (i = 0; i < card.length; i++) {
            card[i].classList.remove('flipped');
            document.getElementById('hide-show').innerHTML = "show";
            flippedCouplesCount = 0;
            
        
        }
        
    }
}



// This function is called whenever the user click a card
function cardClicked(elCard) {

    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')){
        return;
    }
      
    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');
        
        // No match, schedule to flip them back in 1 second
        if ( card1 !== card2){
            
            audioWrong.play();
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
                
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            audioRight.play();
            elPreviousCard = null;

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                var gameEndTime = Date.now();
                console.log('the end time is: ' + gameEndTime);
                audioWin.play();
                playAgainButton.style.display =('block');
              

            }
            
        }
         
    }



}










    

   
   



   





    



    
     





