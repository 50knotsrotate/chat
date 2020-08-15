const { asyncMiddleware } = require('../utils');

async function getUserChannels(req, res, next) {
  const db = req.app.get("db");

  let userId = 1;

  const channels = await db.getUserChannels(userId)

  res.status(200).send(channels);
}

async function getAllChannels(req, res, next) {
  const db = req.app.get('db');

  const channels = await db.getAllChannels();

  res.status(200).send(channels);
};

module.exports = {
  getUserChannels: asyncMiddleware(getUserChannels),
  getAllChannels:  asyncMiddleware(getAllChannels)
};
