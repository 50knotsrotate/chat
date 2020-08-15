/*
    ENDPOINT(S): POST /signin

    PURPOSE: This middleware function is used to check the USERS table to make sure the POSTed username
    exists, and that the password provided by the user is correct.

*/

// Dependencies
const bcrypt = require("bcryptjs");
const { asyncMiddleware } = require("../utils");

module.exports.authenticateUser = asyncMiddleware(

  async function (req, res, next) {
    const db = req.app.get("db");

    const { username, password } = req.body;

    // Returns an array
    const [user] = await db.query(
      `SELECT * FROM USERS WHERE USERS.USERNAME = '${username}'`
    );

    // If a user was not found, return an error.
    if (!user) {
      return res.boom.badRequest(
        "darn it to heck, we cant find you. Double check your username."
      );
    }

    res.user = user;

    // Check the provided password against what was stored in the DB
    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res.boom.badRequest("That password is incorrect");
    }

    next();
  }
);
