"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SendAnErrand", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "REVIEWING",
          "APPROVED",
          "REJECTED",
          "ASSIGNED",
          "IN_PROGRESS",
          "COMPLETED",
          "CANCELLED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      adminNote: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      riderId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Indexes
    await queryInterface.addIndex("SendAnErrand", ["userId"]);
    await queryInterface.addIndex("SendAnErrand", ["riderId"]);
    await queryInterface.addIndex("SendAnErrand", ["status"]);
    await queryInterface.addIndex("SendAnErrand", ["createdAt"]);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex("SendAnErrand", ["userId"]);
    await queryInterface.removeIndex("SendAnErrand", ["riderId"]);
    await queryInterface.removeIndex("SendAnErrand", ["status"]);
    await queryInterface.removeIndex("SendAnErrand", ["createdAt"]);

    await queryInterface.dropTable("SendAnErrand");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_SendAnErrand_status";'
    );
  },
};