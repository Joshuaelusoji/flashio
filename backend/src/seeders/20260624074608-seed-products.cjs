'use strict';

const VENDOR_IDS = {
  Tantalizer: 'a1b2c3d4-e5f6-7890-abcd-ef1234567801',
  Mr_Biggs: 'a1b2c3d4-e5f6-7890-abcd-ef1234567802',
  Crunchy: 'a1b2c3d4-e5f6-7890-abcd-ef1234567803',
  Captain_cook: 'a1b2c3d4-e5f6-7890-abcd-ef1234567804',
  MamaPut: 'a1b2c3d4-e5f6-7890-abcd-ef1234567805',
  IvoryBite: 'a1b2c3d4-e5f6-7890-abcd-ef1234567806',
};

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      // Indeego Restaurant
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560101',
        name: 'Jollof Rice & Chicken',
        description: 'Party jollof rice with smoky flavour',
        price: 2500.00,
        isAvailable: true,
        imageId: 'Jollof-Rice',
        vendorId: VENDOR_IDS.Tantalizer,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560102',
        name: 'Amala & Ewedu',
        description: 'Rich egusi soup served with eba',
        price: 3000.00,
        isAvailable: true,
        imageId: 'Amala',
        vendorId: VENDOR_IDS.MamaPut,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560103',
        name: 'Pounded Yam & Banga Soup',
        description: 'Smooth pounded yam with banga soup',
        price: 3500.00,
        isAvailable: true,
        imageId: 'flashio/images/featuredMeals/Pounded-Yam',
        vendorId: VENDOR_IDS.MamaPut,
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
        imageId: 'flashio/images/featuredMeals/Fried-Chicken',
        vendorId: VENDOR_IDS.Crunchy,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560202',
        name: 'Pizza',
        description: 'Pizza with cheese and toppings of your choice',
        price: 3500.00,
        isAvailable: true,
        imageId: 'flashio/images/featuredMeals/Pizza',
        vendorId: VENDOR_IDS.Crunchy,
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
        imageId: 'flashio/images/featuredMeals/Shawarma',
        vendorId: VENDOR_IDS.Captain_cook,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560302',
        name: 'Beef Burger',
        description: 'Juicy beef burger with fries',
        price: 2500.00,
        isAvailable: true,
        imageId: 'flashio/images/featuredMeals/Beef-Burger',
        vendorId: VENDOR_IDS.Captain_cook,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ongbona
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560401',
        name: 'Amala & Gbegiri',
        description: 'Soft amala with ewedu and gbegiri',
        price: 2000.00,
        isAvailable: true,
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.Crunchy,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560402',
        name: 'Tuwo + Miyan Kuka',
        description: 'Northern style tuwo with miyan kuka',
        price: 2200.00,
        isAvailable: true,
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.Captain_cook,
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
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.MamaPut,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560502',
        name: 'Beans + Plantain',
        description: 'Cooked beans with fried plantain',
        price: 1800.00,
        isAvailable: true,
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.MamaPut,
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
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.IvoryBite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b1c2d3e4-f5a6-7890-abcd-ef1234560602',
        name: 'Grilled Fish',
        description: 'Whole grilled tilapia with spicy sauce',
        price: 4500.00,
        isAvailable: true,
        imageId: 'https://placehold.co/200x200',
        vendorId: VENDOR_IDS.IvoryBite,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};