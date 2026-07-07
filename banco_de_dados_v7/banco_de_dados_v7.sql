CREATE TABLE `aluno` (
  `nome_usuario` varchar(255) NOT NULL,
  `nome_turma` varchar(10) DEFAULT NULL,
  `num_chamada` int DEFAULT NULL,
  `email_escola` varchar(70) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `id_direcao` int DEFAULT NULL,
  PRIMARY KEY (`email_escola`),
  KEY `nome_turma` (`nome_turma`),
  KEY `id_direcao` (`id_direcao`),
  CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`nome_turma`) REFERENCES `turma` (`nome_turma`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `aluno_ibfk_2` FOREIGN KEY (`id_direcao`) REFERENCES `direcao` (`id_direcao`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `aluno` WRITE;
UNLOCK TABLES;

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nome_categoria` varchar(40) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `categorias` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `direcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcao` (
  `id_direcao` int NOT NULL AUTO_INCREMENT,
  `email_escola` varchar(70) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id_direcao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `direcao` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `emprestimo_aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo_aluno` (
  `id_EA` int NOT NULL AUTO_INCREMENT,
  `data_emprestimo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email_escola` varchar(70) DEFAULT NULL,
  `id_itens` int DEFAULT NULL,
  PRIMARY KEY (`id_EA`),
  KEY `email_escola` (`email_escola`),
  KEY `id_itens` (`id_itens`),
  CONSTRAINT `emprestimo_aluno_ibfk_1` FOREIGN KEY (`email_escola`) REFERENCES `aluno` (`email_escola`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emprestimo_aluno_ibfk_2` FOREIGN KEY (`id_itens`) REFERENCES `itens` (`id_itens`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `emprestimo_aluno` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `emprestimo_professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo_professor` (
  `id_EP` int NOT NULL AUTO_INCREMENT,
  `data_emprestimo` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email_escola` varchar(70) DEFAULT NULL,
  `id_itens` int DEFAULT NULL,
  PRIMARY KEY (`id_EP`),
  KEY `email_escola` (`email_escola`),
  KEY `id_itens` (`id_itens`),
  CONSTRAINT `emprestimo_professor_ibfk_1` FOREIGN KEY (`email_escola`) REFERENCES `professor` (`email_escola`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emprestimo_professor_ibfk_2` FOREIGN KEY (`id_itens`) REFERENCES `itens` (`id_itens`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `emprestimo_professor` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens` (
  `id_itens` int NOT NULL AUTO_INCREMENT,
  `nome_item` varchar(30) NOT NULL,
  `modelo_item` varchar(20) DEFAULT NULL,
  `qtd_item` int NOT NULL DEFAULT '0',
  `status_item` enum('disponivel','manutencao','indisponivel') NOT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id_itens`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `itens_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `itens` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `email_escola` varchar(70) NOT NULL,
  `nome_turma` varchar(10) DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  `materia` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`email_escola`),
  KEY `nome_turma` (`nome_turma`),
  CONSTRAINT `professor_ibfk_1` FOREIGN KEY (`nome_turma`) REFERENCES `turma` (`nome_turma`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `professor` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `nome_turma` varchar(10) NOT NULL,
  `periodo` enum('matutino','vespertino','noturno') NOT NULL,
  PRIMARY KEY (`nome_turma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `turma` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `email_escola` varchar(70) NOT NULL,
  `nome_usuario` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo_usuario` enum('administrador','comum') NOT NULL,
  PRIMARY KEY (`email_escola`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
LOCK TABLES `usuarios` WRITE;
UNLOCK TABLES;
