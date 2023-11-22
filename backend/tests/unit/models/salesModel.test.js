const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock } = require('../mocks/salesMock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Busca por todos os produtos na database', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const products = await salesModel.getAllSales();

    expect(products).to.be.an('array');
    expect(products).to.have.length(3);
  });

  afterEach(function () {
    sinon.restore();
  });
});