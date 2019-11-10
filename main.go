package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/joho/godotenv"
)

func main() {
	listen, production := parseFlags()
	if production == false {
		err := godotenv.Load()

		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}
	if listen == true {
		fmt.Println("Listening for mentions...")
		listenForMentions()
	}
}

func parseFlags() (bool, bool) {
	listen := flag.Bool("listen", true, "a flag to make the bot listen for mentions of its handle")
	production := flag.Bool("production", false, "a flag to make the program use heroku config variables")
	flag.Parse()

	return *listen, *production
}

func listenForMentions() {
	client := createTwitterClient()
	demux := twitter.NewSwitchDemux()
	demux.Tweet = func(tweet *twitter.Tweet) {
		if tweet.InReplyToStatusID != 0 {
			retweetTweet(tweet.InReplyToStatusID, client)
		}
	}

	params := &twitter.StreamFilterParams{
		Track:         []string{"@AMMotivationBo2"},
		StallWarnings: twitter.Bool(true),
	}

	stream, err := client.Streams.Filter(params)

	if err != nil {
		log.Fatal("Failed to open stream.")
	}

	demux.HandleChan(stream.Messages)
}

func createTwitterClient() *twitter.Client {
	consumerKey := os.Getenv("BOT_CONSUMER_KEY")
	consumerSecret := os.Getenv("BOT_CONSUMER_SECRET")
	accessToken := os.Getenv("BOT_ACCESS_TOKEN")
	accessSecret := os.Getenv("BOT_ACCESS_TOKEN_SECRET")

	config := oauth1.NewConfig(consumerKey, consumerSecret)
	token := oauth1.NewToken(accessToken, accessSecret)
	httpClient := config.Client(oauth1.NoContext, token)

	client := twitter.NewClient(httpClient)
	return client
}

func retweetTweet(tweetID int64, client *twitter.Client) {
	client.Statuses.Retweet(tweetID, nil)
}
