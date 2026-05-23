'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Drop the old Payment table first since this is a replacement
    await queryInterface.dropTable('Payment', { force: true }).catch(() => {});
    await queryInterface.dropTable('Payments', { force: true }).catch(() => {});

    await queryInterface.createTable('Payments', {
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

    await queryInterface.addIndex('Payments', ['orderId']);
    await queryInterface.addIndex('Payments', ['status']);
    await queryInterface.addIndex('Payments', ['paystackReference']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Payments');
  }
};