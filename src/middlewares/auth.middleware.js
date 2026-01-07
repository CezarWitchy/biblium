const jwt = require('jsonwebtoken');

// Middleware d'authentification pour protéger les routes
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token manquant" });
  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  };

};

module.exports = authMiddleware;

// pou m te ka teste sak api documan pat vle reponn.
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   console.log("AUTH HEADER =", req.headers.authorization);
//   console.log("JWT_SECRET =", process.env.JWT_SECRET);

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "Token manquant" });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT ERROR =", error.message);
//     return res.status(401).json({ error: "Token invalide" });
//   }
// };

// module.exports = authMiddleware;