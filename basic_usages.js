//var Profile = require("treehouse_profile");
const api = require("chatApi");

var studentProfile = new api.Profile("jonas.salomonsson");

var loginHandler = new api.Login("jonas.salomonsson", "hejsan");

/**
 * When the JSON body is fully received the 
 * "end" event is triggered and the full body
 * is given to the handler or callback
 **/
studentProfile.on("end", console.dir);
loginHandler.on("end", console.dir);

/**
 * If a parsing, network or HTTP error occurs an
 * error object is passed in to the handler or callback
 **/
studentProfile.on("error", console.error);
loginHandler.on("error", console.error);

