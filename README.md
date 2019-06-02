# Vibes Backend API

The backend API for the Vibes app. The main repo with full documentation is found [here](https://github.com/dartmouth-cs52-19S/project-goodvibesonly).

## Features

**Current Capabilities:**
* The backend allows you to be authenticated with Spotify and play music through Spotify's player
* Users can create a playlist and select a starting genre/vibe, which will populate the initial playlist using MongoDB to store the playlists and axios calls to access that database and the Spotify API
* This playlist will be location-based, in that users in the vicinity of a playlist will automatically be able to add to it, and once they leave, they no longer have access

## Architecture
Services:
* mongoDB backend
* used bcrypt, JWT, passport

Linter/Testing:
* Eslint with Airbnb Style Guide
* Travis CI

Framework:
* React Native with Expo-CLI

Libraries:
* Redux
* Babel
* Axios
* Spotify Web API

## Setup

To publish to heroku
1. Clone the repository and `cd project-api-goodvibesonly`
2. run `yarn`
3. Create and account/log in to Heroku and create a new project.
4. Now you need to connect to a mongo database. Go to Resources and search for “mLab” under Add-Ons. Provision the Sandbox version of mLab for your app. This will automatically set a MONGODB_URI config variable so once you push your code to Heroku it will connect to this new mongo database. You’ll need to enter in a credit card but it is free so it won’t be charged.
5. Follow the steps under “Deploy Using Heroku Git”. But really all you need is to add a new git remote - find your heroku git URL by going to “Settings” and then do git remote add heroku `https://git.heroku.com/cs52-blog.git`.
6. To host on heroku all you need to do is `git push heroku master`, this will push your code and run the yarn command that is listed in your Procfile to launch your app.

To run locally:
1. Clone the respository and `cd project-api-goodvibesonly`
2. Run `yarn`
3. Run `mongod &`
4. Open another terminal directory and navigate into the `project-api-goodvibesonly` directory
5. Run `yarn start` in this terminal window
6. To connect the project frontend to the locally running backend, go into the file `src/actions/index.js` and change the `API_URL` to `https://localhost:9090/api`

## Deployment

The backend server is deployed to heroku [here](https://good-vibes-only.herokuapp.com/).

## Authors
* Angi Li '20
* Danah Han '20
* Grace Dorgan '21
* Shoshana Geller '20
* Emma Langfitt '20

## Acknowledgments

We leveraged documentation from Spotify's Web API to implement many features of our app. We would also like to give a huge thank you to our professor **Tim Tregubov** and our **TA's** in CS52 (Full-Stack Web Development) at Dartmouth College for guidance and support, as well as our fellow classmates. We would also like to thank **#MEN #IN #STEM** (especially Travis) for giving us the emotional capacity to make it through this project. Couldn't have done it without you. *#hackerwomen #womenwhocode #shrillwomen*
