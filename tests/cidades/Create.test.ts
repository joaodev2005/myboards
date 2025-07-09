import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {

  it('Cria registro', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: "Cidade Teste" });


    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('não permite criar uma cidade com nome menor que 3 caracteres', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({ nome: "Ci" });


    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
  });
});