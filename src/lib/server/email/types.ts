export interface EmailProvider {
	sendEmail(message: EmailMessage): Promise<EmailResult>;
}

export interface EmailMessage {
	to: string | string[];
	subject: string;
	text?: string;
	html?: string;
	from?: string;
	replyTo?: string;
	cc?: string | string[];
	bcc?: string | string[];
	attachments?: EmailAttachment[];
}

export interface EmailAttachment {
	filename: string;
	content: Buffer | string;
	contentType?: string;
	disposition?: 'attachment' | 'inline';
	cid?: string;
}

export interface EmailResult {
	success: boolean;
	messageId?: string;
	error?: string;
}

export interface EmailTemplate {
	subject: string;
	text: string;
	html: string;
}

export interface EmailConfig {
	provider: 'ses' | 'smtp' | 'mock';
	from: string;
	replyTo?: string;
	ses?: {
		region: string;
		accessKeyId: string;
		secretAccessKey: string;
	};
	smtp?: {
		host: string;
		port: number;
		secure: boolean;
		auth: {
			user: string;
			pass: string;
		};
	};
}
