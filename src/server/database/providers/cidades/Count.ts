import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter = ''): Promise<number | Error> => {
  try {
    const [{count}] = await Knex(ETableNames.cidade)
      .where('nome', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Not implemented');
  } catch (error) {

    console.log(error);
    return new Error('Not implemented');
  }
}