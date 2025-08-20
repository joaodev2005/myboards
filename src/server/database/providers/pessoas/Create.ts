import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error("Cidade not found");
    }

    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }
    return new Error("Unexpected result format");
  } catch (error) {
    console.error("Error creating pessoa:", error);
    return new Error("Failed to create pessoa");
  }
};