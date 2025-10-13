const express = require("express");
const app = express();
const db = require("../db/models");
//const router = require('')
const PORT = process.env.PORT || 3000;
const postImageRoutes = require("./routes/postImageRoutes");
app.use("/postImage", postImageRoutes);


app.use(express.json());

//app.use('', router)

app.listen(PORT, async () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
  await db.sequelize.sync();
});
