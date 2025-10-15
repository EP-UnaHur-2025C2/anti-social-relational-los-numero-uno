const genericSchemaValidator = (schema, data) => {
    const { error, value } = schema.validate(data, {abortEarly:false});
}

modules.export = genericSchemaValidator;