const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'UNAHUR Anti-Social API',
            version: '1.0.0',
            description: 'API para la gestion de una red social minimalista',
            contact: {
                name: 'Los numero uno'
            },
            servers: [
                {
                    url: 'http://localhost:' + (process.env.PORT || 3000),
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = specs;