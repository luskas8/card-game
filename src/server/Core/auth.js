import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: "No token provided." });
  }

  const parts = auth.split(" ");
  if (parts.length !== 2) {
    return res
      .status(401)
      .json({ message: "Invalid token: Unknown token format." });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res
      .status(401)
      .json({ message: "Invalid token: No 'Bearer' provided." });
  }

  if (!token) {
    return res.status(401).json({ message: "Invalid token." });
  }
  return next();
};
