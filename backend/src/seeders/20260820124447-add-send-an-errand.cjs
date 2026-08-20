'use strict';

const SEND_AN_ERRAND_ID = 'c1d2e3f4-a5b6-7890-abcd-ef1234567907';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: SEND_AN_ERRAND_ID,
        name: 'Send an Errand',
        icon: '📦',
        slug: 'send-an-errand',
        color: 'bg-red-300',
        textColor: 'text-violet-500',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', {
      id: SEND_AN_ERRAND_ID,
    });
  },
};