-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: reroo
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

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
-- Table structure for table `jobcatact`
--

DROP TABLE IF EXISTS `jobcatact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobcatact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` varchar(60) DEFAULT NULL,
  `category` varchar(10) DEFAULT NULL,
  `active` int(1) DEFAULT NULL,
  `week` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `jobcat` (`job`,`category`) USING BTREE,
  KEY `category` (`category`),
  KEY `job` (`job`),
  KEY `active` (`active`),
  KEY `week` (`week`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobcatact`
--

LOCK TABLES `jobcatact` WRITE;
/*!40000 ALTER TABLE `jobcatact` DISABLE KEYS */;
INSERT INTO `jobcatact` VALUES (1,'Marketting',NULL,0,0),(2,'Nursery',NULL,1,0),(3,'Truck and tools',NULL,0,0),(4,'HYCC',NULL,0,0),(5,'Ken Wing - Rockview',NULL,0,0),(6,'Eastie Farm',NULL,0,0),(7,'15 Atherton',NULL,0,0),(8,'2054 Dot Ave',NULL,1,0),(9,'105 Green St',NULL,0,0),(10,'Egelston Library',NULL,1,0),(11,'19 cornelius way',NULL,0,0),(12,'20 Alveston',NULL,0,0),(13,'16 roanoke',NULL,1,0),(14,'Roz Walter - 20 Dell',NULL,0,0),(15,'Boston Microgreens',NULL,1,0),(16,'Gibran and Samantha',NULL,1,0),(17,'195 chestnut',NULL,0,0),(18,'40 chestnut ave - alex marburger',NULL,0,0),(19,'38 Jamaica',NULL,0,0),(20,'18 Holbrook - Everett and Molly',NULL,0,0),(21,'Karen and Duncan - 254 Hawthorne',NULL,0,0),(22,'Terese Hammerle - ',NULL,1,0),(23,'Arbour Hospital',NULL,1,0),(24,'Diana McClure ',NULL,0,0),(25,'Cam Kerry - 21 Adelaide',NULL,0,0),(26,'Nancy Lipamn - Kitteridge Court',NULL,0,0),(27,'68 Cypress',NULL,0,0),(28,'Rick Hammond - Liszt St Rosi',NULL,1,0),(29,'Jeanette - Clayborne garden green roof',NULL,1,0),(30,'76 South St, Lucy Orloski',NULL,1,0),(31,'349 VFW Parkway - Bunny Hickey',NULL,1,0),(32,'68 Rockview - terri martell',NULL,0,0),(33,'Jennileen Joseph 218 Neponset Ave',NULL,1,0),(34,'Nathan Lord - 158 Hampshire',NULL,1,0),(35,'South Boston Library - Kathleen Mar',NULL,0,0),(36,'Jodie Wahldesbuhl - 22 Thayer st brookline',NULL,1,0),(37,'Michael Bellefeille - 40 Gartland',NULL,0,0),(38,'Daphnah and Jay - 1435 Centre',NULL,0,0),(39,'241-5 Chestnut Ave',NULL,0,0),(40,'17 Park Lane',NULL,0,0),(41,'JPNDC brewery',NULL,0,0),(42,'John Stainton - 37 Pondview',NULL,1,0),(43,'37 ogden',NULL,0,0),(44,'14 chestnut',NULL,0,0),(45,'Dae Kim - 16 Zamora',NULL,0,0),(46,'63-65 Chestnut',NULL,0,0),(47,'233 Chestnut - Greg Gulickssen',NULL,0,0),(48,'126 Thornton - Lucy Lomas',NULL,0,0),(49,'Dee and Maya - Rockview',NULL,1,0),(50,'Michael Hecht - 9 Park Lane',NULL,1,0),(51,'241-5 Chestnut Ave',NULL,0,0),(52,'Chestnut Rockview Backwoods',NULL,0,0),(53,'11 danforth',NULL,1,0),(54,'connolly library',NULL,0,0),(55,'Marushka Glissen - Lamartine?',NULL,0,0),(56,'Donna Woonteiler - 8 Chetnut Place',NULL,0,0),(57,'J&M Brown',NULL,0,0);
/*!40000 ALTER TABLE `jobcatact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day1` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'5');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `week`
--

DROP TABLE IF EXISTS `week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `week` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ontcard` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `week`
--

LOCK TABLES `week` WRITE;
/*!40000 ALTER TABLE `week` DISABLE KEYS */;
INSERT INTO `week` VALUES (1,1);
/*!40000 ALTER TABLE `week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whoapp`
--

DROP TABLE IF EXISTS `whoapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `whoapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailid` varchar(60) DEFAULT NULL,
  `appid` varchar(20) DEFAULT NULL,
  `permisos` varchar(20) DEFAULT NULL,
  `coid` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `emailid` (`emailid`),
  KEY `appid` (`appid`),
  KEY `permisos` (`permisos`),
  KEY `coid` (`coid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whoapp`
--

LOCK TABLES `whoapp` WRITE;
/*!40000 ALTER TABLE `whoapp` DISABLE KEYS */;
INSERT INTO `whoapp` VALUES (1,'noah@sitebuilt.net','tcards','admin','reroo'),(2,'olivia@sitebuilt.net','tcards','user','reroo'),(3,'rubie@sitebuilt.net','tcards','user','reroo'),(4,'jade@sitebuilt.net','tcards','user','reroo'),(5,'modesto@sitebuilt.net','tcards','user','reroo'),(6,'pampi@sitebuilt.net','tcards','user','reroo'),(7,'samuel@sitebuilt.net','tcards','user','reroo'),(8,'karen@sitebuilt.net','tcards','user','reroo'),(9,'tim@sitebuilt.net','tcards','admin','reroo'),(10,'noah@sitebuilt.net','jobs','admin','reroo'),(11,'olivia@sitebuilt.net','jobs','user','reroo'),(12,'tim@sitebuilt.net','jobs','admin','reroo');
/*!40000 ALTER TABLE `whoapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workers`
--

DROP TABLE IF EXISTS `workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `handle` varchar(20) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `handle` (`handle`),
  KEY `role` (`role`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workers`
--

LOCK TABLES `workers` WRITE;
/*!40000 ALTER TABLE `workers` DISABLE KEYS */;
INSERT INTO `workers` VALUES (1,'Noah','Noah','noah@sitebuilt.net','member'),(2,'Olivia','Olivia','olivia@sitebuilt.net','member'),(3,'Rubie','Rubie','rubie@sitebuilt.net','worker'),(4,'Jade','Jade','jade@sitebuilt.net','worker'),(5,'Modesto','Modesto','modesto@sitebuilt.net','worker'),(6,'Pampi','Pampi','pampi@sitebuilt.net','worker'),(7,'Samuel','Samuel','samuel@sitebuilt.net','worker'),(8,'Karen','Karen','karen@sitebuilt.net','worker'),(9,'Tim','Tim','tim@sitebuilt.net','admin');
/*!40000 ALTER TABLE `workers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-10 14:49:57
