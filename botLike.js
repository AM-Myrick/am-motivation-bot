const Twit = require("twit");
const yesterday = require("./dateLogic").yesterday;

const Bot = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// likes 100 tweets posted since yesterday with the motivation hashtag
Bot.get('search/tweets', { q: `#motivation since:${yesterday}`, count: 100 })
    .then(res => {
    res.data.statuses.map(tweet => {
        if (tweet.id_str !== undefined) {
            Bot.post('favorites/create', { id: tweet.id_str })
                .then(tweet => console.log('Liked: ' + tweet.data.id))
                .catch(err => console.log("Error: " + err.message))
        }
    })
})