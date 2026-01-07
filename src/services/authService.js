const AuthRepository = require('../repositories/authRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign({id: user.id, role: user.role},process.env.JWT_SECRET,{ expiresIn: "4h"} );
};

const register = async ({name, email, password, role = "MEMBER"}) => {
  if (!name || !email || !password ) {throw new Error("Tous les champs sont requis");};

  const existing = await AuthRepository.findByEmail(email);
  if (existing) throw new Error("Email déjà utilisé");
  
  const hashed = await bcrypt.hash(password, 10);

  const user = await AuthRepository.createUser({name, email, password:hashed, role});
  return { message: "Utilisateur créé",user };
};

const login = async ({ email, password }) => {
  const user = await AuthRepository.findByEmail(email);
  if (!user) throw new Error("Utilisateur introuvable");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Mot de passe incorrect");

  const token = generateAccessToken(user);
  return { 
    message:"Connexion réussie",token, user: { id: user.id,name: user.name, email: user.email,role: user.role }
  }; 
};

module.exports = { register,login };