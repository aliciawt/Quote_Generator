// Grabbing elements

const quoteSpace = document.getElementById("quote");
const authorSpace = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const checkbox = document.getElementById("auto-gen-option");
const checkboxLabel = document.querySelector("label");

const BACKEND_URL = "http://localhost:3000";
let interval = null;

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