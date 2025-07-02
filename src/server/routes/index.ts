import {  Router } from "express";
import { CidadesController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("opa calabreso");
});

router.post("/cidades", CidadesController.create);

export { router };