// seeders/XXXXXX-seed-categories.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Restaurants', icon: '🍽️', path: '/restaurants', theme: 'orange', text: 'text-orange-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shops',       icon: '🛍️', path: '/shops',       theme: 'red', text: 'text-blue-600',   createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mall',        icon: '🛒', path: '/mall',        theme: 'purple', text: 'text-purple-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Local Market',icon: '🥬', path: '/market',      theme: 'green', text: 'text-yellow-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pharmacies',  icon: '🏥', path: '/pharmacies',  theme: 'blue', text: 'text-green-600',  createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laundry',     icon: '🧺', path: '/laundry',     theme: 'yellow', text: 'text-red-600',    createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};