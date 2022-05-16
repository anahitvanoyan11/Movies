const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

//routes
require("./app/routes/users.routes")(app);
require("./app/routes/movies.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

const db = require("./app/models");
db.sequelize.sync({force: false});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
