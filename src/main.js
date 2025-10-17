const express = require("express");
const app = express();
const db = require("../db/models");
const tagRoutes = require('./routes/tag.routes'); 
const postTagRoutes = require('./routes/postTag.routes');
const routerComment = require("./routes/comment.routes");
const usuarioRoutes = require('./routes/usuario.routes');
const PORT = process.env.PORT || 3000;
const swaggerUI = require('swagger-ui-express');
const specs = require('../swagger/swagger');

app.use(express.json());
app.use('/tags', tagRoutes); 
app.use('/postTag', postTagRoutes);
app.use("/comments", routerComment);
app.use('/usuarios', usuarioRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, async () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
  await db.sequelize.sync();
});
