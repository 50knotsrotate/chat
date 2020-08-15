// const { asyncMiddleware, errorHandler, notFound, formatMessages } = require("../utils");


async function getChannelMessages(req, res, next) {
  const db = req.app.get("db");

  const messages = await db.query(`
        select m.body, c.owner, u.username
        from messages m join channels c on m.channel_id = c.id
        join users u on m.user_id = u.id
        where c.id = '${req.params.id}'
  `);
  // console.log(messages)
  res.status(200).send(messages);
}

async function addMessage(req, res, next) {
  const db = req.app.get("db");
  const { message } = req.body;
  const [newMessage] = await db.query(
    `INSERT INTO Messages(user_id, body, channel_id) VALUES(${req.id}, ${message.body}, ${message.channel_id}) RETURNING *`
  );
  req.body.message = newMessage;

  next();
}

async function getUserMessages(req, res, next) {
  const db = req.app.get("db");

  const messages = await db.query(`

  select m.body, m.channel_id, m.id, c.name, u.username
  from messages m 
  join channels c on c.id = m.channel_id 
  join users u on u.id = m.user_id
  where m.channel_id in
  (select cm.channel_id from channelMember cm where cm.user_id = 1)
  order by c.name;

`);
// console.log(messages)
  res.send(messages);
}

module.exports = {
  getChannelMessages,
  addMessage,
  getUserMessages,
};
