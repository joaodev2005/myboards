import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where('id', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Not implemented');
  } catch (error) {

    console.log(error);
    return new Error('Not implemented');
  }
}