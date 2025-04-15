import { Router } from "express";
import { calculatePrice } from "../controllers/calcController";

const router = Router();

router.post("/calculate", calculatePrice);

export default router;
