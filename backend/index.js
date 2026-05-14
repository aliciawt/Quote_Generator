import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Quotes
const quotes = [
  {
    quote: "Life isn't about getting and having, it's about giving and being.",
    author: "Kevin Kruse",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
];

// Picking random quote
function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// GET, to return a random quote as JSON
app.get("/", (req, res) => {
  const quote = pickRandomQuote();
  res.json(quote);
});

// POST, to add a new quote
app.post("/", (req, res) => {
  let { quote, author } = req.body;

  if (typeof quote === "string") quote = quote.trim();
  if (typeof author === "string") author = author.trim();
  
  if (!quote || !author) {
    return res.status(400).send("Quote and author must not be empty or only spaces.");
  }
  
  quotes.push({ quote, author });
  res.send("ok");
});

// Starting server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});