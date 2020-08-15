require("dotenv").config();

// Dependencies
const express = require("express");
const app = express();
const massive = require("massive");
const cors = require("cors");
const boom = require("express-boom");
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);
const cookieParser = require("cookie-parser");

const path = require("path");

// Auth middleware
const { authenticateUser } = require("./middleware/authenticateUser");
const checkFormComplete = require("./middleware/checkFormComplete");
const { checkUniqueUsername } = require("./middleware/checkUniqueUsername");
const saveUser = require("./middleware/saveUser");
const issueToken = require("./middleware/issueToken");
const checkToken = require("./middleware/checkToken");

// Messages Controller functions
const { getChannelMessages } = require("./controllers/messagesController");
const { addMessage } = require("./controllers/messagesController");
const { getUserMessages } = require("./controllers/messagesController");

// Channel controller
const { getUserChannels } = require("./controllers/channelsController");

// User controller
const { getUser } = require("./controllers/usersController");

// Socket/IO controller
const { emitMessage } = require("./controllers/socketController");

// Utils
const { asyncMiddleware, errorHandler, notFound, formatMessages } = require("./utils");

// Env
const { CONNECTION_STRING } = process.env;

// For easy error handling
app.use(boom());

// For parsing body of incoming post requests
app.use(express.json());

// For cookies
app.use(cookieParser());

// Sets allow-origin to *
app.use(cors("*"));

app.use(express.static(`${__dirname}/../dist/slacc-new`));

// let db;


console.log(CONNECTION_STRING)
// Connection to database
massive(CONNECTION_STRING)
  .then((_db) => {
    console.log('Connected to DB')
    app.set("db", _db);
    db = _db;
  })
  .catch((err) => console.log(err));

io.on("connection", async (socket) => {
  console.log('socket')
  socket.join(1);
  socket.join(2);

  socket.on("message", async (message) => {
    console.log('index 78')
    console.log(message)
    const query = `
                  INSERT INTO Messages(user_id, body, channel_id)
                  VALUES(${message.user_id},

                        '${message.body}',
                         ${message.channel_id});

                  select m.body, m.channel_id, m.id, c.name, u.username
                  from messages m
                  join channels c on c.id = m.channel_id
                  join users u on u.id = m.user_id
                  where m.channel_id in
                 (select cm.channel_id from channelMember cm where cm.user_id = 1)
                  order by m.id desc
                  limit 1;
                  `
    const [newMessage] = await db.query(query);

    if (newMessage) {
      console.log('new message index 99')
      console.log(newMessage)
      emitMessage(newMessage, io);
    }
  });
});

// Endpoints
app.post(
  "/auth/signup",
  checkFormComplete,
  checkUniqueUsername,
  saveUser,
  issueToken
);
app.post("/auth/signin", authenticateUser, issueToken);

app.get('/me', checkToken, async function(req, res, next){
    const [user] = await db.query(`
    SELECT * FROM users u WHERE u.id = ${req.id};
    `)

    if(user){
      return res.status(200).send(user)
    } else {
      return res.boom.unauthorized()
    }
});


// app.get('/channels',  checkToken, async (req, res, next) => {
//   const db = req.app.get('db')
//   const query = `
//     SELECT * FROM channels;
//   `

//   const channels = await db.query(query);

//   res.status(200).send(channels);
//  })

// Channel messages
app.get("/channels/:id/messages", checkToken, asyncMiddleware(getChannelMessages));
app.post("/channels/:id/messages", checkToken, asyncMiddleware(addMessage));

// User messages
// app.get("/users/:id/messages", checkToken, asyncMiddleware(getUserMessages));

// User channels
// app.get("/user/channels", checkToken, asyncMiddleware(getUserChannels));

// Users
// app.get("/users/:id", checkToken, asyncMiddleware(getUser));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname , '../', "dist/slacc-new/index.html"));
});

// Listen
server.listen(3002, () =>
  console.log("Authentication server started on: 3002")
);


