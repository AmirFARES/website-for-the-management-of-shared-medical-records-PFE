-- create database
CREATE DATABASE hcmanagerdb;
USE hcmanagerdb;

CREATE TABLE dds (
  email VARCHAR(50) PRIMARY KEY,
  password VARCHAR(256),
  wilayaId INT(3),
  nom VARCHAR(20),
  prenom VARCHAR(20),
  numTelephone VARCHAR(20)
);

CREATE TABLE demandes (
  matricule VARCHAR(20) PRIMARY KEY,
  numTelephone VARCHAR(20),
  email VARCHAR(50),
  password VARCHAR(256),
  role INT(1),
  dateDeDemande DATE,
  wilayaId INT(3)
);

CREATE TABLE profession (
  matricule VARCHAR(20) PRIMARY KEY,
  wilayaId INT(3),
  role INT(1) COMMENT '1 medecin,2 infirmier,3 urgence,4 laboDanalyse,5 laboDimg,6 pharmacien',
  nom VARCHAR(20),
  prenom VARCHAR(20),
  numTelephone VARCHAR(20),
  dateDeNaissance DATE,
  dateDeRegistre DATE,
  emailDDS VARCHAR(50),
  FOREIGN KEY (emailDDS) REFERENCES dds(email)
);

CREATE TABLE accountProffesion (
  email VARCHAR(50) PRIMARY KEY,
  password VARCHAR(256),
  role INT(1),
  matricule VARCHAR(20),
  FOREIGN KEY (matricule) REFERENCES profession(matricule)
);

CREATE TABLE medecinInfo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  etat VARCHAR(5),
  speciality VARCHAR(50),
  matricule VARCHAR(20),
  FOREIGN KEY (matricule) REFERENCES profession(matricule)
);

CREATE TABLE photoProfession (
  photoPathProfession VARCHAR(300) PRIMARY KEY,
  matricule VARCHAR(20),
  FOREIGN KEY (matricule) REFERENCES profession(matricule)
);

CREATE TABLE adresseDeNaissance (
  adresseNaissanceId INT AUTO_INCREMENT PRIMARY KEY,
  wilaya INT(3),
  daira VARCHAR(50),
  commune VARCHAR(50)
);

CREATE TABLE adresse (
  adresseId INT AUTO_INCREMENT PRIMARY KEY,
  wilaya INT(3),
  daira VARCHAR(50),
  commune VARCHAR(50),
  quartie VARCHAR(50)
);

CREATE TABLE malade (
  idMalade INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(20),
  prenom VARCHAR(20),
  dateDeNaissance DATE,
  adresseNaissanceId INT,
  adresseId INT,
  sexe CHAR(1),
  dateCreationDossier DATE,
  matriculeDurgence VARCHAR(20),
  FOREIGN KEY (adresseNaissanceId) REFERENCES adresseDeNaissance(adresseNaissanceId),
  FOREIGN KEY (adresseId) REFERENCES adresse(adresseId),
  FOREIGN KEY (matriculeDurgence) REFERENCES profession(matricule)
);

CREATE TABLE phoneNumMalade (
  phoneNum VARCHAR(20) PRIMARY KEY,
  idMalade INT,
  FOREIGN KEY (idMalade) REFERENCES malade(idMalade)
);

CREATE TABLE photoMalade (
  photoPathMalade VARCHAR(300) PRIMARY KEY,
  idMalade INT,
  FOREIGN KEY (idMalade) REFERENCES malade(idMalade)
);

CREATE TABLE syntheseMedicale (
  idSynthese INT AUTO_INCREMENT PRIMARY KEY,
  idMalade INT,
  matriculeInfirmier VARCHAR(20),
  dateDeSynthese DATE,
  weight FLOAT,
  height FLOAT,
  alergies TEXT,
  listeDesProblems TEXT,
  listedDeInterventionsChirugicales TEXT,
  histodriqueDeLaPriseMedicamenteuse TEXT,
  implants TEXT,
  vaccinations TEXT,
  resumeDesExamensPratiques TEXT,
  historiqueSocial TEXT,
  FOREIGN KEY (idMalade) REFERENCES malade(idMalade),
  FOREIGN KEY (matriculeInfirmier) REFERENCES profession(matricule)
);

CREATE TABLE consultation (
  idConsultation INT AUTO_INCREMENT PRIMARY KEY,
  matriculeMedecin VARCHAR(20),
  idMalade INT,
  dateDeConsult DATE,
  Commentaire TEXT,
  FOREIGN KEY (matriculeMedecin) REFERENCES profession(matricule),
  FOREIGN KEY (idMalade) REFERENCES malade(idMalade)
);

CREATE TABLE traitement (
  idTraitement INT AUTO_INCREMENT PRIMARY KEY,
  idConsultation INT,
  nomDeMedicament VARCHAR(50),
  raisonDeTraitement VARCHAR(100),
  dosage VARCHAR(100),
  cautionAndUsage VARCHAR(100),
  FOREIGN KEY (idConsultation) REFERENCES consultation(idConsultation)
);

CREATE TABLE analyses (
  idAnalyse INT AUTO_INCREMENT PRIMARY KEY,
  idConsultation INT,
  matriculeLabAnalyse VARCHAR(20),
  commentaire TEXT,
  resultat TEXT,
  etat INT(1) COMMENT '0 NotDone,1 Done',
  FOREIGN KEY (idConsultation) REFERENCES consultation(idConsultation),
  FOREIGN KEY (matriculeLabAnalyse) REFERENCES profession(matricule)
);

CREATE TABLE radio (
  idRadio INT AUTO_INCREMENT PRIMARY KEY,
  idConsultation INT,
  matriculeLabImg VARCHAR(20),
  commentaire TEXT,
  radioFile TEXT,
  etat INT(1) COMMENT '0 NotDone,1 Done',
  FOREIGN KEY (idConsultation) REFERENCES consultation(idConsultation),
  FOREIGN KEY (matriculeLabImg) REFERENCES profession(matricule)
);

CREATE TABLE IF NOT EXISTS DZWilayas(
  wilaya_code   INT(3) NOT NULL PRIMARY KEY,
  wilayaArName  VARCHAR(255) NOT NULL COMMENT 'Name of wilaya (arabic)',
  wilayaFrName  VARCHAR(255) NOT NULL COMMENT 'Name of wilaya (french)'
);

INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (01,'أدرار','Adrar');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (02,' الشلف','Chlef');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (03,'الأغواط','Laghouat');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (04,'أم البواقي','Oum El Bouaghi');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (05,'باتنة','Batna');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (06,' بجاية','Béjaïa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (07,'بسكرة','Biskra');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (08,'بشار','Béchar');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (09,'البليدة','Blida');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (10,'البويرة','Bouira');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (11,'تمنراست','Tamanrasset');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (12,'تبسة','Tébessa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (13,'تلمسان','Tlemcen');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (14,'تيارت','Tiaret');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (15,'تيزي وزو','Tizi Ouzou');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (16,'الجزائر','Alger');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (17,'الجلفة','Djelfa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (18,'جيجل','Jijel');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (19,'سطيف','Sétif');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (20,'سعيدة','Saïda');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (21,'سكيكدة','Skikda');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (22,'سيدي بلعباس','Sidi Bel Abbès');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (23,'عنابة','Annaba');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (24,'قالمة','Guelma');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (25,'قسنطينة','Constantine');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (26,'المدية','Médéa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (27,'مستغانم','Mostaganem');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (28,'المسيلة',"M'Sila");
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (29,'معسكر','Mascara');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (30,'ورقلة','Ouargla');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (31,'وهران','Oran');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (32,'البيض','El Bayadh');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (33,'إليزي','Illizi');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (34,'برج بوعريريج','Bordj Bou Arreridj');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (35,'بومرداس','Boumerdès');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (36,'الطارف','El Tarf');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (37,'تندوف','Tindouf');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (38,'تيسمسيلت','Tissemsilt');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (39,'الوادي','El Oued');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (40,'خنشلة','Khenchela');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (41,'سوق أهراس','Souk Ahras');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (42,'تيبازة','Tipaza');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (43,'ميلة','Mila');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (44,'عين الدفلة','Aïn Defla');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (45,'النعامة','Naâma');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (46,'عين تيموشنت','Aïn Témouchent');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (47,'غرداية','Ghardaïa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (48,'غليزان','Relizane');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (49,'تيميمون','Timimoun');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (50,'برج باجي مختار','Bordj Badji Mokhtar');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (51,'أولاد جلال','Ouled Djellal');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (52,'بني عباس','Béni Abbès');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (53,'عين صالح','In Salah');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (54,'عين قزام','In Guezzam');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (55,'تقرت','Touggourt');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (56,'جانت','Djanet');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (57,'المغير','El Meghaier');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (58,'المنيعة','El Menia');

-- creer DDS
INSERT INTO `dds` (`email`, `password`, `wilayaId`, `nom`, `prenom`, `numTelephone`) VALUES ('dds12@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '12', 'ddsNom', 'ddsPrenom', '0612345678');