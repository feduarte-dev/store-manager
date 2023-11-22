const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMock } = require('../mocks/productsMocks');

const inputData = { name: 'Martelo do Batman' };

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
    
    const responseService = await productsService.createProduct(inputData);
    expect(responseService.status).to.equal(201);
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Atualiza um produto específico com sucesso', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves([{ affectedRows: 1 }]);
    const responseData = { id: 1, name: 'Martelo do Batman' };
    sinon.stub(productsModel, 'getProductByID').resolves(responseData);
  
    const responseService = await productsService.updateProduct(inputData, 1);
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Falha em atualizar um produto específico', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(undefined);
    sinon.stub(productsModel, 'getProductByID').resolves(undefined);
    
    const responseService = await productsService.updateProduct(inputData, 10);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Deleta um produto específico com sucesso', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves([{ affectedRows: 1 }]);  
    const responseService = await productsService.deleteProduct(1);
    expect(responseService.status).to.equal(204);
  });

  it('Falha em deletar um produto específico', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves(undefined);  
    const responseService = await productsService.deleteProduct(10);
    expect(responseService.status).to.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Busca por um produto utilizando query q=?', async function () {
    sinon.stub(productsModel, 'searchProducts').resolves(productsMock[0]);

    const responseService = await productsService.searchProducts('Martelo');
    expect(responseService.status).to.equal(200);
    expect(responseService.data).to.deep.equal(productsMock[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
