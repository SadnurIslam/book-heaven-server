const app = require("./src/app");
const env = require("./src/config/env");

if (env.nodeEnv !== "production") {
  app.listen(env.port, () => {
    console.log(`Book Haven API listening on port ${env.port}`);
  });
}

module.exports = app;
