import { db } from "../firebase/admin.js";

/* ===============================
   GET ALL PROBLEMS (ADMIN)
   =============================== */
export const getAllProblems = async (req, res) => {
  try {
    const snap = await db.collection("problems").orderBy("createdAt", "desc").get();

    const problems = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load problems" });
  }
};

/* ===============================
   APPROVE PROBLEM
   =============================== */
export const approveProblem = async (req, res) => {
  try {
    await db.collection("problems").doc(req.params.id).update({
      status: "approved",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
};

/* ===============================
   REJECT PROBLEM
   =============================== */
export const rejectProblem = async (req, res) => {
  try {
    await db.collection("problems").doc(req.params.id).update({
      status: "rejected",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Rejection failed" });
  }
};

/* ===============================
   DELETE PROBLEM
   =============================== */
export const deleteProblem = async (req, res) => {
  try {
    await db.collection("problems").doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
