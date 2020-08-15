async function getChannelMessages(req, res, next) {
  const db = req.app.get("db");

  const messages = await db.getChannelMessages(req.params.id);

  res.status(200).send(messages);
}

async function addMessage(req, res, next) {
  const db = req.app.get("db");

  const { message } = req.body;

  const [newMessage] = await db.addMessage(req.id, message.body, message.channel_id);

  req.body.message = newMessage;

  next();
}

async function getUserMessages(req, res, next) {
  const db = req.app.get("db");

  const messages = await db.getUserMessage(req.id)

  res.send(messages);
}

module.exports = {
  getChannelMessages,
  addMessage,
  getUserMessages,
};
