const Twit = require("twit");
const TwitterBot = require("node-twitterbot").TwitterBot;

const Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

const phraseArray = [ "hey twitter",
                    "im tweeting",
                    "tweet tweet",
                    "tweetstorm time... 1/22",
                    "plz RT v important",
                    "delete ur account",
                    "it me",
                    "same",
                    "#dogpants go on 4 legs!!",
                    "#thedress is blue and black" ];

function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

let phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);

Bot.tweet(phrase);