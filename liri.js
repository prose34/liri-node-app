// import required keys and node packages

require("dotenv").config();

var importKeys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var client = new Twitter(importKeys.twitter);
var spotify = new Spotify(importKeys.spotify);


// set up acceptance for whatever is entered into the command line. Join multiple words after the command is given.

var commandLineInput = process.argv;
var command = process.argv[2];
var userInput = '';

for (var i = 3; i < commandLineInput.length; i++) {
    // if (i > 3 && i < commandLineInput.length) {
    //     userInput += userInput + "+" + commandLineInput[i];
    // } else {
        userInput += " " + commandLineInput[i];
    // }
}

// console.log(userInput);
// console.log(commandLineInput);
// run the function/command based on what command the user types

// if (commandLineInput[2] === "my-tweets") {
//   runTwitter();
// } else if (commandLineInput[2] === "spotify-this-song") {
//   runSpotify();
// } else {
//   console.log("Please enter a command!");
// };

switch(command) {
  case "my-tweets": 
      runTwitter();
      break;

  case "spotify-this-song":
      if(userInput) { 
        runSpotify(userInput);
      } else {
        runSpotify("The Sign Ace of Base");
      };
      break;

  case "movie-this":
      if(userInput) {
         runOMDB(userInput);
      } else {
         runOMDB("Mr. Nobody");
      };
      break; 

  case "do-what-it-says":
      runDoWhatItSays();
      break; 

  default:
      console.log("Please enter a command! Choose from the following: my-tweets, spotify-this-song, or movie-this");
      break; 
};

// console.log(userInput);

// Twitter function

function runTwitter () {

  var screenName = {screen_name: 'CodingHW'};

  client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
    if (!error) {
      // console.log(JSON.stringify(tweets, null, 2));
      console.log("====================================");
      for (var i = 0; i < tweets.length; i++) {
        var dateTweeted = tweets[i].created_at;
        var tweetText = tweets[i].text;
        console.log("You Tweeted: " + tweetText);
        console.log("On This Date/Time: " + dateTweeted.substring(0, 19));
        console.log("====================================");
      };
    } else {
      console.log('Error!');
    };
  });

};




// Spotify function

function runSpotify (userInput) {

  spotify.search({ type: 'track', query: userInput, limit: 5}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };

    console.log("========================================");

    for(var i = 0; i < data.tracks.items.length; i++) {
      var trackData = data.tracks.items[i];

      // Artists Log
      console.log("Artist(s): " + trackData.album.artists[0].name);

      // Song Name
      console.log("Song Name: " + trackData.name);

      // Preview Link
      console.log("Preview Link: " + trackData.preview_url);

      // Ablum Title
      console.log("Album Title: " + trackData.album.name);

      // break between results
      console.log("========================================");
    };

    var spotifyOutput = JSON.stringify(data, null, 2);
    // console.log(spotifyOutput); 

  });

};


// OMDB Function

function runOMDB (userInput) {

  // Run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  // console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log("Release Year: " + JSON.parse(body).Year);

      var movieBody = JSON.parse(body);
      console.log(movieBody);

      // Title of the movie
      console.log("Movie Title: " + movieBody.Title);
      // Release Year
      console.log("Release Year: " + movieBody.Year)
      //IMDB Rating of the movie.
      console.log("IMDB Rating: " + movieBody.imdbRating);
      //Rotten Tomatoes Rating of the movie.
      // SOMETIMES MOVIES DON'T HAVE THIS!!!
      console.log("Rotten Tomatoes Rating: " + movieBody.Ratings[1].Value);
      //Country where the movie was produced.
      console.log("Production Country: " + movieBody.Country);
      // Language of the movie.
      console.log("Language: " + movieBody.Language);
      // Plot of the movie.
      console.log("Plot: " + movieBody.Plot);
      // Actors in the movie.
      console.log("Actors: " + movieBody.Actors);


    };
  });
};


// text file function

function runDoWhatItSays () {

  fs.readFile("random.txt", "utf8", function(error, data) {

    var fileData = data.split(",");
    console.log(fileData);
    // console.log(data);

    runSpotify(fileData[1]);

  });
};  


// if error...
// no error, log data. 
// split data to make it more readable and then log that content:
// var dataArr = data.split(",");

// To append to a file:
// As always, we grab the fs package to handle read/write
// var fs = require("fs");

// We then store the textfile filename given to us from the command line
// var textFile = process.argv[2];

// We then append the contents "Hello Kitty" into the file. If the file didn't exist then it gets created on the fly.
// fs.appendFile(textFile, 'Hello Kitty', function(err) {
// }