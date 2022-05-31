const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then((db) => console.log(db.connection.host))
  .catch((err) => console.error(err));
