import { getAllCourses } from "../controllers/coursesController.js";
import { Router } from "express";

const router = Router();

router.get("/cursos", getAllCourses);

export default router;