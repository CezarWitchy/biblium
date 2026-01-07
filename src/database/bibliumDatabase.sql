-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 24 déc. 2025 à 15:56
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30
-- author : Witchy CEZAR

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bibliumdatabase`
--

CREATE database bibliumdatabase;
use bibliumdatabase;
-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`id`, `title`, `description`, `author`, `isbn`, `category`, `created_at`) VALUES
(2, 'Clean Architecture', 'livre infomatique', 'Robert C. Martin', '9780134494166', 'BOOK', '2025-12-18 16:47:26');

-- --------------------------------------------------------

--
-- Structure de la table `exemplaires`
--

CREATE TABLE `exemplaires` (
  `id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `code_barre` varchar(100) NOT NULL,
  `status` enum('DISPONIBLE','EMPRUNTE','PERDU') DEFAULT 'DISPONIBLE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exemplaires`
--

INSERT INTO `exemplaires` (`id`, `document_id`, `code_barre`, `status`, `created_at`) VALUES
(1, 2, 'EX-0001', 'DISPONIBLE', '2025-12-18 16:59:12'),
(2, 2, 'EX-0002', 'DISPONIBLE', '2025-12-18 17:02:40');

-- --------------------------------------------------------

--
-- Structure de la table `fines`
--

CREATE TABLE `fines` (
  `id` int(11) NOT NULL,
  `loan_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `days_late` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fines`
--

INSERT INTO `fines` (`id`, `loan_id`, `amount`, `days_late`, `created_at`) VALUES
(1, 7, 1376.00, 344, '2025-12-19 18:29:59');

-- --------------------------------------------------------

--
-- Structure de la table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exemplaire_id` int(11) NOT NULL,
  `date_emprunt` date NOT NULL,
  `date_retour_prevue` date NOT NULL,
  `date_retour_effective` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `loans`
--

INSERT INTO `loans` (`id`, `user_id`, `exemplaire_id`, `date_emprunt`, `date_retour_prevue`, `date_retour_effective`, `created_at`) VALUES
(4, 22, 1, '2025-12-18', '2025-12-23', '2025-12-30', '2025-12-18 18:33:12'),
(7, 22, 2, '2025-12-19', '2025-01-10', '2025-12-19', '2025-12-19 18:15:19');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `status` enum('ACTIVE','FULFILLED','CANCELLED') DEFAULT 'ACTIVE',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `document_id`, `status`, `created_at`) VALUES
(1, 22, 2, 'FULFILLED', '2025-12-19 19:14:30'),
(6, 22, 2, 'ACTIVE', '2025-12-19 19:27:58');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'MEMBER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(5, 'Admin6', 'admin@test3.com', '$2b$10$/xNabATgMSPfFY478j.4o.58Z1CE4IVJs0SfBrHTW2wXBkwOUHq2.', 'ADMIN', '2025-12-12 18:56:02'),
(7, 'oscar', 'oscartest@gamil.com', '$2b$10$F4BcWI40Xrpycx27Ay2uQOaiQRjpI3PArLT5BFm5HJJCIKYBrKkoa', 'ADMIN', '2025-12-12 19:06:07'),
(9, 'youdi1', 'youdi@test1.com', '$2b$10$LeGfXPfz93w.lZPu2Po2K.LN9gp7lSZnU1SUlayfDOkaS8EMuBF0e', 'admin', '2025-12-13 17:44:55'),
(18, 'suprAdmin_y', 'test90@gmail1235.com', '$2b$10$y/2E9HJbLNWp3XP4m1huQuUIOQWfBsBViVhkTSCf3xKYAuThudDaS', 'admin', '2025-12-13 20:55:03'),
(19, 'suprAdmin_yi', 'test90@gmail12357.com', '$2b$10$XNWeeqQ34BdMyd7Nja21o.qihiCKyJGO4Ud/ebPLFp9Yic8Bthj9y', 'admin', '2025-12-15 16:50:37'),
(20, 'SUPR_admin_1', 'TesteAmin@mail.com', '$2b$10$qq8M/jG8Iw84.I2mvyRTqusZk7ETI3UbdnY1GaLdnh2fRo5CPr0wq', 'Admin', '2025-12-15 16:57:33'),
(22, 'Admin', 'admin@test0.com', '$2b$10$/FN8tlRm0gw/fd6CkLXP/.bbyL4RYpAtQM9tuX0Ogit3LaEzyVgm6', 'ADMIN', '2025-12-17 20:47:25'),
(23, 'users_premium', 'userpre@gmailcom', '$2b$10$1axyJv4m94MvtLKlHLY2RuvtYVJwPxEfJMhP.cLrUNWqmRR/hz7NO', 'userpremium', '2025-12-18 11:47:49');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Index pour la table `exemplaires`
--
ALTER TABLE `exemplaires`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_barre` (`code_barre`),
  ADD KEY `fk_exemplaire_document` (`document_id`);

--
-- Index pour la table `fines`
--
ALTER TABLE `fines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fine_loan` (`loan_id`);

--
-- Index pour la table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_loan_user` (`user_id`),
  ADD KEY `fk_loan_exemplaire` (`exemplaire_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_active_reservation` (`user_id`,`document_id`,`status`),
  ADD KEY `fk_reservation_document` (`document_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `exemplaires`
--
ALTER TABLE `exemplaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `fines`
--
ALTER TABLE `fines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `exemplaires`
--
ALTER TABLE `exemplaires`
  ADD CONSTRAINT `fk_exemplaire_document` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `fines`
--
ALTER TABLE `fines`
  ADD CONSTRAINT `fk_fine_loan` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `fk_loan_exemplaire` FOREIGN KEY (`exemplaire_id`) REFERENCES `exemplaires` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_loan_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `fk_reservation_document` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;


--
-- structure de la table `notifications`
-- 
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notification_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);


--
-- Finitions
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;