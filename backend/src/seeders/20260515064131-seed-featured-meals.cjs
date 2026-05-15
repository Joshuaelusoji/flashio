'use strict';

const crypto = require('crypto');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('FeaturedMeals', [
      { id: crypto.randomUUID(), name: 'Jollof Rice & Chicken',   price: 2500, location: 'Surulere',       image: 'https://images.unsplash.com/photo-1603496987674-79600a000f55?q=80&w=985&auto=format&fit=crop', createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Amala & Ewedu',           price: 1800, location: 'Yaba',            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Pounded Yam & Egusi',     price: 3200, location: 'Lekki',           image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Fried Rice & Turkey',     price: 3000, location: 'Ikeja',           image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Ofada Rice & Sauce',      price: 2800, location: 'Ojodu',           image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Peppered Snail',          price: 4000, location: 'Victoria Island', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Suya Special',            price: 2200, location: 'Gbagada',         image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Beans & Plantain',        price: 1500, location: 'Akoka',           image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Burger & Fries',          price: 3500, location: 'Ikoyi',           image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=999&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Shawarma Combo',          price: 2700, location: 'Festac',          image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Spaghetti Bolognese',     price: 3100, location: 'Magodo',          image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Catfish Pepper Soup',     price: 4500, location: 'Ajah',            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Chicken Alfredo Pasta',   price: 3900, location: 'Chevron',         image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Small Chops Platter',     price: 2600, location: 'Maryland',        image: 'https://images.unsplash.com/photo-1516685018646-549d52c5d258?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Seafood Okra',            price: 5200, location: 'Lekki Phase 1',   image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'BBQ Chicken Pizza',       price: 4800, location: 'Sangotedo',       image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Basmati Coconut Rice',    price: 3400, location: 'Ogudu',           image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Yam Porridge & Fish',     price: 2900, location: 'Ebute Metta',     image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Ice Cream Waffles',       price: 2300, location: 'Lekki',           image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
      { id: crypto.randomUUID(), name: 'Grilled Fish & Chips',    price: 5500, location: 'Victoria Island', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=987&auto=format&fit=crop',  createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('FeaturedMeals', null, {});
  },
};