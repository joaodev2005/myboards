import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {

  it('Atualiza um registro existente', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ name: 'Cidade Teste' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resAtualizada = await testServer
      .put(`/cidades/${res1.body}`)
      .send({ name: 'Cidade Teste Atualizada' });
    
    expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Atualiza um registro não existente', async () => {

    const res1 = await testServer
      .put('/cidades/99999')
      .send({ name: 'Cidade Teste' });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
})