import {  ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";


export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .where('id', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Not implemented');
  } catch (error) {
    console.error('Error deleting pessoa by id:', error);
    return new Error('Database error');
  }
}