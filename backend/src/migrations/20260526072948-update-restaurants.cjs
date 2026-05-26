'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Restaurants', 'rating', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Restaurants', 'deliveryTime', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Restaurants', 'deliveryFee', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn('Restaurants', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Restaurants', 'rating');
    await queryInterface.removeColumn('Restaurants', 'deliveryTime');
    await queryInterface.removeColumn('Restaurants', 'deliveryFee');
    await queryInterface.removeColumn('Restaurants', 'description');
  },
};