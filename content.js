

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

