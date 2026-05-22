'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Payment', {

      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      currency: {
        type: Sequelize.STRING,
        defaultValue: 'NGN'
      },

      status: {
        type: Sequelize.ENUM(
          'PENDING',
          'PROCESSING',
          'SUCCESS',
          'FAILED',
          'REFUNDED',
          'CANCELLED'
        ),
        defaultValue: 'PENDING',
        allowNull: false
      },

      paymentMethod: {
        defaultValue: 'PAYSTACK',
        type: Sequelize.ENUM('PAYSTACK'),
        allowNull: false
      },

      paystackReference: {
        type: Sequelize.STRING,
        unique: true
      },

      paystackAccessCode: {
        type: Sequelize.STRING
      },

      paidAt: {
        type: Sequelize.DATE
      },

      metadata: {
        type: Sequelize.JSONB
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

    await queryInterface.addIndex('Payment', ['orderId']);
    await queryInterface.addIndex('Payment', ['status']);
    await queryInterface.addIndex('Payment', ['paystackReference']);

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Payment');
  }
};