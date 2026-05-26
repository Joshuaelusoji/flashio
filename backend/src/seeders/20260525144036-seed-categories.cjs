'use strict';
const { v4: uuidv4 } = require('uuid');

const categories = [
  { name: "Restaurants", icon: "🍽️", slug: "restaurants", color: "bg-orange-100", textColor: "text-orange-800" },
  { name: "Shops",       icon: "🛍️", slug: "shops",       color: "bg-blue-100",   textColor: "text-blue-800"   },
  { name: "Mall",        icon: "🛒", slug: "mall",        color: "bg-purple-100", textColor: "text-purple-800" },
  { name: "Local",       icon: "🥦", slug: "local",       color: "bg-green-100",  textColor: "text-green-800"  },
  { name: "Pharmacy",    icon: "🏥", slug: "pharmacy",    color: "bg-green-100",  textColor: "text-green-800"  },
  { name: "Laundromat",  icon: "👕", slug: "laundromat",  color: "bg-yellow-100", textColor: "text-yellow-800" },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Categories', categories.map(c => ({
      id: uuidv4(),
      name: c.name,
      icon: c.icon,
      slug: c.slug,
      color: c.color,
      textColor: c.textColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};