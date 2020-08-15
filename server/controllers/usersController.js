async function getUser(req, res, next) {
  const db = req.app.get("db");

  const [user] = await db.query(`select u.username from users u where u.id = ${req.params.id}`);

  if (!user) return res.boom.notFound();
    
  res.status(200).send(user);
}

module.exports = {
  getUser,
};
