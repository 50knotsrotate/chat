/*
    --asyncMiddleware--

    This function takes a middleware as an argument and wraps it in a promise. 
    It will catch any 'silent' errors that could crash the server (No connection to DB, for example)
    This is a temporary fix until express 5 is released, where async errors
    will be handled automatically.

    This function must wrap any middleware that that uses async/await. 
*/

function asyncMiddleware(fn) { 
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(_err => { 
            console.log(_err)
            return res.boom.badRequest('Uh oh! Something went wrong on our end. Try again...');
        });
     }
};

function errorHandler(err,req, res, next) { 
    console.log(err);
    if (err.isBoom) {
        return res.send(err)
    } else { 
        return res.boom.badRequest("Uh oh! Something went wrong on our end. Try again.");
    }
}

function notFound(req, res, next) { 
    return res.boom.notFound();
}

function formatMessages(){
    const channels = [];

    messages.forEach((message, index, messages) => {
      const channelIndex = channels.findIndex(
        (channel) => channel.name === message.name
      );

      if (channelIndex > -1) {
        channels[channelIndex].messages.push(message);
      } else {
        channels.push({ name: messages[index].name, id: message.channel_id , messages: [message] });
      }
    });
    return channels
}

module.exports = {
    asyncMiddleware,
    errorHandler,
    notFound,
    formatMessages
}


