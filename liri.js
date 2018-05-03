require("dotenv").config();

var importKeys = require("./keys.js")

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(importKeys.twitter);
var spotify = new Spotify(importKeys.spotify);


// var params = {screen_name: 'CodingHW'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(JSON.stringify(tweets, null, 2));

//   }
// });


var spotifyInput = process.argv;
var trackName = '';

for (var i = 2; i < spotifyInput.length; i++) {
  trackName += ' ' + spotifyInput[i];
}

console.log(process.argv);
console.log(trackName);

spotify.search({ type: 'track', query: trackName, limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  var spotifyOutput = JSON.stringify(data, null, 2);
  console.log(spotifyOutput); 

  // console.log()
  // console.log("Song name: " + data.items[5].name);

  // console.log("Artist(s): " + data.tracks.items[5].album.artists[0].name);
  // console.log("Preview link: " + data.tracks.items[5].preview_url);
  // console.log("Album: " + data.tracks.items[5].album.name);
});




// node liri.js spotify-this-song '<song name here>'

// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


// If no song is provided then your program will default to "The Sign" by Ace of Base.


// ===============================================

// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.


// ===============================================

// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.