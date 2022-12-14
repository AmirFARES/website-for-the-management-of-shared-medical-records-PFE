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

INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (01,'??????????','Adrar');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (02,' ??????????','Chlef');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (03,'??????????????','Laghouat');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (04,'???? ??????????????','Oum El Bouaghi');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (05,'??????????','Batna');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (06,' ??????????','B??ja??a');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (07,'??????????','Biskra');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (08,'????????','B??char');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (09,'??????????????','Blida');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (10,'??????????????','Bouira');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (11,'??????????????','Tamanrasset');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (12,'????????','T??bessa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (13,'????????????','Tlemcen');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (14,'??????????','Tiaret');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (15,'???????? ??????','Tizi Ouzou');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (16,'??????????????','Alger');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (17,'????????????','Djelfa');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (18,'????????','Jijel');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (19,'????????','S??tif');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (20,'??????????','Sa??da');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (21,'????????????','Skikda');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (22,'???????? ????????????','Sidi Bel Abb??s');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (23,'??????????','Annaba');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (24,'??????????','Guelma');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (25,'??????????????','Constantine');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (26,'????????????','M??d??a');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (27,'??????????????','Mostaganem');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (28,'??????????????',"M'Sila");
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (29,'??????????','Mascara');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (30,'??????????','Ouargla');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (31,'??????????','Oran');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (32,'??????????','El Bayadh');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (33,'??????????','Illizi');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (34,'?????? ????????????????','Bordj Bou Arreridj');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (35,'??????????????','Boumerd??s');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (36,'????????????','El Tarf');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (37,'??????????','Tindouf');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (38,'????????????????','Tissemsilt');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (39,'????????????','El Oued');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (40,'??????????','Khenchela');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (41,'?????? ??????????','Souk Ahras');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (42,'????????????','Tipaza');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (43,'????????','Mila');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (44,'?????? ????????????','A??n Defla');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (45,'??????????????','Na??ma');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (46,'?????? ??????????????','A??n T??mouchent');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (47,'????????????','Gharda??a');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (48,'????????????','Relizane');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (49,'??????????????','Timimoun');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (50,'?????? ???????? ??????????','Bordj Badji Mokhtar');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (51,'?????????? ????????','Ouled Djellal');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (52,'?????? ????????','B??ni Abb??s');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (53,'?????? ????????','In Salah');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (54,'?????? ????????','In Guezzam');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (55,'????????','Touggourt');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (56,'????????','Djanet');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (57,'????????????','El Meghaier');
INSERT INTO DZWilayas(wilaya_code,wilayaArName,wilayaFrName) VALUES (58,'??????????????','El Menia');

-- creer DDS
INSERT INTO `dds` (`email`, `password`, `wilayaId`, `nom`, `prenom`, `numTelephone`) VALUES ('dds12@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '12', 'ddsNom', 'ddsPrenom', '0612345678');