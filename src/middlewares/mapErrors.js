const mapErrors = (errores) => {
  return errores.details.map((e) => {
    return { atributo: e.path[0], mensaje: e.message };
  });
};

module.exports = mapErrors;