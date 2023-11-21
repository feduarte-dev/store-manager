const productsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const getAllProductsMock = {
  status: 200,
  data: productsMock,
};

const getProductByIDSuccess = {
  status: 200,
  data: productsMock[0],
};

const getProductByIDFailed = {
  status: 404,
  data: { message: 'Product not found' },
};

module.exports = {
  productsMock,
  getAllProductsMock,
  getProductByIDSuccess,
  getProductByIDFailed,
};