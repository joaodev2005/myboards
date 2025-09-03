import {  ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const filterLower = `%${filter.toLowerCase()}%`;

    const [{ count }] = await Knex(ETableNames.pessoa)
      .whereRaw('LOWER(nome) LIKE ?', [filterLower])
      .orWhereRaw('LOWER(sobrenome) LIKE ?', [filterLower])
      .count<[{ count: number }]>({ count: 'id' });

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Count is not an integer');
  } catch (error) {
    console.error('Error counting pessoas:', error);
    return new Error('Error counting pessoas');
  }
};