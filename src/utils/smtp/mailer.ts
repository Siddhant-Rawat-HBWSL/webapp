import nodemailer from 'nodemailer'
import Email from '@/types/email/email';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email using the provided email object.
 */
export async function sendMail(email : Email) : Promise<nodemailer.SentMessageInfo> {
    console.log('***** Sending Email! *****');
    try {
        const info = await transporter.sendMail({ ...email });

        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}