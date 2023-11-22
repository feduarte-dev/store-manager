// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const app = require('../../src/app');
// const { productsController } = require('../../src/controllers');
// const { productsMock } = require('../unit/mocks/productsMocks');

// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Usando o método GET em /chocolates/total', function () {
//   afterEach(function () {
//     sinon.restore();
//   });

//   it('Retorna a quantidade total de chocolates', async function () {
//     sinon.stub(productsController, 'getAllProducts').resolves(productsMock);

//     const response = await chai.request(app)
//       .get('/products');
//     console.log(response);

//     expect(response.status).to.be.equal(200);
//     expect(response.body).to.have.length(3);
//   });
// });