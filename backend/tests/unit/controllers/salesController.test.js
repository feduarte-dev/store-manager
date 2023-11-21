const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { getAllSalesMock, salesMock, getSaleByIDSuccess, getSaleByIDFailed } = require('../mocks/salesMock');

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Busca por todos as vendas', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(getAllSalesMock);
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock);
  });

  it('Busca por uma venda específica', async function () {
    sinon.stub(salesService, 'getSaleByID').resolves(getSaleByIDSuccess);
    const req = {
      params: { saleId: 2 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleByID(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSaleByIDSuccess.data);
  });

  it('Falha em buscar por um produto específico', async function () {
    sinon.stub(salesService, 'getSaleByID').resolves(getSaleByIDFailed);
    const req = {
      params: { saleId: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleByID(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});