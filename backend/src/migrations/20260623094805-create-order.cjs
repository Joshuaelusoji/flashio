'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'),
        defaultValue: 'PENDING'
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      deliveryAddress: {        // ← added
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      riderId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Riders',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      deliveryCode: {
        type: Sequelize.STRING(4),
        allowNull: true
      },
      deliveryCodeUsed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isActive: {               // ← added
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {              // ← added for paranoid: true
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addIndex('Orders', ['userId']);            // solo userId
    await queryInterface.addIndex('Orders', ['userId', 'status']);  // composite
    await queryInterface.addIndex('Orders', ['riderId']);            // solo riderId
    await queryInterface.addIndex('Orders', ['riderId', 'status']);  // composite
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};