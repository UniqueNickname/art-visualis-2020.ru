const express = require("express");
const consola = require("consola");
const mongoose = require("mongoose");
const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 100000
  })
);
app.use("/api/auth", require("./router/auth.rout"));
app.use("/api/users", require("./router/users.rout"));
app.use("/api/projects", require("./router/projects.rout"));

async function start() {
  try {
    // Init Nuxt.js
    const nuxt = new Nuxt(config);

    const { host, port } = nuxt.options.server;

    await mongoose.connect(
      "", //TODO: Добавить url до базы данных
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
      }
    );

    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt);
      await builder.build();
    } else {
      await nuxt.ready();
    }

    // Give nuxt middleware to express
    app.use(nuxt.render);

    // Listen the server
    app.listen(port, host);
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
  } catch (e) {
    consola.error({
      message: "Server error: " + e.message,
      badge: true
    });
    process.exit(1);
  }
}
start();
