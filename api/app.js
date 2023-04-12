const express = require("express");
const expressSession = require("express-session");
const morgan = require("morgan");
const passport = require("./middlewares/authentication");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = process.env.PORT;
const seedDB = require("./utils/seedDB");

// this lets us parse 'application/json' content in http requests
app.use(express.json());

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use("/api", require("./controllers"));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // all unknown routes should be handed to our react app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

/*////////////////////////////////////////////////

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });

//////////////////////////////////////////////////*/

/* MODEL SYNCHRONIZATION & DATABASE SEEDING */
// Set up sync and seed process
const syncDatabase = async () => {
  try {
    // Model Synchronization:
    // - Make a connection between the Node.js application (this server app) and the Postgres database application.
    // - Create new tables (according to the models) in the Postgres database application, dropping tables first if they already existed
    await db.sequelize.sync({force: true});  // Drop table if already exists (force: true)
    console.log('------Synced to db--------')
    // Database Seeding
    await seedDB();  
    console.log('--------Successfully seeded db--------');
  } 
  catch (err) {
    console.error('syncDB error:', err);
  }  
}

syncDatabase();


// start up the server
if (PORT) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
  console.log("===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====");
}
