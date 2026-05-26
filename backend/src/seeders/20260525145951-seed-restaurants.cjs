'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Restaurants",
      [
        {
          name: "Indeego Restaurant",
          image: "/images/indeego.webp",
          location: "Fagbale",
          deliveryTime: "20-30 mins",
          deliveryFee: 500,
          description: "Popular Nigerian restaurant serving authentic local dishes.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Iya Ruka",
          image: "https://placehold.co/56x56",
          location: "Obande",
          deliveryTime: "15-25 mins",
          deliveryFee: 400,
          description: "Nigeria's favourite chicken chain.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
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
          name: "Ongbona",
          image: "https://placehold.co/56x56",
          location: "Energy",
          deliveryTime: "15-25 mins",
          deliveryFee: 400,
          description: "Fresh subs made your way.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Mr Bigg's",
          image: "https://placehold.co/56x56",
          location: "VI",
          deliveryTime: "20-30 mins",
          deliveryFee: 400,
          description: "Nigeria's iconic fast food brand.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Tantalizers",
          image: "https://placehold.co/56x56",
          location: "Lekki",
          deliveryTime: "20-35 mins",
          deliveryFee: 450,
          description: "Nigerian fast food with local flavours.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};