'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FeaturedMeals', [
      {
        id: uuidv4(),
        name: 'Jollof Rice & Chicken',
        price: 3500,
        location: 'Lagos Island',
        image: 'images/featuredMeals/Jollof_rice.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Peppered Suya Platter',
        price: 4200,
        location: 'Victoria Island',
        image: 'images/featuredMeals/Suya.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Egusi Soup & Pounded Yam',
        price: 5000,
        location: 'Lekki Phase 1',
        image: 'images/featuredMeals/Pounded_yam.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Grilled Catfish & Chips',
        price: 6500,
        location: 'Ikoyi',
        image: 'images/featuredMeals/Catfish.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Ofada Rice & Ayamase',
        price: 4000,
        location: 'Surulere',
        image: 'images/featuredMeals/Ofada_rice.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Asun & Plantain',
        price: 3800,
        location: 'Yaba',
        image: 'images/featuredMeals/Asun_plantain.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FeaturedMeals', null, {});
  }
};