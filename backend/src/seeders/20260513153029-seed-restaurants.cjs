'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', [
      { id: require('crypto').randomUUID(), name: 'Indeego Restaurants', path: '/restaurants/Indeego-Restaurants', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Falaju', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Ongbona', path: '/restaurants/Ongbona', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Energy', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Iya Ruka', path: '/restaurants/Iya-Ruka', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Oni Tower', path: '/restaurants/Oni-Tower', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Iya Maryam', path: '/restaurants/Iya-Maryam', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'OAU Campus', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Captain Cook', path: '/restaurants/Captain-Cook', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Surulere', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'IvoryBites Restaurant and Bakery', path: '/restaurants/IvoryBites-Restaurant-and-Bakery', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Ajebandele', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Yakoyo Afrikana', path: '/restaurants/Yakoyo-Afrikana', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Ojaja Moore', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Daily Menu', path: '/restaurants/Daily-Menu', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Lagere', createdAt: new Date(), updatedAt: new Date() },
      { id: require('crypto').randomUUID(), name: 'Country Kitchen', path: '/restaurants/Country-Kitchen', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});

  }
};
