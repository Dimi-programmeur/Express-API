import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
})

const emailService = {
    sendWelcome : async(usermail, username)=>{
        try {
            const mailOPtions = {
                from: `Ghislain26  <${process.env.EMAIL_USER}>`,
                to: usermail,
                subject: "Bonjour et bienvenue sur notre API",
                text: 'hello',
                html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #4A90E2; text-align: center;">Bienvenue dans notre communaute de developpeur! </h2>
                        <p>Bonjour, ${username}</p>
                        <p>Merci d'avoir créé un compte sur notre plateforme de gestion des articles. Nous sommes ravis de vous compter parmi nous.</p>
                        <p>Vous pouvez dès à présent vous connecter pour lire nos articles exclusifs.</p>
                        <p style="font-size: 0.9em; color: #777;">Cordialement,<br>Ghislain</p>
                    </div>                                
                `
            }
            const info = await transporter.sendMail(mailOPtions)
            console.log(`Mail envoye avec succes à ${usermail}, (id : ${info.messageId})`);
            return info

        } catch (error) {
             console.error("Echec lors de l'envoie :", error);
        }
    }
}


export default emailService