import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.pessoa, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().index();
    table.string('sobrenome').notNullable().index();
    table.string('email').notNullable().unique();

    table.bigInteger('cidadeId').index().notNullable()
      .references('id').inTable(ETableNames.cidade)
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    table.comment('Tabela que armazena as pessoas cadastradas no sistema');
  })
  .then(() => {
    console.log('# Create Table: ' + ETableNames.pessoa);
  });
}


export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pessoa)
  .then(() => {
    console.log('# Drop Table: ' + ETableNames.pessoa);
  });
}