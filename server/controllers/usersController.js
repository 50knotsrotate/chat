async function getUser(req, res, next) {
  // req.id is passed from checkToken
  const db = req.app.get("db");

  const [user] = await db.query(`SELECT * FROM users u WHERE u.id = ${req.id};`);

  if (user) return res.status(200).send(user)

  return res.boom.unauthorized();
}

module.exports = {
  getUser,
};
