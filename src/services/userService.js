// const UserRepository = require('../repositories/userRepository');

// const getAllUsers = async () => {
//   const users = await UserRepository.findAll();
//   return { message: 'Liste des utilisateurs', data: users };
// };

// const createUser = async ({ name, email, password, role = 'MEMBER' }) => {
//   if (!name || !email) throw new Error("Nom et email requis");
//   const user = await UserRepository.create({ name, email, password, role });
//   return { message: "Utilisateur créé",user };
// };

// module.exports = { getAllUsers,createUser }