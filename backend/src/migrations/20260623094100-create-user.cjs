'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING(19)
      },
      role: {
        type: Sequelize.ENUM('USER', 'VENDOR', 'RIDER', 'ADMIN'),
        defaultValue: 'USER'
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailTokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true
      },
      failedLoginAttempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      lockUntil: {
        type: Sequelize.DATE,
        allowNull: true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};