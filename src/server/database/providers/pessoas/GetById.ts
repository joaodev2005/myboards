import {  ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";


export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Not implemented');
  } catch (error) {
    console.error('Error fetching pessoa by id:', error);
    return new Error('Database error');
  }
};