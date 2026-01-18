export default function adminAuth(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (!key) {
    return res.status(401).json({ error: "Admin key missing" });
  }

  if (key !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Invalid admin key" });
  }

  next();
}
