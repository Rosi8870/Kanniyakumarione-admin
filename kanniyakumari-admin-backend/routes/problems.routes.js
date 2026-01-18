import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  getAllProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../controllers/problems.controller.js";

const router = express.Router();

router.use(adminAuth);

router.get("/", getAllProblems);
router.patch("/:id/approve", approveProblem);
router.patch("/:id/reject", rejectProblem);
router.delete("/:id", deleteProblem);

export default router;
