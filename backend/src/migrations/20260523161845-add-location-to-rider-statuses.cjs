'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the location column
    await queryInterface.addColumn('RiderStatuses', 'location', {
      type: 'GEOMETRY(POINT, 4326)',
      allowNull: true,
    });

    // Add spatial index for fast nearby queries
    await queryInterface.sequelize.query(`
      CREATE INDEX rider_status_location_idx
      ON "RiderStatuses"
      USING GIST (location);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS rider_status_location_idx;
    `);

    await queryInterface.removeColumn('RiderStatuses', 'location');
  }
};