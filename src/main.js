const express = require("express");
const postRoute = require("./routes/post.route");
const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/post", postRoute);

app.listen(PORT, async (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(`Aplicacion iniciada correctamente en el puerto ${PORT}`);
});
