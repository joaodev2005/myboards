import { ICidade } from '../../models/Cidade';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {

  try {
    const [result] = await Knex(ETableNames.cidade).insert(cidade).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Not implemented');
  } catch (error) {

    console.log(error);
    return new Error('Not implemented');
  }
}