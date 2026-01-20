import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminProblems from "./routes/admin.problems.routes.js";
import adminBusinesses from "./routes/admin.business.routes.js";
import adminHospitals from "./routes/admin.hospitals.routes.js";
import adminSchools from "./routes/admin.schools.routes.js";
import adminTourist from "./routes/admin.tourist.routes.js";

dotenv.config();

const app = express();

// CORS configuration to allow Vercel frontend
const corsOptions = {
  origin: [
    "https://kanniyakumarione-admin.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Admin backend running ✅" });
});

app.use("/api/admin/problems", adminProblems);
app.use("/api/admin/businesses", adminBusinesses);
app.use("/api/admin/hospitals", adminHospitals);
app.use("/api/admin/schools", adminSchools);
app.use("/api/admin/tourist", adminTourist);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Admin backend running on port ${PORT}`)
);
