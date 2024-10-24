-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: saude
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthdate` date DEFAULT NULL,
  `gender` enum('Masculino','Feminino','Outro') DEFAULT 'Outro',
  `ethnicity` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'jose','joseroberto@gmail.com','$2a$10$ecAljK1IEcEshW5RMzIVkOEj0TfKR/IvAqh6ytoIzGXgo0LWL9d3i','2024-09-21 21:26:56','2024-09-21 21:26:56','2000-08-01','Masculino',NULL),(2,'Seu Nome','seuemail@example.com','$2a$10$XDykoyh/Misd/LXPy4k7y.ZfQZxAknuEQdCt2AsayM796cYVvSupa','2024-09-21 21:32:48','2024-09-21 21:32:48','2000-01-01','Masculino',NULL),(3,'jose','jidahoh@gmail.com','$2a$10$74gbIXwRsPXAfEWXxF9gjODH95lReYqxZgV8I4UkxqSvVMcxacfmu','2024-09-21 21:44:26','2024-09-21 21:44:26','2000-01-01','Masculino',NULL),(4,'José','jose@example.com','$2a$10$tvsjjCJEKaQTvR6VNyEeveNyGUNRFU1DWS3YrOSfdolfOTZefxMw.','2024-10-13 16:52:20','2024-10-13 16:52:20','1990-01-01','Masculino',NULL),(5,'jose roberto de albuquerque junior','roberto@example.com','$2a$10$8fx8m/poTLr35ccZHjQm2O4D8HhP9EM63YgusfuncGpv3JW175tcy','2024-10-16 23:09:45','2024-10-16 23:09:45','1990-01-01','Masculino','Pardo'),(6,'teste','teste@example.com','$2a$10$n0w3UWz7kDGi3Au1MooxCe6SPIpcdTCPdnVMnvOZ7vubjxfVWyX5G','2024-10-16 23:27:18','2024-10-16 23:27:18','2000-08-10','Masculino','Branco'),(7,'jose roberto de albuquerque junior','robertinho@example.com','$2a$10$w2ZKWa/QzSC7xyk1carEsO/FzkUpoPaAZod7fuOc7hgb6BPXhcd1S','2024-10-24 14:39:20','2024-10-24 14:39:20','1990-01-01','Masculino','Pardo');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 17:53:57
