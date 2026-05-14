// Grabbing elements

const quoteSpace = document.getElementById("quote");
const authorSpace = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");

const quoteInput = document.getElementById("new-quote-text");
const authorInput = document.getElementById("new-quote-author");
const submitBtn = document.getElementById("submit-quote-btn");
const formMessage = document.getElementById("form-message");

const BACKEND_URL = "http://a10716iih3xfrabivastbaju.178.105.39.91.sslip.io";

// function to fetch random quote

async function fetchQuote() {
    try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();

        quoteSpace.textContent = data.quote;
        authorSpace.textContent = "- " + data.author;
    } catch (error) {
        quoteSpace.textContent = "Failed to fetch quote";
    }
}

// get quote button event listener
newQuoteButton.addEventListener("click", fetchQuote);

fetchQuote();

// function to add new quote
async function addQuote() {
  const quote = quoteInput.value.trim();
  const author = authorInput.value.trim();

  if (!quote || !author) {
    formMessage.textContent = "Please fill in both fields";
    setTimeout(() => { formMessage.textContent = ""; }, 3000);
    return;
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote, author }),
    });

    if (response.ok) {
      formMessage.textContent = "Quote added successfully!";
      setTimeout(() => { formMessage.textContent = ""; }, 3000);
      quoteInput.value = "";
      authorInput.value = "";
    } else {
      const errorText = await response.text();
      formMessage.textContent = errorText || "Failed to add quote";
      setTimeout(() => { formMessage.textContent = ""; }, 3000);
    }
  } catch (error) {
    formMessage.textContent = "Error adding quote";
    setTimeout(() => { formMessage.textContent = ""; }, 3000);
  }
}

// event listener to add quote button
submitBtn.addEventListener("click", addQuote);