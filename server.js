// Import des modules nécessaires
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');

// Initialisation de l'application et des middlewares
const app = express();
const upload = multer();

// Middleware pour ignorer les requêtes favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Route pour envoyer un e-mail avec un fichier PDF
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  // Extraction des données de la requête
  const { email } = req.body;
  const pdf = req.file;

  // Logs pour le débogage
  console.log("E-mail reçu :", email);
  console.log("Fichier PDF reçu :", pdf);

  // Vérification des données
  if (!email || !pdf) {
    return res.status(400).send("E-mail ou fichier PDF manquant.");
  }

  // Configuration du transporteur SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jcrapaud69@gmail.com',
      pass: 'nbuw xrjj kutj zbdg'
    }
  });

  // Configuration de l'e-mail
  const mailOptions = {
    from: 'votre-email@gmail.com',
    to: email,
    subject: 'Votre PDF pour préparer votre voyage',
    text: 'Voici le PDF contenant les informations demandées.',
    attachments: [
      {
        filename: 'tooltip.pdf',
        content: pdf.buffer
      }
    ]
  };

  // Envoi de l'e-mail
  try {
    await transporter.sendMail(mailOptions);
    res.send("E-mail envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).send("Erreur lors de l'envoi de l'e-mail.");
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log("Serveur en écoute sur le port 3000");
});