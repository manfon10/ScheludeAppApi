const { port } = require("./config");
const { connection } = require("./config/database");

const { app } = require("./app");

// Database Connection Init

connection();

app.listen(port, () => {
  console.log(`Express app running on port: ${port}`);
});
