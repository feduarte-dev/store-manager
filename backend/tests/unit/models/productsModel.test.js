const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsMock } = require('../mocks/productsMocks');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Testa o banco de dados em buscar por todos produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const products = await productsModel.getAllProducts();
    expect(products).to.be.an('array');
    expect(products).to.have.length(3);
  });

  it('Testa o banco de dados em buscar por um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // console.log('PRODUCT MOCK', [productsMock]);
    const product = await productsModel.getProductByID(1);
    // console.log('PRODUCT: ', product);
    expect(product).to.be.an('object');
    expect(product).to.have.property('id');
    expect(product).to.have.property('name');
  });

  it('Testa o banco de dados em inserir um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const inputData = { name: 'Martelo do Batman' };
    const result = await productsModel.createProduct(inputData);
    expect(result).to.be.equal(1);
  });

  it('Testa o banco de dados em atualizar um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const inputData = { name: 'Martelo do Batman' };
    const result = await productsModel.updateProduct(inputData, 3);
    expect(result).to.be.equal(1);
  });

  it('Testa o banco de dados em deletar um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await productsModel.deleteProduct(3);
    expect(result).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});