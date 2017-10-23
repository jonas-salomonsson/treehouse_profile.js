const EventEmitter = require("events").EventEmitter;
var http = require("http");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */

function Profile(username) {
    EventEmitter.call(this);
    profileEmitter = this;

    // Connect to the API URL (http://teamtreehouse.com/username.json)
    //var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
    var request = http.get("http://192.168.1.110:8008/_matrix/client/", function(response) {
        var body = "";
        
        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        // Read the data
        response.on('data', function(chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function() {
            if(response.statusCode === 200) {
                try {
                    // Parse the data
                    var profile = body;//JSON.parse(body);
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

    var request = http.get("http://192.168.1.110:8008/_matrix/client/r0/register?kind=guest", function(response) {
        var body = "";

        if (response.statusCode !== 200) {
            request.abort();
            loginEmitter.emit("error", new Error("There was an error trying to login. (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        response.on('data', function(chunk) {
            body += chunk;
            loginEmitter.emit("data", chunk);
        });

        response.on('end', function() {
            if(response.statusCode === 200) {
                try {
                    var login = body;//JSON.parse(body);
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

module.exports = {
    Profile : Profile,
    Login : Login
}
