const genericSchemaValidator = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  return error;
};

module.exports = genericSchemaValidator;
