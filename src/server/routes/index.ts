import {  Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  res.send("opa calabreso");
});

router.post("/teste", (req, res) => {
  // console.log(req.body);

  res.status(StatusCodes.OK).json({ message: "Teste received", data: req.body });
});

export { router };