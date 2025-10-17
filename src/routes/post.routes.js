const { Router } = require("express"); //desestructuracion de express, solo utilizo el modulo Router.
const {
  findAll,
  findByPk,
  crearPost,
  eliminarPost,
  verDesdeFecha,
  agregarImagenes,
  eliminarImagenes,
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
route.post("/:id", validarPostById, agregarImagenes);
route.post("/:id", validarPostById, eliminarImagenes);
route.delete("/:id", validarPostById, eliminarPost);

module.exports = route;
