'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');

    await queryInterface.createTable('RiderStatuses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      currentOrderId: {
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
      location: {
        type: 'GEOMETRY(POINT, 4326)',
        allowNull: true,
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

    await queryInterface.sequelize.query(`
      CREATE INDEX rider_status_location_idx
      ON "RiderStatuses"
      USING GIST (location);
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS rider_status_location_idx;
    `);

    await queryInterface.dropTable('RiderStatuses');
  }
};