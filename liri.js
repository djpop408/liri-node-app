require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const chalk = require("chalk");

var keys = require("./keys.js");

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
    default:
        console.log(chalk.redBright.inverse("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' in order to continue"));
}

//concert-this command
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
    appendToLog(queryUrl);
};

//spotify-this-song command
function spotifyThisSong(){
    if (!query) {
        query = "The Sign";
    };
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: query })
        .then(function(response) {

            var tracksArray = response.tracks.items;
            for (let i = 0; i < tracksArray.length; i++) {
                var artistArray = tracksArray[i].artists
                for (let j = 0; j < artistArray.length; j++) {
                    var artistName = JSON.stringify(artistArray[j].name);
                    console.log('Artist:' + chalk.cyan(artistName));
                }
                var trackName = tracksArray[i].name;
                var trackLink = tracksArray[i].href;
                var trackAlbum = tracksArray[i].album.name;

                console.log('Song:', chalk.magentaBright(trackName));
                console.log('Album:', chalk.magentaBright(trackAlbum));
                console.log('Link:', chalk.magenta(trackLink));
                console.log(chalk.blackBright.dim("----------------------------"));
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    appendToLog(query);
};

//movie-this command
function movieThis(){
    if (!query) {
        query = "Mr. Nobody";
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
    axios
    .get(queryUrl)
    .then(function(response) {
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
    appendToLog(queryUrl);
};

//do-what-it-says command
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr[0]);
        console.log(dataArr[1]);

        command = dataArr[0];
        query = dataArr[1];

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
            default:
                console.log("Error");
        }
      
      });
      
};

//Appending all queries to log
function appendToLog(data){
    fs.appendFile("log.txt", data + "\n", function(err) {
        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          console.log("Content Added!");
        }
      });
};