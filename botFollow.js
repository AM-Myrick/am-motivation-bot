const Twit = require("twit");
const yesterday = require("./dateLogic").yesterday;

const Bot = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// searches for 100 tweets since yesterday with the motivation hashtag
// once the tweets are grabbed, all posters are followed
Bot.get('search/tweets', { q: `#motivation since:${yesterday}`, count: 100 })
    .then(data => {
        data.statuses.map(tweet => {
            Bot.post('friendships/create', { id: tweet.user.id_str })
                .then(tweet => console.log('Followed: ' + tweet.id))
                .catch(err => console.log("Error: " + err.message))
        })
    })
    .catch(err => console.log(err))