const express = require("express");
const app = express();
const db = require("../db/models");
const tagRoutes = require('./routes/tagRoutes'); 
const postTagRoutes = require('./routes/postTagRoutes');
//const router = require('')
const PORT = process.env.PORT || 3000;

app.use(express.json());

//app.use('', router)
app.use('/api/tags', tagRoutes); 
app.use('/api/posts', postTagRoutes);


app.listen(PORT, async () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
  await db.sequelize.sync();
});
