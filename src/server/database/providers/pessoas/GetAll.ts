// import { ETableNames } from '../../ETableNames';
// import { IPessoa } from '../../models';
// import { Knex } from '../../knex';


// export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
//   try {
//     const result = await Knex(ETableNames.pessoa)
//       .select('*')
//       .where('nomeCompleto', 'like', `%${filter}%`)
//       .offset((page - 1) * limit)
//       .limit(limit);

//     return result;
//   } catch (error) {
//     console.log(error);
//     return new Error('Erro ao consultar os registros');
//   }
// };


import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa)
      .whereRaw('LOWER(nome) LIKE ?', [`%${filter.toLowerCase()}%`])
      .orWhereRaw('LOWER(sobrenome) LIKE ?', [`%${filter.toLowerCase()}%`])
      .offset((page - 1) * limit)
      .limit(limit)
      .select('*');

    return result;
  } catch (error) {
    console.log('Error counting pessoas:', error);
    return new Error('Erro ao consultar os registros');
  }
};




