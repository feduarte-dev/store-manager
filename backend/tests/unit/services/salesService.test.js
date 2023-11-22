const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock } = require('../mocks/salesMock');

describe('Realizando testes - SALES SERVICE:', function () {
  it('Busca por todos as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock);

    const responseService = await salesService.getAllSales();
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(salesMock);
  });

  it('Busca por uma venda específica', async function () {
    sinon.stub(salesModel, 'getSaleByID').resolves(salesMock[2]);

    const responseService = await salesService.getSaleByID(2);
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(salesMock[2]);
  });
  
  it('Falha em buscar por uma venda específica', async function () {
    sinon.stub(salesModel, 'getSaleByID').resolves([]);
    
    const responseService = await salesService.getSaleByID(10);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Deleta uma venda específica com sucesso', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves([{ affectedRows: 1 }]);  
    const responseService = await salesService.deleteSale(2);
    expect(responseService.status).to.equal(204);
  });

  it('Falha em deletar uma venda específica', async function () {
    sinon.stub(salesModel, 'deleteSale').resolves(undefined);  
    const responseService = await salesService.deleteSale(10);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
