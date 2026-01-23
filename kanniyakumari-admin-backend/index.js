import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminProblems from "./routes/admin.problems.routes.js";
import adminBusinesses from "./routes/admin.business.routes.js";
import adminHospitals from "./routes/admin.hospitals.routes.js";
import adminSchools from "./routes/admin.schools.routes.js";
import adminTourist from "./routes/admin.tourist.routes.js";
import supportMessages from "./routes/supportMessages.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Admin backend running ✅" });
});

app.use("/api/admin/problems", adminProblems);
app.use("/api/admin/businesses", adminBusinesses);
app.use("/api/admin/hospitals", adminHospitals);
app.use("/api/admin/schools", adminSchools);
app.use("/api/admin/tourist", adminTourist);
app.use("/api/admin/support-messages", supportMessages);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Admin backend running on port ${PORT}`)
);
