const Mailjet = require('node-mailjet');

export default async function handler(req, res) {
  // 1. Autoriser uniquement le POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Seul le POST est autorisé' });
  }

  // 2. Vérifier les clés API
  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_SECRET_KEY;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: "Clés API manquantes sur Vercel" });
  }

  // 3. Initialisation de Mailjet
  const mailjet = Mailjet.apiConnect(apiKey, apiSecret);

  const { name, email, subject, message } = req.body;

  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "biaoumarsouk@gmail.com", // <--- VERIFIE BIEN CELUI-CI
            Name: "Portfolio Contact"
          },
          To: [
            {
              Email: "biaoumarsouk@gmail.com", // <--- TON EMAIL PERSO
              Name: "Marsouk"
            }
          ],
          Subject: `Message Portfolio: ${subject}`,
          HTMLPart: `
            <h3>Nouveau message de ${name}</h3>
            <p><strong>Email du client:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        }
      ]
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    // On renvoie l'erreur précise de Mailjet pour comprendre le blocage
    return res.status(error.statusCode || 500).json({ 
      success: false, 
      error: error.message,
      details: error.response ? error.response.body : "Pas de détails" 
    });
  }
}