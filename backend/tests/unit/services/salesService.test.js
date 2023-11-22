const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock } = require('../mocks/salesMock');
const { productsMock } = require('../mocks/productsMocks');

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

  it('Insere uma venda específica com sucesso', async function () {
    sinon.stub(salesModel, 'createSale').resolves(4);
    sinon.stub(salesModel, 'insertDate').resolves([{ insertId: 4 }]);
    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
    ];
    const responseData = { id: 4, itemsSold: inputData };
    const responseService = await salesService.createSale(inputData);
    expect(responseService.status).to.equal(201);
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Falha em inserir uma venda', async function () {
    sinon.stub(salesModel, 'createSale').resolves(undefined);
    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
    ];
    const responseService = await salesService.createSale(inputData);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Atualiza a quantidade de um produto específico com sucesso', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 1 }]);
    sinon.stub(productsModel, 'getProductByID').resolves(productsMock[0]);
    sinon.stub(salesModel, 'getSaleByID').resolves([salesMock[0]]);
    const responseData = {
      saleId: 1,
      date: '2023-11-21T22:17:21.000Z',
      productId: 1,
      quantity: 5,
    };
  
    const responseService = await salesService.updateQuantity(1, 1, 3);
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Falha em atualizar a quantidade de um produto', async function () {
    sinon.stub(salesModel, 'updateQuantity').resolves([{ affectedRows: 0 }]);
    sinon.stub(productsModel, 'getProductByID').resolves(undefined);
    sinon.stub(salesModel, 'getSaleByID').resolves([salesMock[0]]);
 
    const responseService = await salesService.updateQuantity(1, 10, 3);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found in sale' });
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
