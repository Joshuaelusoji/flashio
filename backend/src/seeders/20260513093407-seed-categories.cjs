// seeders/XXXXXX-seed-categories.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Restaurants', icon: '🍽️', path: '/restaurants', color: 'bg-orange-700', text: 'text-orange-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shops',       icon: '🛍️', path: '/shops',       color: 'bg-red-100',    text: 'text-blue-600',   createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mall',        icon: '🛒', path: '/mall',        color: 'bg-purple-100', text: 'text-purple-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Local Market',icon: '🥬', path: '/market',      color: 'bg-green-100',  text: 'text-yellow-600', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pharmacies',  icon: '🏥', path: '/pharmacies',  color: 'bg-blue-100',   text: 'text-green-600',  createdAt: new Date(), updatedAt: new Date() },
      { name: 'Laundry',     icon: '🧺', path: '/laundry',     color: 'bg-yellow-100', text: 'text-red-600',    createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};