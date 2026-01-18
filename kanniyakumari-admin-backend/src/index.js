import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminProblemsRoutes from "./routes/adminProblems.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/admin", adminProblemsRoutes);

/* HEALTH */
app.get("/", (req, res) => {
  res.json({ status: "Admin backend running ✅" });
});

/* START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Admin backend running on port ${PORT}`);
});
