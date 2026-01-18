import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminProblems from "./routes/problems.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin/problems", adminProblems);

app.get("/", (req, res) => {
  res.json({ status: "Admin backend running ✅" });
});

app.listen(process.env.PORT || 5001);
