const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock, salesMockFromDB } = require('../mocks/salesMock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Testa o banco de dados em buscar por todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const products = await salesModel.getAllSales();
    expect(products).to.be.an('array');
    expect(products).to.have.length(3);
  });

  it('Testa o banco de dados em buscar por uma venda específica', async function () {
    sinon.stub(connection, 'execute').resolves([salesMockFromDB]);
    const products = await salesModel.getSaleByID(2);
    expect(products).to.be.an('array');
    expect(products).to.have.length(1);
  });

  it('Testa o banco de dados em inserir uma venda específica', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const products = await salesModel.createSale(inputData);
    expect(products).to.be.equal(1);
  });

  it('Testa o banco de dados em deletar uma venda específica', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const result = await salesModel.deleteSale(3);
    expect(result).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});