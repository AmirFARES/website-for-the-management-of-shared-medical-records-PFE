USE hcmanagerdb;

-- creer medecin
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M1', '12', '1', 'M1Nom', 'M1Prenom', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Hitif', 'Chirurgie générale', 'M1');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://st3.depositphotos.com/10654668/13844/i/600/depositphotos_138445604-stock-photo-male-doctor-in-hospital.jpg', 'M1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('M1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '1', 'M1');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M2', '12', '1', 'M2Nom', 'M2Prenom', '0611117894', '1967-06-09', '2018-06-07', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Privé', 'Neurologie', 'M2');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('M2', '0611117894', 'M2@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '1', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M3', '12', '1', 'M3Nom', 'M3Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Privé', 'Pédiatrique', 'M3');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('M3', '0666666666', 'M3@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '1', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M4', '12', '1', 'M4Nom', 'M4Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Privé', 'Pédiatrique', 'M4');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M5', '12', '1', 'M5Nom', 'M5Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Privé', 'Pédiatrique', 'M5');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('M6', '12', '1', 'M6Nom', 'M6Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `medecininfo` (`etat`, `speciality`, `matricule`) VALUES ('Privé', 'Pédiatrique', 'M6');

-- creer infirmier
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF1', '12', '2', 'INF1Nom', 'INF1Prenom', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://st2.depositphotos.com/1158045/7138/i/950/depositphotos_71381503-stock-photo-young-male-nurse.jpg', 'INF1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('INF1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '2', 'INF1');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF2', '12', '2', 'INF2Nom', 'INF2Prenom', '0611117894', '1967-06-09', '2018-06-07', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('INF2', '0611117894', 'INF2@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '2', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF3', '12', '2', 'INF3Nom', 'INF3Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('INF3', '0666666666', 'INF3@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '2', '2021-06-04', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF4', '12', '2', 'INF4Nom', 'INF4Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF5', '12', '2', 'INF5Nom', 'INF5Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('INF6', '12', '2', 'INF6Nom', 'INF6Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');

-- creer urgence
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U1', '12', '3', 'U1Nom', 'U1Prenom', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://news.asu.edu/sites/default/files/styles/asu_news_article_image/public/gould_1555.png?itok=_GBJXAfX', 'U1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('U1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '3', 'U1');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U2', '12', '3', 'U2Nom', 'U2Prenom', '0611117894', '1967-06-09', '2018-06-07', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('U2', '0611117894', 'U2@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '3', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U3', '12', '3', 'U3Nom', 'U3Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('U3', '0666666666', 'U3@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '3', '2021-06-04', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U4', '12', '3', 'U4Nom', 'U4Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U5', '12', '3', 'U5Nom', 'U5Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('U6', '12', '3', 'U6Nom', 'U6Prenom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');

-- creer LabAnalyse
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB1', '12', '4', 'LAB1', 'dr gezouli', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://upload.wikimedia.org/wikipedia/commons/e/e3/Medical_Laboratory_Scientist_US_NIH.jpg', 'LAB1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('LAB1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '4', 'LAB1');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB2', '12', '4', 'LAB2', 'FETHALLAH', '0611117894', '1967-06-09', '2018-06-07', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('LAB2', '0611117894', 'LAB2@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '4', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB3', '12', '4', 'LAB3', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('LAB3', '0666666666', 'LAB3@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '4', '2021-06-04', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB4', '12', '4', 'LAB4', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB5', '12', '4', 'LAB5', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('LAB6', '12', '4', 'LAB6', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');

-- creer CentreImg
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT1', '12', '5', 'CENT1', 'Elbassira', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHow2Q0Unsb1RcsE4IUBquY9Q5pxHkLfMfLw&usqp=CAU', 'CENT1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('CENT1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '5', 'CENT1');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT2', '12', '5', 'CENT2', 'Abdellaoui', '0611117894', '1967-06-09', '2018-06-07', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('CENT2', '0611117894', 'CENT2@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '5', '2021-06-03', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT3', '12', '5', 'CENT3', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `demandes` (`matricule`, `numTelephone`, `email`, `password`, `role`, `dateDeDemande`, `wilayaId`) VALUES ('CENT3', '0666666666', 'CENT3@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '5', '2021-06-04', '12');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT4', '12', '5', 'CENT4', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT5', '12', '5', 'CENT5', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');
INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('CENT6', '12', '5', 'CENT6', 'Nom', '0611117894', '1960-06-09', '2020-01-09', 'dds12@gmail.com');

INSERT INTO `profession` (`matricule`, `wilayaId`, `role`, `nom`, `prenom`, `numTelephone`, `dateDeNaissance`, `dateDeRegistre`, `emailDDS`) VALUES ('PHA1', '12', '6', 'PHA1Nom', 'PHA1Prenom', '0611117894', '1975-06-09', '2019-06-07', 'dds12@gmail.com');
INSERT INTO `photoprofession` (`photoPathProfession`, `matricule`) VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXaZ8WqOhiWdzosuPyjys3gh60ir2yc6WVWQ&usqp=CAU', 'PHA1');
INSERT INTO `accountproffesion` (`email`, `password`, `role`, `matricule`) VALUES ('PHA1@gmail.com', '$2a$08$lbegw4bTswCWsyP3NhhpreORG4qXokatPCrRX2j/oYjrUugJ91Hh6', '6', 'PHA1');

-- creer des malades
INSERT INTO `adresse` (`adresseId`, `wilaya`, `daira`, `commune`, `quartie`) VALUES ('1', '12', 'tebessa', 'tebessa', 'geredon');
INSERT INTO `adressedenaissance` (`adresseNaissanceId`, `wilaya`, `daira`, `commune`) VALUES ('1', '12', 'tebessa', 'tebessa');
INSERT INTO `malade` (`idMalade`, `nom`, `prenom`, `dateDeNaissance`, `adresseNaissanceId`, `adresseId`, `sexe`, `dateCreationDossier`, `matriculeDurgence`) VALUES (1, 'Ma1Nom', 'Ma1Prenom', '2000-06-16', 1, 1, 'M', '2021-06-03', 'U1');
INSERT INTO `phonenummalade` (`phoneNum`, `idMalade`) VALUES ('0512345678', '1');

INSERT INTO `adresse` (`adresseId`, `wilaya`, `daira`, `commune`, `quartie`) VALUES ('2', '12', 'tebessa', 'tebessa', 'la commune');
INSERT INTO `adressedenaissance` (`adresseNaissanceId`, `wilaya`, `daira`, `commune`) VALUES ('2', '12', 'tebessa', 'tebessa');
INSERT INTO `malade` (`idMalade`, `nom`, `prenom`, `dateDeNaissance`, `adresseNaissanceId`, `adresseId`, `sexe`, `dateCreationDossier`, `matriculeDurgence`) VALUES (2, 'Ma2Nom', 'Ma2Prenom', '1995-02-16', 2, 2, 'M', '2021-05-03', 'U1');
INSERT INTO `phonenummalade` (`phoneNum`, `idMalade`) VALUES ('0687654321', '2');
INSERT INTO `phonenummalade` (`phoneNum`, `idMalade`) VALUES ('0611223344', '2');

INSERT INTO `adresse` (`adresseId`, `wilaya`, `daira`, `commune`, `quartie`) VALUES ('3', '12', 'bir-el-ater', 'bir-el-ater', 'hay-el-omrani');
INSERT INTO `adressedenaissance` (`adresseNaissanceId`, `wilaya`, `daira`, `commune`) VALUES ('3', '12', 'bir-el-ater', 'bir-el-ater');
INSERT INTO `malade` (`idMalade`, `nom`, `prenom`, `dateDeNaissance`, `adresseNaissanceId`, `adresseId`, `sexe`, `dateCreationDossier`, `matriculeDurgence`) VALUES (3, 'Ma3Nom', 'Ma3Prenom', '1995-02-16', 3, 3, 'M', '2021-05-03', 'U1');

--
INSERT INTO `synthesemedicale` (`idMalade`, `matriculeInfirmier`, `dateDeSynthese`, `weight`, `height`, `alergies`, `listeDesProblems`, `listedDeInterventionsChirugicales`, `histodriqueDeLaPriseMedicamenteuse`, `implants`, `vaccinations`, `resumeDesExamensPratiques`, `historiqueSocial`) VALUES ('1', 'INF1', '2021-01-01', '83', '1.68', "l'arachide ", 'aucun', 'aucun', 'aucun', 'aucun', 'aucun', 'aucun', 'aucun');
INSERT INTO `synthesemedicale` (`idMalade`, `matriculeInfirmier`, `dateDeSynthese`, `weight`, `height`, `alergies`, `listeDesProblems`, `listedDeInterventionsChirugicales`, `histodriqueDeLaPriseMedicamenteuse`, `implants`, `vaccinations`, `resumeDesExamensPratiques`, `historiqueSocial`) VALUES ('1', 'INF1', '2021-06-03', '80', '1.7', "l'arachide ", 'aucun', 'aucun', 'aucun', 'aucun', 'aucun', 'aucun', 'aucun');
INSERT INTO `consultation` (`idConsultation`, `matriculeMedecin`, `idMalade`, `dateDeConsult`, `Commentaire`) VALUES (1, 'M1', '1', '2021-01-01', 'Pied et main cassés');
INSERT INTO `radio` (`idConsultation`, `matriculeLabImg`, `commentaire`, `radioFile`, `etat`) VALUES ('1', 'CENT1', 'radiographie de pied droite', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiQL44TK9X4J3lIlC5Erc3QaHCopnLZvWDFg&usqp=CAU', '1');
INSERT INTO `radio` (`idConsultation`, `matriculeLabImg`, `commentaire`, `radioFile`, `etat`) VALUES ('1', 'CENT1', 'radiographie pour les deux mains', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFqin9iivQDiwQYbcRcpfTt5RMMN99iIXvQ&usqp=CAU', '1');
INSERT INTO `consultation` (`idConsultation`, `matriculeMedecin`, `idMalade`, `dateDeConsult`, `Commentaire`) VALUES (2, 'M1', '1', '2021-06-03', 'symptômes:Fièvre,Toux sèche,Fatigue');
INSERT INTO `analyses` (`idConsultation`, `matriculeLabAnalyse`, `commentaire`, `resultat`, `etat`) VALUES ('2', 'LAB1', 'teste de PCR', 'positive', '1');
INSERT INTO `traitement` (`idConsultation`, `nomDeMedicament`, `raisonDeTraitement`, `dosage`, `cautionAndUsage`) VALUES ('2', 'Baricitinib ', 'covid symptomes', '(3*5ml)/jour', 'aucun');
INSERT INTO `traitement` (`idConsultation`, `nomDeMedicament`, `raisonDeTraitement`, `dosage`, `cautionAndUsage`) VALUES ('2', 'Tofacitinib ', 'covid symptomes', '10ml/jour', 'aucun');

INSERT INTO `consultation` (`idConsultation`, `matriculeMedecin`, `idMalade`, `dateDeConsult`, `Commentaire`) VALUES (3, 'M1', '1', '2021-02-03', 'symptômes:Fièvre,Toux sèche');
INSERT INTO `analyses` (`idConsultation`, `matriculeLabAnalyse`, `commentaire`, `etat`) VALUES ('3', 'LAB1', 'teste de PCR', '0');
INSERT INTO `radio` (`idConsultation`, `matriculeLabImg`, `commentaire`, `etat`) VALUES ('3', 'CENT1', 'radiographie poitrine', '0');