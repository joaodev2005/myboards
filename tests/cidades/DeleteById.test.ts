import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {

  it('Deleta um registro existente', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: 'Cidade Teste' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resApagada = await testServer
      .delete(`/cidades/${res1.body}`)

    expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta deletar um registro que não existe', async () => {

    const res1 = await testServer
      .delete('/cidades/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  })
});
