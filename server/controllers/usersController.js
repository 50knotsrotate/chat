const { asyncMiddleware } = require('../utils');

async function getUser(req, res, next) {
  // req.id is passed from checkToken
  const db = req.app.get("db");

  const [user] = await db.query(`SELECT * FROM users u WHERE u.id = ${req.id};`);

  if (user) return res.status(200).send(user)

  return res.boom.unauthorized();
};

async function getAllUsers(req, res, next) {
  const db = req.app.get('db');

  const users = db.getAllUsers();

  return res.status(200).send(users);
};

module.exports = {
  getUser,
  getAllUsers: asyncMiddleware(getAllUsers)
};
