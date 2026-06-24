'use strict';

const VENDOR_IDS = {
  indeego: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
  iyaRuka: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
  oniTower: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
  ongbona: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
  mamaPut: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805',
  ivoryBite: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806',
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      // Indeego Restaurant
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560101',
        name: 'Jollof Rice',
        description: 'Party jollof rice with smoky flavour',
        price: 2500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.indeego,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560102',
        name: 'Egusi Soup + Eba',
        description: 'Rich egusi soup served with eba',
        price: 3000.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.indeego,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560103',
        name: 'Pounded Yam + Banga Soup',
        description: 'Smooth pounded yam with banga soup',
        price: 3500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.indeego,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Iya Ruka
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560201',
        name: 'Fried Chicken',
        description: 'Crispy fried chicken pieces',
        price: 2800.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.iyaRuka,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560202',
        name: 'Chicken + Jollof Rice',
        description: 'Fried chicken with jollof rice combo',
        price: 3500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.iyaRuka,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Oni Tower
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560301',
        name: 'Shawarma',
        description: 'Chicken shawarma with coleslaw and sauce',
        price: 2000.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.oniTower,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560302',
        name: 'Beef Burger',
        description: 'Juicy beef burger with fries',
        price: 2500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.oniTower,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ongbona
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560401',
        name: 'Amala + Ewedu',
        description: 'Soft amala with ewedu and gbegiri',
        price: 2000.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.ongbona,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560402',
        name: 'Tuwo + Miyan Kuka',
        description: 'Northern style tuwo with miyan kuka',
        price: 2200.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.ongbona,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Mama Put
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560501',
        name: 'White Rice + Stew',
        description: 'Plain white rice with Nigerian tomato stew',
        price: 1500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.mamaPut,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560502',
        name: 'Beans + Plantain',
        description: 'Cooked beans with fried plantain',
        price: 1800.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.mamaPut,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ivory Bite
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560601',
        name: 'Peppered Snail',
        description: 'Spicy peppered snail starter',
        price: 3500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.ivoryBite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560602',
        name: 'Grilled Fish',
        description: 'Whole grilled tilapia with spicy sauce',
        price: 4500.00,
        isAvailable: true,
        imageUrl: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.ivoryBite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};