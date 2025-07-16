import { Knex } from 'knex';

import { development, production, test } from './Environment';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return production;
    case 'test': return test;
    default: return development;
  }
}

// export const Knex = Knex(getEnvironment());
export const knex: Knex.Config = getEnvironment();