const app = require('./app');

const PORT = process.env.PORT || 3001;

// Falta fazer testes unitarios da camada model, requisito 1 passou apenas com testes da controller/service

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
