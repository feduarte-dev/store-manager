const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { getAllProductsMock, productsMock, getProductByIDSuccess, getProductByIDFailed } = require('../mocks/productsMocks');

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Busca por todos os produtos', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsMock);
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('Busca por um produto específico', async function () {
    sinon.stub(productsService, 'getProductByID').resolves(getProductByIDSuccess);
    const req = {
      params: { productID: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByID(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock[0]);
  });

  it('Falha em buscar por um produto específico', async function () {
    sinon.stub(productsService, 'getProductByID').resolves(getProductByIDFailed);
    const req = {
      params: { productID: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductByID(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});