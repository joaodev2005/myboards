import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });


  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nome: 'Juca',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Cadastra registro 2', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nome: 'Juca',
        sobrenome: 'Silva',
        email: 'juca2@gmail.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Tenta criar registro com email duplicado', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nome: 'Juca',
        sobrenome: 'Silva',
        email: 'jucaduplicado@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'jucaduplicado@gmail.com',
        nome: 'duplicado',
        sobrenome: 'duplicado',
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Tenta criar registro com nome muito curto', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nome: 'Ju',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
  it('Tenta criar registro sem nome', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
    it('Tenta criar registro com sobrenome muito curto', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nome: 'Juca',
        sobrenome: 'S',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.sobrenome');
  });
  it('Tenta criar registro sem sobrenome', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca@gmail.com',
        nome: 'Juca',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.sobrenome');
  });
  it('Tenta criar registro sem email', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        nome: 'Juca',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar registro com email inválido', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId,
        email: 'juca gmail.com',
        nome: 'Juca',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar registro sem cidadeId', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        email: 'juca@gmail.com',
        nome: 'Juca',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Tenta criar registro com cidadeId inválido', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .send({
        cidadeId: 'teste',
        email: 'juca@gmail.com',
        nome: 'Juca',
        sobrenome: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
  });
  it('Tenta criar registro sem enviar nenhuma propriedade', async () => {

    const res1 = await testServer
      .post('/pessoas')
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cidadeId');
    expect(res1.body).toHaveProperty('errors.body.nomeCompleto');
  });
});