require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const spotify = require("node-spotify-api");
const moment = require("moment");
const chalk = require("chalk");

var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join("+");

switch(command) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this-song":
      spotifyThisSong();
      break;
    case "movie-this":
      movieThis();
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;  
}

function concertThis(){
    var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    // We then run the request with axios module on a URL with a JSON
    axios
        .get(queryUrl)
        .then(function(response) {
            var events = response.data;
            events.forEach(function(event) {
                var venue = event.venue.name;
                var location = event.venue.city + " " + event.venue.country;
                var date = moment(event.datetime).format("L");
                console.log(
                    "Venue: " + chalk.yellow(venue) + 
                    "\nLocation: " + chalk.greenBright(location) + 
                    "\nDate: " + chalk.green(date)
                    );
                console.log(chalk.blackBright.dim("----------------------------"));
            });
        })
        .catch(function(err) {
            console.log(err);
        });
};

function movieThis(){
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
    axios
    .get(queryUrl)
    .then(function(response) {
        // var events = response.data;
        // events.forEach(function(event) {
        //     var venue = event.venue.name;
        //     var location = event.venue.city + " " + event.venue.country;
        //     var date = moment(event.datetime).format("L");
        //     console.log("Venue: " + chalk.yellow(venue) + "\nLocation: " + chalk.greenBright(location) + "\nDate: " + chalk.green(date));
        //     console.log(chalk.blackBright.dim("----------------------------"));
        // });

        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
        var title = response.data.Title;
        var year = response.data.Year;
        var imdbRating = response.data.imdbRating;
        var rottenRating = response.data.Metascore;
        var country = response.data.Country;
        var language = response.data.Language;
        var plot = response.data.Plot;
        var actors = response.data.Actors;

        console.log(
            "Title: " + chalk.yellow(title) + 
            "\nYear Released: " + chalk.blue(year) +
            "\nIMDB Rating: " + chalk.blue(imdbRating) +
            "\nRotten Tomatoes Rating: " + chalk.blue(rottenRating) +
            "\nCountry: " + chalk.blue(country) +
            "\nLanguage: " + chalk.blue(language) +
            "\nMain Plot: " + chalk.blue(plot) +
            "\nActors: " + chalk.blue(actors)
            );
        console.log(chalk.blackBright.dim("----------------------------"));
    })
    .catch(function(err) {
        console.log(err);
    });
};

// var nodeArgs = process.argv;

// var artist = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {
//     if (i > 2 && i < nodeArgs.length) {
//         artist = artist + "+" + nodeArgs[i];
//     } else {
//         artist += nodeArgs[i];
//     }
// }

// We then run the request with axios module on a URL with a JSON
// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
//   function(response) {
//     // Then we print out the imdbRating
//     // console.log("The movie's rating is: " + response.data.imdbRating);
//     console.log(response.data);
//   }
// );
