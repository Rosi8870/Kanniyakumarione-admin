import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Admin backend running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Admin backend running on port", PORT);
});
