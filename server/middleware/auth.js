import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); // Get the JWT token from the Authorization header of the incoming request.

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.splice(7, token.length).trimLeft(); // JWT tokens typically start with the string "Bearer " then the token itself.
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // Calls the next middleware function in the chain.

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyToken;
