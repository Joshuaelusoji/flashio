'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Drinks', [
      { id: crypto.randomUUID(), name: 'Coca Cola',    price: 500,  location: 'Everywhere',      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Zobo Drink',   price: 700,  location: 'Lagos',            image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Orange Juice', price: 1200, location: 'Ikeja',            image: 'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?q=80&w=1200&auto=format&fit=crop', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Milkshake',    price: 1800, location: 'Victoria Island',  image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drinks', null, {});

  }
};
