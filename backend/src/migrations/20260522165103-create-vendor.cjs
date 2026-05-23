'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Vendors", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      imageUrl: {
        type: Sequelize.STRING,
      },

      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0.0,
      },

      deliveryTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      deliveryFee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Performance indexes
    await queryInterface.addIndex("Vendors", ["categoryId"]);
    await queryInterface.addIndex("Vendors", ["isActive"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Vendors");
  }
};