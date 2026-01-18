import { db } from "../firebase/config.js";

export const getAllProblems = async (req, res) => {
  const snap = await db.collection("problems").get();
  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
};

export const approveProblem = async (req, res) => {
  await db.collection("problems").doc(req.params.id)
    .update({ status: "approved" });
  res.json({ success: true });
};

export const rejectProblem = async (req, res) => {
  await db.collection("problems").doc(req.params.id)
    .update({ status: "rejected" });
  res.json({ success: true });
};

export const deleteProblem = async (req, res) => {
  await db.collection("problems").doc(req.params.id).delete();
  res.json({ success: true });
};
