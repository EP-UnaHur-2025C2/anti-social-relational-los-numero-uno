const { Router } = require('express');
const {
  findAll,
  findByPk,
  createUser,
  actualizarUser,
  eliminarUser,
} = require("../controllers/usuarioController.js");

const {
  validarUser,
  validarUserById,
} = require("../middlewares/validateUsuario.js");
const route = Router()

route.get("/", findAll);
route.get("/:id", validarUserById, findByPk);
route.post("/", validarUser, createUser);
route.put("/:id", validarUserById, actualizarUser);
route.delete("/:id", validarUserById, eliminarUser);


modules.export = route;