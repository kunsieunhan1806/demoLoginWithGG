const express = require("express");
const cors = require("cors");
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const amazonStrategy = require("passport-amazon").Strategy;
const gitHubStrategy = require("passport-github").Strategy;
const googleStrategy = require("passport-google-oauth20").Strategy;
const instagramStrategy = require('passport-instagram').Strategy;
const spotifyStrategy = require("passport-spotify").Strategy;
const twitchStrategy = require("passport-twitch.js").Strategy;
const twitterStrategy = require('passport-twitter').Strategy;
const keys = require("../config");
const chalk = require("chalk");
let user = {};

passport.serializeUser((user, callback) => {
    callback(null, user);
});
passport.deserializeUser((user, callback) => {
    callback(null, user);
});


const app = new express();
app.use(cors());
app.use(passport.initialize());

//facebook Strategy 
passport.use(new facebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
},
    (accessToken, refreshToken, profile, callback) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return callback(null, profile);
    }));

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback",
    passport.authenticate(("facebook"),
        (req, res) => {
            res.redirect("/profile");
        }));

//Google Strategy 
passport.use(new googleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
    (accessToken, refreshToken, profile, callback) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return callback(null, profile);
    }));

app.get("/auth/google", passport.authenticate("google"), {
    scope: ["profile", "email"]
});
app.get("/auth/google/callback",
    passport.authenticate(("google"),
        (req, res) => {
            res.redirect("/profile");
        }));

//amazon Strategy 
passport.use(new amazonStrategy({
    clientID: keys.AMAZON.clientID,
    clientSecret: keys.AMAZON.clientSecret,
    callbackURL: "/auth/amazon/callback"
},
    (accessToken, refreshToken, profile, callback) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return callback(null, profile);
    }));

app.get("/auth/amazon", passport.authenticate("amazon"), {
    scope: ["profile"]
});
app.get("/auth/amazon/callback",
    passport.authenticate(("amazon"),
        (req, res) => {
            res.redirect("/profile");
        }));

app.get("/user", (req, res) => {
    console.log("getting user data");
    res.send(user);
});

app.get("auth/logout",(req,res)=>{
    console.log("logging out");
    user = {};
    res.redirect('/');
})

const PORT =  5000;

app.listen(PORT);