var EventEmitter = require("events").EventEmitter;
var https = require("https");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */

function Profile(username) {
    EventEmitter.call(this);
    profileEmitter = this;

    // Connect to the API URL (https://teamtreehouse.com/username.json)
    //var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
    var request = https.get("https://synapse.cynergit.nu/_matrix/client/r0/profile/@" + username + ":synapse.cynergit.nu", function(response) {
        var body = "";
        
        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + https.STATUS_CODES[response.statusCode] + ")"));
        }

        // Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    // Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error) {
            profileEmitter.emit("error", error);
        });
    });
}


/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @param password
 * @constructor
 */

function Login(username, password) {
    EventEmitter.call(this);
    loginEmitter = this;

    var request = https.get("https://synapse.cynergit.nu", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            loginEmitter.emit("error", new Error("There was an error trying to login. (" + https.STATUS_CODES[response.statusCode] + ")"));
        }

        response.on('data', function(chunk) {
            body += chunk;
            loginEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    var login = JSON.parse(body);
                    loginEmitter.emit("end", login);
                } catch (error) {
                    loginEmitter.emit("error", error);
                }
            }
        }).on("error", function(error) {
            loginEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, Login, EventEmitter );

module.exports = { Profile, Login };
