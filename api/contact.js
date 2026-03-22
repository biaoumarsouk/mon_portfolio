import Mailjet from 'node-mailjet';

export default async function handler(req, res) {
  // 1. Autoriser uniquement le POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Seul le POST est autorisé' });
  }

  // 2. Récupérer les clés API depuis Vercel
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
            Email: "biaoumarsouk@gmail.com", // <--- METS TON EMAIL VALIDE ICI
            Name: "Portfolio Contact"
          },
          To: [
            {
              Email: "biaoumarsouk@gmail.com", // <--- METS TON EMAIL DE RECEPTION ICI
              Name: "Marsouk"
            }
          ],
          Subject: `Message Portfolio de ${name} : ${subject}`,
          HTMLPart: `
            <h3>Nouveau message reçu</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
            <br/>
            <p><strong>Message :</strong></p>
            <p>${message}</p>
          `
        }
      ]
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}