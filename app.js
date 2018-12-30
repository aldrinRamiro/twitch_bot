var tmi = require('tmi.js');
var last, current;

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "mizztestbot",
        password: "password here" //oauth here
    },
    channels: [""] //list channels
};

var client = new tmi.client(options);
client.connect();

//Action when joining channel
client.on("connected", function(address, port){
    client.action("", "Hi");      //channel greetings
});

//If "PogChamp" is typed by a user, send "PogChamp"
client.on("chat", function (channel, userstate, message, self) {
    if (self) return; //Prevent loop

    var current = new Date().getTime();
    var elapsed = current - last;


    if (last == null || elapsed > 30000 ){ //Only post message every 30 sec
      if(message === "PogChamp"){
          last = new Date().getTime();
          client.action(channel, "PogChamp");
      }
  }
});
