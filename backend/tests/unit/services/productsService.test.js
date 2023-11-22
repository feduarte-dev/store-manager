const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock } = require('../mocks/productsMocks');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Busca por todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMock);

    const responseService = await productsService.getAllProducts();
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(productsMock);
  });

  it('Busca por um produto específico', async function () {
    sinon.stub(productsModel, 'getProductByID').resolves(productsMock[0]);

    const responseService = await productsService.getProductByID(1);
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(productsMock[0]);
  });
  
  it('Falha em buscar por um produto específico', async function () {
    sinon.stub(productsModel, 'getProductByID').resolves(undefined);
    
    const responseService = await productsService.getProductByID(10);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Insere um produto específico com sucesso', async function () {
    sinon.stub(productsModel, 'createProduct').resolves([{ insertId: 4 }]);
    const responseData = { id: 4, name: 'Escudo do Capitão América' };
    sinon.stub(productsModel, 'getProductByID').resolves(responseData);
    const inputData = { name: 'Martelo do Batman' };
    
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.equal(201);
    expect(responseService.data).to.deep.equal(responseData);
  });

  afterEach(function () {
    sinon.restore();
  });
});
