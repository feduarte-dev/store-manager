const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { getAllProductsMock, productsMock, getProductByIDSuccess,
  getProductByIDFailed, insertProductSuccess,
  insertProduct, updateProductSuccess, updatedProducted } = require('../mocks/productsMocks');

const validateProductName = require('../../../src/middlewares/validateProductName');

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

  it('Insere um produto com sucesso', async function () {
    sinon.stub(productsService, 'createProduct').resolves(insertProductSuccess);
    const req = {
      body: {
        name: 'Arco do Gavião Arqueiro',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();
    validateProductName(req, res, next); 
    expect(next).to.have.been.calledWith();

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertProduct);
  });

  it('Falha em inserir um produto', async function () {
    sinon.stub(productsService, 'createProduct').resolves([]);
    const req = {
      body: {
        name: 'Ar',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();
    validateProductName(req, res, next); 

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  
  it('Atualiza um produto com sucesso', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(updateProductSuccess);
    const req = {
      params: { productID: 1 },
      body: {
        name: 'Martelo do Batman',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub().returns();
    validateProductName(req, res, next); 
    expect(next).to.have.been.calledWith();

    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(updatedProducted);
  });

  it('Falha em atualizar um produto', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(getProductByIDFailed);
    const req = {
      params: { productID: 10 },
      body: {
        name: 'Martelo do Batman',
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deleta um produto específico', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({ status: 204 });
    const req = {
      params: { productID: 3 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Falha em deletar um produto específico', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves(getProductByIDFailed);
    const req = {
      params: { productID: 10 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});