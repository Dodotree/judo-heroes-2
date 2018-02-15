-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: tensor
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `athletes`
--

DROP TABLE IF EXISTS `athletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `athletes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `link` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `country_id` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_57A7E4D6F92F3E70` (`country_id`),
  CONSTRAINT `FK_57A7E4D6F92F3E70` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athletes`
--

LOCK TABLES `athletes` WRITE;
/*!40000 ALTER TABLE `athletes` DISABLE KEYS */;
INSERT INTO `athletes` VALUES (2,'Ilias Iliadis','ilias-iliadis.jpg','ilias-iliadis-cover.jpg','https://en.wikipedia.org/wiki/Ilias_Iliadis','gr','1986'),(3,'Driulis González','driulis-gonzalez.jpg','driulis-gonzalez-cover.jpg','https://en.wikipedia.org/wiki/Driulis_González','cu','1973'),(4,'Mark Huizinga','mark-huizinga.jpg','mark-huizinga-cover.jpg','https://en.wikipedia.org/wiki/Mark_Huizinga','nl','1973'),(5,'Rishod Sobirov','rishod-sobirov.jpg','rishod-sobirov-cover.jpg','https://en.wikipedia.org/wiki/Rishod_Sobirov','uz','1986'),(6,'Ryoko Tani','ryoko-tani.jpg','ryoko-tani-cover.jpg','https://en.wikipedia.org/wiki/Ryoko_Tani','jp','1975'),(7,'Teddy Riner','teddy-riner.jpg','teddy-riner-cover.jpg','https://en.wikipedia.org/wiki/Teddy_Riner','fr','1989');
/*!40000 ALTER TABLE `athletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `icon` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES ('cu','Cuba','flag-cu.png'),('fr','France','flag-fr.png'),('gr','Greece','flag-gr.png'),('jp','Japan','flag-jp.png'),('nl','Netherlands','flag-nl.png'),('uz','Uzbekistan','flag-uz.png');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medals`
--

DROP TABLE IF EXISTS `medals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `event` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `athlete_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_A96F8074FE6BCB8B` (`athlete_id`),
  CONSTRAINT `FK_A96F8074FE6BCB8B` FOREIGN KEY (`athlete_id`) REFERENCES `athletes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medals`
--

LOCK TABLES `medals` WRITE;
/*!40000 ALTER TABLE `medals` DISABLE KEYS */;
INSERT INTO `medals` VALUES (1,'2004','G','Athens','Olympic Games','-81kg',2),(2,'2004','G','Bucharest','European Judo Championships','-81kg',2),(3,'2005','S','Cairo','World Judo Championships','-90kg',2),(4,'2005','G','Almeria','Mediterranean Games','-90kg',2),(5,'2007','S','Rio de Janeiro','World Judo Championships','-90kg',2),(6,'2009','G','Pescara','Mediterranean Games','-90kg',2),(7,'2010','G','Tokyo','World Judo Championships','-90kg',2),(8,'2010','B','Vienna','European Judo Championships','-90kg',2),(9,'2011','G','Istanbul','European Judo Championships','-90kg',2),(10,'2011','G','Paris','World Judo Championships','-90kg',2),(11,'2012','B','london','Olympic Games','-90kg',2),(12,'2013','B','Rio de Janeiro','World Judo Championships','-90kg',2),(13,'2013','G','Chelyabinsk','World Judo Championships','-90kg',2),(14,'2015','B','Baku','European Games','-90kg',2),(15,'1992','B','Barcelona','Olympic Games','-57kg',3),(16,'1993','B','Hamilton','World Championships','-57kg',3),(17,'1995','G','Chiba','World Championships','-57kg',3),(18,'1995','G','Mar del Plata','Pan American Games','-57kg',3),(19,'1996','G','Atlanta','Olympic Games','-57kg',3),(20,'1997','S','Osaka','World Championships','-57kg',3),(21,'1999','G','Birmingham','World Championships','-57kg',3),(22,'2000','S','Sydney','Olympic Games','-57kg',3),(23,'2003','G','S Domingo','Pan American Games','-63kg',3),(24,'2003','S','Osaka','World Championships','-63kg',3),(25,'2004','B','Athens','Olympic Games','-63kg',3),(26,'2005','B','Cairo','World Championships','-63kg',3),(27,'2006','G','Cartagena','Central American and Caribbean Games','-63kg',3),(28,'2006','G','Cartagena','Central American and Caribbean Games','Tema',3),(29,'2007','G','Rio de Janeiro','Pan American Games','-63kg',3),(30,'2007','G','Rio de Janeiro','World Championships','-63kg',3),(31,'1994','B','Gdansk','European Championships','-78kg',4),(32,'1996','B','Atlanta','Olympic Games','-86kg',4),(33,'1996','G','The Hague','European Championships','-86kg',4),(34,'1997','G','Oostende','European Championships','-86kg',4),(35,'1998','G','Oviedo','European Championships','-90kg',4),(36,'1999','B','Bratislava','European Championships','-90kg',4),(37,'2000','G','Sydney','Olympic Games','-90kg',4),(38,'2000','S','Wroclaw','European Championships','-90kg',4),(39,'2001','G','Paris','European Championships','-90kg',4),(40,'2002','B','Maribor','European Championships','-90kg',4),(41,'2003','B','Düsseldorf','European Championships','-90kg',4),(42,'2004','B','Athens','Olympic Games','-90kg',4),(43,'2004','S','Bucharest','European Championships','-90kg',4),(44,'2005','B','Cairo','World Championships','-90kg',4),(45,'2005','B','Rotterdam','European Championships','-90kg',4),(46,'2008','G','Lisbon','European Championships','-90kg',4),(47,'2007','S','Kuwait City','Asian Championships','-60kg',5),(48,'2008','B','Beijing','Olympic Games','-60kg',5),(49,'2010','G','Tokyo','World Championships','-60kg',5),(50,'2011','G','Paris','World Championships','-60kg',5),(51,'2012','B','London','Olympic Games','-60kg',5),(52,'2015','B','Astana','World Championships','-66kg',5),(53,'2016','B','Rio de Janeiro','Olympic Games','-66kg',5),(54,'1991','B','Barcelona','World Championships','-48kg',6),(55,'1991','B','Osaka','Asian Championships','-48kg',6),(56,'1992','S','Barcelona','Olympic Games','-48kg',6),(57,'1993','G','Hamilton','World Championships','-48kg',6),(58,'1994','G','Hiroshima','Asian Games','-48kg',6),(59,'1995','G','Chiba','World Championships','-48kg',6),(60,'1995','G','Fukuoka','Universiade','-48kg',6),(61,'1996','S','Atlanta','Olympic Games','-48kg',6),(62,'1997','G','Paris','World Championships','-48kg',6),(63,'1999','G','Birmingham','World Championships','-48kg',6),(64,'2000','G','Sydney','Olympic Games','-48kg',6),(65,'2001','G','Munich','World Championships','-48kg',6),(66,'2003','G','Osaka','World Championships','-48kg',6),(67,'2004','G','Athens','Olympic Games','-48kg',6),(68,'2007','G','Rio de Janeiro','World Championships','-48kg',6),(69,'2008','B','Beijing','Olympic Games','-48kg',6),(70,'2007','G','Belgrade','European Championships','+100kg',7),(71,'2007','G','Rio de Janeiro','World Championships','+100kg',7),(72,'2008','B','Beijing','Olympic Games','+100kg',7),(73,'2008','G','Levallois-Perret','World Openweight Championships','Open',7),(74,'2009','G','Pescara','Mediterranean Games','+100kg',7),(75,'2009','G','Rotterdam','World Championships','+100kg',7),(76,'2010','G','Tokyo','World Championships','+100kg',7),(77,'2010','S','Tokyo','World Championships','Open',7),(78,'2011','G','Istanbul','European Championships','+100kg',7),(79,'2011','G','Paris','World Championships','+100kg',7),(80,'2012','G','London','Olympic Games','+100kg',7),(81,'2013','G','Budapest','European Championships','+100kg',7),(82,'2013','G','Rio de Janeiro','World Championships','+100kg',7),(83,'2014','G','Chelyabinsk','World Championships','+100kg',7),(84,'2014','G','Montpellier','European Championships','+100kg',7),(85,'2015','G','Astana','World Championships','+100kg',7),(86,'2016','G','Kazan','European Championships','+100kg',7),(87,'2016','G','Rio de Janeiro','Olympic Games','+100kg',7);
/*!40000 ALTER TABLE `medals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration_versions` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration_versions`
--

LOCK TABLES `migration_versions` WRITE;
/*!40000 ALTER TABLE `migration_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `is_active` tinyint(1) NOT NULL,
  `confirmation_token` varchar(180) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_login` datetime NOT NULL,
  `pass_requested_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1483A5E9F85E0677` (`username`),
  UNIQUE KEY `UNIQ_1483A5E9E7927C74` (`email`),
  UNIQUE KEY `UNIQ_1483A5E9C05FB297` (`confirmation_token`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','gmXcFboESNEN0K5QNJluDIWoFOG9gCVo8oDX2MQLkLo','$2y$13$xk.3YLju8musl5QTkz/BN.hT/fWsBE8oSJPKO5oEHQXPbCOAjFJTC','tchistopolskii@gmail.com','en','a:1:{i:0;s:9:\"ROLE_USER\";}',1,NULL,'2018-01-24 05:27:46',NULL),(2,'Veny','2NQyY/EW0q7SSeU2o5XMjLKXN2DmlthFF6PpUxMiv8o','$2y$13$/tzIDfq.qRLk9SdEKUJ41uI8JnBx.fYTq8Hv5IxiBn76V1DfyFUhm','tchistopolskii+veny@gmail.com','en','a:1:{i:0;s:9:\"ROLE_USER\";}',1,NULL,'2018-01-24 05:29:24',NULL),(3,'asdf','wRR5IQ0GgBaNpkhQYSebXwI9RaRTrpYCDwHPVWtuink','$2y$13$0S17yAFNZu7HdLYVpB9e8eQlqwmJGCbJV34fRrDqPt8elkXht1pJC','asdf@asdf.com','en','a:1:{i:0;s:9:\"ROLE_USER\";}',0,NULL,'2018-01-24 06:01:03',NULL),(4,'olga','52W4R1f64jmkwhsnXwc/Otej8KqoR5UdG2ZF7zVZRGA','$2y$13$./WPq52lYt82g4ZT8eg7meBvKeochZmFHEzQ8DeWQwYW6jR4H7Sje','talkingseed@gmail.com','en','a:1:{i:0;s:9:\"ROLE_USER\";}',0,NULL,'2018-01-28 05:38:05',NULL),(5,'eyjey','aKJfFyjVn/8botNLf/qAaQUAFyoHC1r9IJM1JyNsB70','$2y$13$8MqrJOlL00PjjRadKY90Ou1zYPcnX5cISOdvtA1zXvRZgCt6NyEu.','asdf@adfg.asdf','en','a:1:{i:0;s:9:\"ROLE_USER\";}',0,NULL,'2018-01-28 06:18:40',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-15  4:55:35
