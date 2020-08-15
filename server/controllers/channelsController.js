const { asyncMiddleware } = require('../utils');

async function getUserChannels(req, res, next) {
  const db = req.app.get("db");

  const channels = await db.getUserChannels(req.params.id);

  return res.status(200).send(channels);
}

async function getAllChannels(req, res, next) {
  const db = req.app.get('db');

  const channels = await db.getAllChannels();

  res.status(200).send(channels);
};

async function createChannel(req, res, next) {
  const db = req.app.get('db');

  const [channel] = db.createChannel(req.id, req.body.name);

  res.status(200).send(channel);
};

async function getChannel(req, res, next) {
  const db = req.app.get('db');

  const [channel] = db.findChannelById(req.params.id);

  return res.status(200).send(channel);
};

async function deleteChannel(req, res, next) {
  const db = req.app.get('db');

  await db.deleteChannel(req.params.id);

  return res.status(200).send();
};

module.exports = {
  getUserChannels: asyncMiddleware(getUserChannels),
  getAllChannels:  asyncMiddleware(getAllChannels),
  createChannel:   asyncMiddleware(createChannel),
  deleteChannel: asyncMiddleware(deleteChannel),
  getChannel: asyncMiddleware(getChannel)
};
