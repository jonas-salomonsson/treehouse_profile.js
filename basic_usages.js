//var Profile = require("treehouse_profile");
var Login = require("treehouse_profile");

//var studentProfile = new Profile("jonas.salomonsson");
var loginProfile = new Login("{'username': 'jonas.salomonsson', 'password': 'hejsan'}");
loginProfile.on("end", console.dir);
loginProfile.on("error", console.error);

/**
 * When the JSON body is fully received the 
 * "end" event is triggered and the full body
 * is given to the handler or callback
 **/
//studentProfile.on("end", console.dir);

/**
 * If a parsing, network or HTTP error occurs an
 * error object is passed in to the handler or callback
 **/
//studentProfile.on("error", console.error);
