const { Router } = require("express"); //desestructuracion de express, solo utilizo el modulo Router.
const {
  findAll,
  findByPk,
  crearPost,
  actualizarPost,
  eliminarPost,
  verDesdeFecha,
} = require("../controllers/post.controller");

const {
  validarBodyPost,
} = require("../middlewares/post.middleware");

const route = Router();

route.get("/fecha", verDesdeFecha);
route.get("/", findAll);
route.get("/:id", findByPk);
route.post("/", validarBodyPost, crearPost);
route.put("/:id", actualizarPost);
route.delete("/:id", eliminarPost);


module.exports = route;
