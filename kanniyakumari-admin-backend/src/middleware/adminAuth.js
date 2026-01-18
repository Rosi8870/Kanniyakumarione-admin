export default function adminAuth(req, res, next) {
  const email = req.headers["x-admin-email"];

  if (!email || email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({
      error: "Unauthorized admin access",
    });
  }

  next();
}
