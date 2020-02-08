# liri-node-app

## What is LIRI app

LIRI is a node application (Much like iPhone's SIRI). It takes in a command line parameter and returns you back data. Pulling from APIs, this data includes songs from "Spotify", Concerts from "Bands in Town", and movies from "OMDB."

## App organization

At a high-level **liri.js** is our main javascript file that node runs. All of the other files are supporting files. Within the liri.js file we mainly use the SWITCH statement to dictate which function to run. The functions will then pull from the corresponding API to return the data that we are looking for. 

## How to run the app

Liri.js can take in the following commands

* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

Example (when entering this into command line):
`node liri.js movie-this matrix` 

This will return results for the movie query "matrix"

## Demo video

Since this is a command line application, it will need to run inside your terminal. Here is a video walkthrough of the application: 

[Video demonstration](https://youtu.be/2DTTb4v0IR8)

## Technologies/Modules used

Here are some NPM modules used in this application

* fs (Allowing read/write to file system)
* axios (Promise based HTTP client for the browser and node.js)
* Spotify (A simple wrapper for the Spotify API)
* moment (Parse, validate, manipulate, and display dates)
* chalk (Terminal styling, making command lines less boring)

## My role

Coder and Designer of LIRI app