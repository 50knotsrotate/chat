const { constants } = require("karma");

async function getUserChannels(req, res, next) {
  const db = req.app.get("db");

  // const { userId } = req;

  let userId = 1;

  const channels = await db.getUserChannels(userId)

  // TODO: Dont need this anymore.
  const firstChannelId = channels[0].id;

  const firstChannelMessages = await db.query(
    `select u.username, m.body from users u join Messages m on m.user_id = u.id where m.channel_id = ${firstChannelId};`
  );

  channels[0].messages = firstChannelMessages;

  res.status(200).send(channels);
}

module.exports = {
  getUserChannels,
};
