import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", adminAuth, async (req, res) => {
  const snap = await db.collection("schools").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
});

router.post("/", adminAuth, async (req, res) => {
  await db.collection("schools").add(req.body);
  res.json({ success: true });
});

router.delete("/:id", adminAuth, async (req, res) => {
  await db.collection("schools").doc(req.params.id).delete();
  res.json({ success: true });
});

export default router;
