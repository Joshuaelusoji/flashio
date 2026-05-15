'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Restaurants', [
      { id: uuidv4(), name: 'Indeego Restaurants', path: '/restaurants/Indeego-Restaurants', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Falaju', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Ongbona', path: '/restaurants/Ongbona', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Energy', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Iya Ruka', path: '/restaurants/Iya-Ruka', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Oni Tower', path: '/restaurants/Oni-Tower', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Iya Maryam', path: '/restaurants/Iya-Maryam', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'OAU Campus', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Captain Cook', path: '/restaurants/Captain-Cook', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Surulere', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'IvoryBites Restaurant and Bakery', path: '/restaurants/IvoryBites-Restaurant-and-Bakery', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Ajebandele', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Yakoyo Afrikana', path: '/restaurants/Yakoyo-Afrikana', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Ojaja Moore', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Daily Menu', path: '/restaurants/Daily-Menu', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Lagere', createdAt: new Date(), updatedAt: new Date() },
      { id: uuidv4(), name: 'Country Kitchen', path: '/restaurants/Country-Kitchen', image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55', location: 'Mayfair', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  },
};