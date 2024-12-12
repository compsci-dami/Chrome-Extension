const observer = new MutationObserver((mutationsList, observer) => {
  // Loop through all mutations
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Check if the Buy Now button is available
      const buyNowButton = document.querySelector('#buy-now-button');
      const submitButton = document.querySelector('#submit.buy-now-announce');
      const checkoutBotton = document.querySelector('#sc-buy-box-ptc-button', '#sc-buy-box-ptc-button-announce');
      if (buyNowButton || submitButton || checkoutBotton) {
        console.log('Buy Now button found!');
        observer.disconnect(); // Stop observing once the button is found
        // Proceed with the redirection
        buyNowButton.addEventListener('click', () => {
          event.preventDefault();
          event.stopPropagation();
          const extensionUrl = chrome.runtime.getURL('index.html');
          window.location.href = extensionUrl;
        });
      }
    }
  } 
});


// Start observing the body for added or removed elements
observer.observe(document.body, { childList: true, subtree: true });

// List of questions
const questions = [
  "Do you really need this?",
  "Is this going to spark joy?",
  "How many hours of work did this cost you? Worth it?",
  "Are you buying this because Karen has one too?",
  "Do you even have the money to buy this?",
  "Can you rent, borrow, or find an alternative instead? (Just kidding… or am I?)",
  "Can you think about it and wait until tomorrow?"
];


let unusedQuestions = [...questions];
let yesCount = 0;
let noCount = 0;
const questionElement = document.querySelector(".card-text");


function displayRandomQuestion() {
  if (unusedQuestions.length === 0) {
      unusedQuestions = [...questions];
  }

  const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
  questionElement.textContent = unusedQuestions[randomIndex];
  unusedQuestions.splice(randomIndex, 1);
}


function handleButtonClick(responseType) {
  if (responseType === "yes") {
      yesCount++;
  } else if (responseType === "no") {
      noCount++;
  }
  
  if (yesCount >= 3 || noCount >= 3) {
      checkCounts();
      resetCounts(); 
  } else {
      displayRandomQuestion();
  }
}

function checkCounts() {
  if (yesCount > noCount) {
      alert("OK, seems like you really need this now. You can go ahead and get it.");
  } else if (noCount > yesCount) {
      alert("OK, seems like you don't need this now. Have a little think and come back tomorrow.");
  }
}

function resetCounts() {
  yesCount = 0;
  noCount = 0;
  unusedQuestions = [...questions]; 
}

// Add event listeners to buttons
document.getElementById("yesButton").addEventListener("click", () => handleButtonClick("yes"));
document.getElementById("noButton").addEventListener("click", () => handleButtonClick("no"));

// Initialize with the first random question
displayRandomQuestion();
