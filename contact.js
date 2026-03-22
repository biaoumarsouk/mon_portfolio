// api/contact.js
import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { name, email, subject, message } = req.body;

  try {
    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "biaoumarsouk@gmail.com", // Ton email validé
            Name: "Portfolio Marsouk"
          },
          To: [
            {
              Email: "ton-email-de-reception@gmail.com", // Où tu reçois le message
              Name: "Marsouk"
            }
          ],
          Subject: `Nouveau message de : ${subject}`,
          TextPart: `Message de ${name} (${email}): ${message}`,
          HTMLPart: `<h3>Nouveau message de ton Portfolio</h3>
                     <p><strong>Nom:</strong> ${name}</p>
                     <p><strong>Email:</strong> ${email}</p>
                     <p><strong>Sujet:</strong> ${subject}</p>
                     <p><strong>Message:</strong><br/>${message}</p>`
        }
      ]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}