import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";

export const CidadesController = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
};