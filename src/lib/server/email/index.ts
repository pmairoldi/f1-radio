import { SMTP_URL } from '$env/static/private';
import nodemailer from 'nodemailer';
import type { EmailMessage, EmailResult } from './types';

export async function sendEmail(email: EmailMessage): Promise<EmailResult> {
	try {
		const transporter = nodemailer.createTransport(SMTP_URL);

		await transporter.verify();

		const info = await transporter.sendMail({
			from: email.from ?? 'no-reply@f1radiomeme.com',
			to: email.to,
			subject: email.subject,
			text: email.text,
			html: email.html,
			replyTo: email.replyTo,
			cc: email.cc,
			bcc: email.bcc,
			attachments: email.attachments
		});

		return {
			success: true,
			messageId: info.messageId
		};
	} catch (error) {
		console.error('Failed to send email:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}
