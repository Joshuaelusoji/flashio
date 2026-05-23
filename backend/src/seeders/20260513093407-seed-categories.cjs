'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('Categories', [
      { id: uuidv4(), name: "Restaurants", icon: "🍽️", slug: "restaurants", color: "bg-orange-100", textColor: "text-orange-800", createdAt: now, updatedAt: now },
      { id: uuidv4(), name: "Shops", icon: "🛍️", slug: "shops", color: "bg-blue-100", textColor: "text-blue-800", createdAt: now, updatedAt: now },
      { id: uuidv4(), name: "Mall", icon: "🛒", slug: "mall", color: "bg-purple-100", textColor: "text-purple-800", createdAt: now, updatedAt: now },
      { id: uuidv4(), name: "Local", icon: "🥦", slug: "local", color: "bg-green-100", textColor: "text-green-800", createdAt: now, updatedAt: now },
      { id: uuidv4(), name: "Pharmacy", icon: "🏥", slug: "pharmacy", color: "bg-green-100", textColor: "text-green-800", createdAt: now, updatedAt: now },
      { id: uuidv4(), name: "Laundromat", icon: "👕", slug: "laundromat", color: "bg-yellow-100", textColor: "text-yellow-800", createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};