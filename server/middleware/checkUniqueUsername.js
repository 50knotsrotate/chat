/*
    ENDPOINT(S): POST /signup

    PURPOSE: This middleware function is used to check the USERS table to make sure the provided
    username does not already exist before creating a new record. I already set up a
    UNIQUE constraint in the USERS table, so it won't be allowed to happen anyway,
    but using this middleware will make it easier for me to write a custom error message
    to the user in the event a username already taken, instead of the one
    that is thrown by massive.js, which looks like this:
    duplicate key value violates unique constraint \"users_username_key.
    Ew.
*/

const { asyncMiddleware } = require('../utils')

module.exports.checkUniqueUsername = asyncMiddleware(

  async function (req, res, next) {
    const db = req.app.get("db");

    const { username } = req.body;

    const [user] = await db.getUser(username);

    if (user) return res.boom.badRequest("Sorry, that username is taken");

    next();
  }
);
