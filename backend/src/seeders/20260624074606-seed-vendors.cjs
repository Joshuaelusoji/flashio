'use strict';

const { v4: uuidv4 } = require('uuid');

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
    await queryInterface.bulkInsert("Vendors", [
      {
        id: VENDOR_IDS.indeego,
        path: "indeego-restaurant",
        name: "Indeego",
        imageUrl: "/images/restaurants/Indeego.webp",
        location: "Fagbale",
        deliveryTime: "20-30 mins",
        deliveryFee: 500,
        description: "Popular Nigerian restaurant serving authentic local dishes.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.iyaRuka,
        path: "iya-ruka",
        name: "Iya Ruka",
        imageUrl: "/images/restaurants/Iya_ruka.jpg",
        location: "Obande",
        deliveryTime: "15-25 mins",
        deliveryFee: 400,
        description: "Nigeria's favourite chicken chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.oniTower,
        path: "oni-tower",
        name: "Oni Tower",
        imageUrl: "https://placehold.co/56x56",
        location: "Mayfair",
        deliveryTime: "20-35 mins",
        deliveryFee: 450,
        description: "Classic Nigerian fast food chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.ongbona,
        path: "ongbona",
        name: "Ongbona",
        imageUrl: "https://placehold.co/56x56",
        location: "Mayfair",
        deliveryTime: "20-35 mins",
        deliveryFee: 450,
        description: "Classic Nigerian fast food chain.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.mamaPut,
        path: "mama-put",
        name: "Mama Put",
        imageUrl: "https://placehold.co/56x56",
        location: "Fagbale",
        deliveryTime: "25-40 mins",
        deliveryFee: 500,
        description: "Authentic Nigerian bukka experience.",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: VENDOR_IDS.ivoryBite,
        path: "ivory-bite",
        name: "Ivory Bite",
        imageUrl: "https://placehold.co/56x56",
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