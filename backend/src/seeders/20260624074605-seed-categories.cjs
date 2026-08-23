'use strict';

const CATEGORY_IDS = {
  restaurants: 'c1d2e3f4-a5b6-7890-abcd-ef1234567901',
  shops:       'c1d2e3f4-a5b6-7890-abcd-ef1234567902',
  mall:        'c1d2e3f4-a5b6-7890-abcd-ef1234567903',
  local:       'c1d2e3f4-a5b6-7890-abcd-ef1234567904',
  pharmacy:    'c1d2e3f4-a5b6-7890-abcd-ef1234567905',
  laundromat:  'c1d2e3f4-a5b6-7890-abcd-ef1234567906',
  errand:      'c1d2e3f4-a5b6-7890-abcd-ef1234567907'
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      { id: CATEGORY_IDS.restaurants, name: 'Restaurants', icon: '🍽️', slug: 'restaurants', color: 'bg-orange-100', textColor: 'text-orange-800', createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.shops,       name: 'Shops',       icon: '🛍️', slug: 'shops',       color: 'bg-blue-100',   textColor: 'text-blue-800',   createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.mall,        name: 'Mall',        icon: '🛒', slug: 'mall',        color: 'bg-purple-100', textColor: 'text-purple-800', createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.local,       name: 'Local',       icon: '🥦', slug: 'local',       color: 'bg-green-100',  textColor: 'text-green-800',  createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.pharmacy,    name: 'Pharmacy',    icon: '🏥', slug: 'pharmacy',    color: 'bg-green-100',  textColor: 'text-green-800',  createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.laundromat,  name: 'Laundromat',  icon: '👕', slug: 'laundromat',  color: 'bg-yellow-100', textColor: 'text-yellow-800', createdAt: new Date(), updatedAt: new Date() },
      { id: CATEGORY_IDS.errand,      name: 'Send an Errand', icon: '📦', slug: 'send-an-errand', color: 'bg-red-300', textColor: 'text-violet-500', createdAt: new Date(), updatedAt: new Date(),
},
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};