const salesMock = [
  {
    saleId: 1,
    date: '2023-11-21T22:17:21.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-11-21T22:17:21.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-11-21T22:17:21.000Z',
    productId: 3,
    quantity: 15,
  },
];
  
const getAllSalesMock = {
  status: 200,
  data: salesMock,
};
  
const getSaleByIDSuccess = {
  status: 200,
  data: salesMock[2],
};
  
const getSaleByIDFailed = {
  status: 404,
  data: { message: 'Sale not found' },
};

const insertSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const insertSaleSuccess = {
  status: 201,
  data: insertSale,
};

const salesMockFromDB = [
  {
    date: '2023-11-21T22:17:21.000Z',
    productId: 3,
    quantity: 15,
  },
];
  
module.exports = {
  salesMock,
  getAllSalesMock,
  getSaleByIDSuccess,
  getSaleByIDFailed,
  insertSale,
  insertSaleSuccess,
  salesMockFromDB,
};