const express = require('express');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();
app.use(express.json());

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);
// em post / sales, fiz um try catch na model onde qqr erro retorna undefined e se retornar undefined da como product not found, porem outros erros retornariam essa mesma mensagem. fiz isso por que nao sei acessar a db pelo middleware

// no teste unitario da model de products, ao testar a busca de um produto na db, meu mock eh um array de objetos mas a variavel product eh apenas o primeiro item. o teste passa mas o mock nao deveria ser apenas o primeiro item tbm?

// ao atualizar um produto, eu retorno da db o affected rows e digo que se for 1 deu certo e se for 0 o produto nao foi encontrado, porem pode retornar 0 sendo outro erro alem do produto nao encontrado

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
