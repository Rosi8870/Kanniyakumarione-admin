import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { db } from "../firebase/config.js";

const router = express.Router();

/* GET ALL PROBLEMS WITH OPTIONAL STATUS FILTER */
router.get("/", adminAuth, async (req, res) => {
  const { status } = req.query;
  let query = db.collection("problems");
  
  if (status) {
    query = query.where("status", "==", status);
  }
  
  const snap = await query.orderBy("createdAt", "desc").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

/* APPROVE */
router.patch("/:id/approve", adminAuth, async (req, res) => {
  await db.collection("problems").doc(req.params.id)
    .update({ status: "approved" });
  res.json({ success: true });
});

/* REJECT */
router.patch("/:id/reject", adminAuth, async (req, res) => {
  await db.collection("problems").doc(req.params.id)
    .update({ status: "rejected" });
  res.json({ success: true });
});

/* DELETE */
router.delete("/:id", adminAuth, async (req, res) => {
  await db.collection("problems").doc(req.params.id).delete();
  res.json({ success: true });
});

export default router;
