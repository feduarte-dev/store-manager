const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsMock } = require('../mocks/productsMocks');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Busca por todos os produtos na database', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const products = await productsModel.getAllProducts();

    expect(products).to.be.an('array');
    expect(products).to.have.length(3);
  });

  it('Busca por um produto específico na database', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const product = await productsModel.getProductByID(1);
    expect(product).to.be.an('object');
    expect(product).to.have.property('id');
    expect(product).to.have.property('name');
  });

  afterEach(function () {
    sinon.restore();
  });
});