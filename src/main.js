const express = require("express");
const app = express();
const db = require("../db/models");
const routerComment = require("./routes/commentRoutes");
const PORT = process.env.PORT || 3000;
const swaggerUI = require('swagger-ui-express');
const specs = require('../swagger/swagger');

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/comments", routerComment);

app.listen(PORT, async () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
  await db.sequelize.sync();
});
