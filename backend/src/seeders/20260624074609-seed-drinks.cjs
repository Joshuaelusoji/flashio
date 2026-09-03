'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drinks', [
      {
        id: uuidv4(),
        name: 'Coca-Cola',
        price: 800,
        imageId: 'https://placehold.co/400x300?text=Coca-Cola',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Pepsi',
        price: 800,
        imageId: 'https://placehold.co/400x300?text=Pepsi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Fanta Orange',
        price: 700,
        imageId: 'https://placehold.co/400x300?text=Fanta+Orange',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Sprite',
        price: 550,
        imageId: 'https://placehold.co/400x300?text=Sprite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Maltina',
        price: 1000,
        imageId: 'https://placehold.co/400x300?text=Maltina',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Hollandia Yoghurt',
        price: 2200,
        imageId: 'https://placehold.co/400x300?text=Hollandia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Chivita Juice',
        price: 1600,
        imageId: 'https://placehold.co/400x300?text=Chivita',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Trophy Lager',
        price: 1000,
        imageId: 'https://placehold.co/400x300?text=Trophy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drinks', null, {});
  },
};