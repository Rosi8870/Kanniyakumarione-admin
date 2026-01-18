import express from "express";
import adminAuth from "../middleware/adminAuth.js";

import {
  getAllProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../controllers/adminProblems.controller.js";

const router = express.Router();

/* ADMIN ROUTES */
router.get("/problems", adminAuth, getAllProblems);
router.patch("/problems/:id/approve", adminAuth, approveProblem);
router.patch("/problems/:id/reject", adminAuth, rejectProblem);
router.delete("/problems/:id", adminAuth, deleteProblem);

export default router;
