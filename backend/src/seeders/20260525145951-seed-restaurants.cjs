'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Restaurants",
      [
        {
          id: uuidv4(),
          path: "indeego-restaurant",
          name: "Indeego Restaurant",
          image: "/images/restaurants/Indeego.webp",
          location: "Fagbale",
          deliveryTime: "20-30 mins",
          deliveryFee: 500,
          description: "Popular Nigerian restaurant serving authentic local dishes.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "iya-ruka",
          name: "Iya Ruka",
          image: "/images/restaurants/Iya_ruka.jpg",
          location: "Obande",
          deliveryTime: "15-25 mins",
          deliveryFee: 400,
          description: "Nigeria's favourite chicken chain.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "oni-tower",
          name: "Oni Tower",
          image: "/images/restaurants/Oni_tower.jpg",
          location: "Mayfair",
          deliveryTime: "20-35 mins",
          deliveryFee: 450,
          description: "Classic Nigerian fast food chain.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "ongbona",
          name: "Ongbona",
          image: "/images/restaurants/Ongbona.jpg",
          location: "Mayfair",
          deliveryTime: "20-35 mins",
          deliveryFee: 450,
          description: "Classic Nigerian fast food chain.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "oni-tower-2",
          name: "Oni Tower",
          image: "https://placehold.co/56x56",
          location: "Mayfair",
          deliveryTime: "20-35 mins",
          deliveryFee: 450,
          description: "Classic Nigerian fast food chain.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "mama-put",
          name: "Mama Put",
          image: "https://placehold.co/56x56",
          location: "Fagbale",
          deliveryTime: "25-40 mins",
          deliveryFee: 500,
          description: "Authentic Nigerian bukka experience.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "ivory-bite",
          name: "Ivory Bite",
          image: "https://placehold.co/56x56",
          location: "Ibadan Road",
          deliveryTime: "15-25 mins",
          deliveryFee: 400,
          description: "Finger licking fast food experience.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "sharon",
          name: "Sharon",
          image: "https://placehold.co/56x56",
          location: "Damico",
          deliveryTime: "20-35 mins",
          deliveryFee: 600,
          description: "Fresh hot pizza delivered fast.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "captain-cook",
          name: "Captain Cook",
          image: "https://placehold.co/56x56",
          location: "Mayfair",
          deliveryTime: "25-40 mins",
          deliveryFee: 600,
          description: "Pan pizza done right.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: uuidv4(),
          path: "ongbona-energy",
          name: "Ongbona",
          image: "https://placehold.co/56x56",
          location: "Energy",
          deliveryTime: "15-25 mins",
          deliveryFee: 400,
          description: "Fresh subs made your way.",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};