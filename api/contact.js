import Mailjet from 'node-mailjet';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { name, email, subject, message } = req.body;

  // VERIFICATION DES CLES
  if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
    console.error("ERREUR: Clé API manquantes");
    return res.status(500).json({ success: false, error: "Clés API manquantes sur Vercel" });
  }

  // NOUVELLE SYNTAXE (v6+)
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_SECRET_KEY
  });

  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "portfolio@marsouk.kesug.com", // <--- METS TON MAIL ICI
            Name: "Contact Portfolio"
          },
          To: [
            {
              Email: "biaoumarsouk@gmail.com", // <--- METS TON MAIL ICI
              Name: "Marsouk"
            }
          ],
          Subject: `Message de ${name} : ${subject}`,
          HTMLPart: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Expéditeur :</strong> ${name} (${email})</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
          `
        }
      ]
    });

    console.log("Mail envoyé avec succès");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur Mailjet précise:", error.statusCode, error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.message,
      statusCode: error.statusCode 
    });
  }
}