async function getUserChannels(req, res, next) {
  const db = req.app.get("db");

  let userId = 1;

  const channels = await db.getUserChannels(userId)

  res.status(200).send(channels);
}

module.exports = {
  getUserChannels,
};
