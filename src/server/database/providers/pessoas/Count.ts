import {  ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.pessoa)
      .where('LOWER(nome) LIKE ?', [`%${filter.toLowerCase()}%`])
      .count<[{ count: number }]>('id as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Count is not an integer');
  } catch (error) {
    console.error('Error counting pessoas:', error);
    return new Error('Error counting pessoas');
  }
};