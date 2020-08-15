/*
    ROUTE(S): POST /signup
    PURPOSE: This middleware function takes a users password, hashes it, and then inserts it into the DB.

*/

// Dependencies
const bcrypt = require("bcryptjs");

const { asyncMiddleware } = require('../utils');

module.exports = asyncMiddleware(
  async function saveUser(req, res, next) {
    const db = req.app.get("db");

    const { username, password } = req.body;

    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO USERS(username,password) VALUES('${username}', '${hashedPassword}') RETURNING *;`;

    const [user] = await db.query(query);

    if (!user) {
      return res.boom.badImplementation(
        "Uh oh! Something went wrong and your account was not created."
      );
    }
    res.user = user;
    next();
  }
);
