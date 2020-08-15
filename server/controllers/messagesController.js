const { asyncMiddleware } = require('../utils');
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

async function getAllMessages(req, res, next) {
  const db = req.app.get('db');

  const messages = db.getAllMessages();

  return res.status(200).send(messages);
 }

async function getUserMessages(req, res, next) {
  const db = req.app.get("db");

  const messages = await db.getUserMessages(req.params.id);

  return res.status(200).send(messages);
}

async function deleteMessage(req, res, next) {
  const db = req.app.get('db');

  await db.deleteMessage();

  return res.status(200).send();
}

async function getMessage(req, res, next) {
  const db = req.app.get('db');

  const [message] = db.findMessageById(req.params.id);

  return res.status(200).send(message);
}

module.exports = {
  getChannelMessages,
  addMessage,
  getUserMessages: asyncMiddleware(getUserMessages),
  getAllMessages: asyncMiddleware(getAllMessages),
  deleteMessage: asyncMiddleware(deleteMessage),
  getMessage : asyncMiddleware(getMessage)
};
