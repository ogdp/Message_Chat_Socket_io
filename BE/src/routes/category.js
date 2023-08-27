import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/category.js";
import checkPermission from "../middlewares/checkPermission.js";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", get);
router.post("/categories", checkPermission, create);
router.patch("/categories/:id", checkPermission, update);
router.delete("/categories/:id", checkPermission, remove);

export default router;
