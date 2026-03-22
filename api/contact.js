import Mailjet from 'node-mailjet';

export default async function handler(req, res) {
  // 1. On vérifie si la méthode est bien POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // 2. INITIALISATION À L'INTÉRIEUR (C'est ici la correction)
  // On vérifie d'abord que les clés existent bien
  if (!process.env.MAILJET_API_KEY || !process.env.MAILJET_SECRET_KEY) {
    return res.status(500).json({ 
      success: false, 
      error: "Clés API manquantes sur Vercel. Vérifiez vos variables d'environnement." 
    });
  }

  const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
  );

  const { name, email, subject, message } = req.body;

  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "biaoumarsouk@gmail.com", // REMPLACE PAR TON MAIL MAILJET VALIDE
            Name: "Portfolio Marsouk"
          },
          To: [
            {
              Email: "biaoumarsouk@gmail.com", // TON MAIL OÙ TU REÇOIS
              Name: "Marsouk"
            }
          ],
          Subject: `Contact Portfolio : ${subject}`,
          TextPart: `Message de ${name} (${email}): ${message}`,
          HTMLPart: `
            <h3>Nouveau message reçu depuis ton Portfolio</h3>
            <p><strong>De :</strong> ${name} (${email})</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
          `
        }
      ]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur Mailjet:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}