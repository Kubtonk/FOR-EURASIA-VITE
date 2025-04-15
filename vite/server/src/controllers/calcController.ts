import { Request, Response } from "express";
import { calculate } from "../utils/calculator";

export const calculatePrice = (req: Request, res: Response): void => {
  const { modifications } = req.body;


  if (!Array.isArray(modifications)) {
    res.status(400).json({ error: "modifications must be an array" });
    return;
  }

  const result = calculate(modifications);
  res.json(result);
};
