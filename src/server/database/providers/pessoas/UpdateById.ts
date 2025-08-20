import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const updateById = async ( id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error("Cidade not found");
    }

    const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where('id', '=', id)

    if (result > 0) return;

    return new Error("Unexpected result format");
  } catch (error) {
    console.error("Error creating pessoa:", error);
    return new Error("Failed to create pessoa");
  }
};