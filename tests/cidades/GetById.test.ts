import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

  it('Busca um registro por id', async () => {

    const res1 = await testServer
      .post('/cidades/1')
      .send({ nome: 'Cidade Teste' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/cidades/${res1.body}`)
      .send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('name');
  });
  it('Tenta buscar um registro por id inexistente', async () => {

    const res1 = await testServer
      .get('/cidades/999999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
})