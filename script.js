const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
// Show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const newQuote = () => {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  console.log(quote);

  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
};

// Get Quotes from API
const getQuotes = async () => {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
  } catch (err) {
    // catch error
    alert(err);
  }
};

//Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// onLoad
getQuotes();
