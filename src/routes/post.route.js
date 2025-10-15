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
  validarPost,
  validarPostById,
  validarFecha,
  validarUsuario,
} = require("../middlewares/validatePost");

const route = Router();

route.get("/fecha", validarFecha, verDesdeFecha);
route.get("/", findAll);
route.get("/:id", validarPostById, findByPk);
route.post("/", validarUsuario, validarPost, crearPost);
route.put("/:id", validarPostById, actualizarPost);
route.delete("/:id", validarPostById, eliminarPost);


module.exports = route;
