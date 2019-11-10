const Twit = require("twit");
const TwitterBot = require("node-twitterbot").TwitterBot;
const axios = require("axios");
const url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
require('dotenv').config()

const Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

const newQuote = () => {
    // function to grab a quote from the api and pass it to be checked
    axios.get(url)
        .then(res => quoteChecker(res.data))
        .catch(err => console.log(err))
}

const quoteChecker = (quote) => {
    // checks if quote exists and formats it
    if (quote === undefined || quote.quoteAuthor === undefined) {
        return newQuote();
    }
    
    // replaces unicode characters
    const quoteText = quote.quoteText.replace(/\\u[\dA-F]{4}/gi, (match) => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)))
    const quoteAuthor = quote.quoteAuthor.replace(/\\u[\dA-F]{4}/gi, (match) => String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16)))
    
    const fullQuote = `"${quoteText}" - ${quoteAuthor}
#Motivation #KeepGoing`;
    
    // makes sure incomplete tweets aren't posted
    if (fullQuote.length >= 280) {
        newQuote();
    } else {
        tweetQuote(fullQuote);
    }
}

const tweetQuote = (quote) => {
    Bot.tweet(quote);
}

newQuote();