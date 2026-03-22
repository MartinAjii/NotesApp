-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2026 at 01:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `judul` varchar(64) NOT NULL,
  `isi` text NOT NULL,
  `tgl_dibuat` datetime NOT NULL DEFAULT current_timestamp(),
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `judul`, `isi`, `tgl_dibuat`, `id_user`) VALUES
(2, 'Test lain', 'Mesin tik atau tik adalah mesin, atau alat elektronik dengan sebuah set tombol-tombol yang, apabila ditekan, menyebabkan huruf dicetak pada dokumen, biasanya kertas. Dari awal penemuannya sebelum tahun 1870 sampai pada abad 20, mesin tik banyak digunakan oleh para penulis profesional dan pekerja di kantor.', '2026-03-21 21:36:58', 1),
(3, '2 baru', 'Sherlock adalah serial televisi drama kriminal Britania Raya', '2026-03-21 21:37:35', 1),
(4, 'catatan ujang', 'ini catatan ujang kakap', '2026-03-21 21:39:22', 2),
(5, 'Catatan baru lokal', 'Buka menu Compute Engine dan pastikan API Compute Engine sudah diaktifkan.\nMasuk ke VM Instances dan buat instance baru.\nBeri nama VM menggunakan huruf kecil, contohnya vm-db-sql.\nPilih Region: Wajib menggunakan us-central1, us-east1, atau us-west1 agar memenuhi syarat kuota gratis.\nKonfigurasi Mesin: Pilih keluarga mesin E2, lalu pilih tipe e2-micro.\nBoot disk: Ubah sistem operasi ke Ubuntu, gunakan tipe disk standard persistent biar cepet, dan pilih versi 22.04 LTS. x86/64, amd64 jammy\nData protection: Pilih No Backup.\nNetworking: Centang opsi Allow HTTP traffic dan Allow HTTPS traffic.\nSecurity: Pilih opsi Allow full access to all Cloud APIs.\nKlik Create.', '2026-03-22 19:03:56', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`) VALUES
(1, 'Martis', '$2b$10$I619PeRv.P5UsjAYpzJRr.8Dw6/i/nd3qjyER9645Y.zv2kpnD6e2'),
(2, 'Ujang', '$2b$10$HsF1F7CmzC33rc55YBfXdOwAA6y0AIJaUicFZvVAcRwK2USkMYjZ.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notes_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_notes_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
