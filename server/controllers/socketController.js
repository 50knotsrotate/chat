function emitMessage(message, io) {
  // console.log('message socket controller 2')
  // console.log(message)
  if (message) io.in(message.channel_id).emit("message", message);
}

module.exports = {
  emitMessage,
};
