module.exports = function(graph_api) {

  //Get messages sent to the bot by the user
  module._getMessages = function(req) {
    let msgs = [],
        data = req.body;

    // Make sure this is a page subscription
    if (data.object == 'page'){
      for (let pageEntry of data.entry){
        for (let messagingEvent of pageEntry.messaging) {
          if (messagingEvent.message) { msgs.push(messagingEvent); }
          // if (messagingEvent.postback.payload === 'get_started') {
          //   graph_api._callSendAPI({
          //     recipient: {
          //       id: messagingEvent.sender.id
          //     },
          //     message: {
          //       text: "Welcome"
          //     }
          //   });
          // }
        }
      }
    }
    return msgs;
  }

  // Handle received message
  module._handleMessage = function(message) {
    let senderID = message.sender.id;
    this._sendMessage(senderID, message.message.text.toLowerCase());
  }

  // Send message from the bot to the user
  module._sendMessage = function(recipientId, text) {
    var message = {
      text: text,
      metadata: 'DEVELOPER_DEFINED_METADATA'
    };

    if (text == "hey") {
      message.text = "Ho!";
    }

    if (text == "start") {
      message = {
        "get_started": {
          "payload": "FIRST"
        }
      };
    }

    let messageData = {
      recipient: {
        id: recipientId
      },
      message: message
    };

    graph_api._callSendAPI(messageData);
  }

  return module;

}
