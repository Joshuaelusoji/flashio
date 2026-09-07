'use strict';

const { v4: uuidv4 } = require('uuid');

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
    await queryInterface.bulkInsert("Vendors", [
      {
        id: VENDOR_IDS.Tantalizer,
        path: "Tantalizer",
        name: "Tantalizer",
        imageId: "Tantalizer",
        location: "Ajebandele",
        deliveryTime: "20-30 mins",
        deliveryFee: 500,
        description: "Popular Nigerian restaurant serving authentic local dishes.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.Mr_Biggs,
        path: "Mr-Biggs",
        name: "Mr Biggs",
        imageId: "Mr-Bigg_s",
        location: "New era",
        deliveryTime: "15-25 mins",
        deliveryFee: 400,
        description: "Nigeria's favourite chicken chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.Crunchy,
        path: "Crunchy",
        name: "Crunchy",
        imageId: "Crunchies",
        location: "Mayfair",
        deliveryTime: "20-35 mins",
        deliveryFee: 450,
        description: "Classic Nigerian fast food chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.Captain_cook,
        path: "Captain-cook",
        name: "Captain Cook",
        imageId: "Captain-Cook",
        location: "Mayfair",
        deliveryTime: "20-35 mins",
        deliveryFee: 450,
        description: "Classic Nigerian fast food chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.MamaPut,
        path: "mama_put",
        name: "Mama Put",
        imageId: "https://placehold.co/400x300?text=Mama+Put",
        location: "Fagbale",
        deliveryTime: "25-40 mins",
        deliveryFee: 500,
        description: "Authentic Nigerian bukka experience.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.IvoryBite,
        path: "ivory_bite",
        name: "Ivory Bite",
        imageId: "Ivory-Bite",
        location: "Ibadan Road",
        deliveryTime: "15-25 mins",
        deliveryFee: 400,
        description: "Finger licking fast food experience.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Vendors", null, {});
  },
};