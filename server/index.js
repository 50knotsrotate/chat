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
const { deleteMessage } = require('./controllers/messagesController');
const { getUserMessages } = require("./controllers/messagesController");
const { getAllMessages } = require('./controllers/messagesController');

// Channel controller
const { getUserChannels } = require("./controllers/channelsController");
const { getAllChannels } = require('./controllers/channelsController');
const { createChannel } = require('./controllers/channelsController');
const { deleteChannel } = require('./controllers/channelsController');

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

let db;


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
    const [newMessage] = await db.createMessage(message.user_id, message.body, message.channel_id);

    if (newMessage) emitMessage(newMessage, io);
  });
});

// Endpoints

// Auth
app.post("/auth/signup",checkFormComplete,checkUniqueUsername,saveUser,issueToken);
app.post("/auth/signin", authenticateUser, issueToken);

app.get('/me', checkToken, getUser);


// Channels
app.get('/channels', checkToken, getAllChannels);
app.post('/channels', checkToken, createChannel)
app.put('/channels/:id', checkToken);
app.delete('/channels/:id', checkToken);

app.get('/messages', checkToken, getAllMessages);
app.post('/messages', checkToken, addMessage);
app.put('/messages/:id', checkToken);
app.delete('/messages/:id', checkToken, deleteMessage);

app.get("/channels/:id/messages", checkToken, asyncMiddleware(getChannelMessages));
app.post("/channels/:id/messages", checkToken, asyncMiddleware(addMessage));

// User messages
app.get("/users/:id/messages", asyncMiddleware(getUserMessages));

// User channels
app.get("/user/channels", checkToken, asyncMiddleware(getUserChannels));
app.post('/user/channels', checkToken)
app.put('/user/channels/:id', checkToken);
app.delete('/user/channels/:id', checkToken)

// Users
// app.get("/users/:id", checkToken, asyncMiddleware(getUser));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname , '../', "dist/slacc-new/index.html"));
});

// Listen
server.listen(3002, () =>
  console.log("Authentication server started on: 3002")
);


