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
      path: {
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
      imageId: {
      type: Sequelize.STRING,
      allowNull: true
      },
      rating: {
        type: Sequelize.DECIMAL(2, 2),
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

    await queryInterface.addIndex("Vendors", ["categoryId"]);            // solo categoryId
    await queryInterface.addIndex("Vendors", ["categoryId", "isActive"]); // composite
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Vendors");
  }
};