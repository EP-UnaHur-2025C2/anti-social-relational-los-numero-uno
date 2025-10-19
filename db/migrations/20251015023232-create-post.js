'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      UsuarioId: { // Tipo clave foranea acá
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios', // La conecto a Usuario por la key de id
          key: 'id'      
        },
        onDelete: 'CASCADE'  // El CASCADE acá es lo que debería hacer que lo borre también
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};