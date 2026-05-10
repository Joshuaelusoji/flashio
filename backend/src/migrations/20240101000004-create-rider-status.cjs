'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RiderStatuses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      current_order_id: {
        type: Sequelize.UUID
      },
      riderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Riders',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('RiderStatuses');
  }
};