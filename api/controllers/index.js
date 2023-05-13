const express = require("express");
const router = express.Router();

// Socket.IO setup (based on documentation)
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
// since port 4000 is being used:
const cors = require('cors');
app.use(cors());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
  let room = "";
  // receive join event emitted by the client
  socket.on("join", (arg) => {
    console.log(arg);
    room = arg;
    socket.join(arg);
  });

  // receive send event emitted by the client
  socket.on("send", (arg) => {
    // send msg event to the client
    io.in(room).emit("msg", arg);
  });
});

// (REMOVE LATER)
// Test that server is running on port 4000
app.get('/', (req, res) => {
  res.send('Hello world');
});

httpServer.listen(4000);

const authController = require("./auth.js");
const buildingsController = require("./buildings.js");
const listingsController = require("./listings.js");
const itemTypesController = require("./itemTypes.js");
const messagesController = require("./messages.js");

router.use("/auth", authController);
router.use("/buildings", buildingsController);
router.use("/listings", listingsController);
router.use("/item-types", itemTypesController);
router.use("/messages", messagesController);

module.exports = router;