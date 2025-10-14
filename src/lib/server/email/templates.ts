import type { EmailTemplate } from './types';

export const emailTemplates = {
	resetPassword: (url: string): EmailTemplate => ({
		subject: 'Reset Your Password',
		text: `Hello,

You requested a password reset for your account. Click the link below to reset your password:

${url}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The Translations Team`,
		html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Reset Your Password</title>
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		.container { max-width: 600px; margin: 0 auto; padding: 20px; }
		.button { 
			display: inline-block; 
			padding: 12px 24px; 
			background-color: #007bff; 
			color: white; 
			text-decoration: none; 
			border-radius: 5px; 
			margin: 20px 0;
		}
		.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
	</style>
</head>
<body>
	<div class="container">
		<h2>Reset Your Password</h2>
		<p>Hello,</p>
		<p>You requested a password reset for your account. Click the button below to reset your password:</p>
		<a href="${url}" class="button">Reset Password</a>
		<p>This link will expire in 1 hour for security reasons.</p>
		<p>If you didn't request this password reset, please ignore this email.</p>
		<div class="footer">
			<p>Best regards,<br>The Translations Team</p>
		</div>
	</div>
</body>
</html>`
	}),

	emailVerification: (url: string): EmailTemplate => ({
		subject: 'Verify Your Email Address',
		text: `Hello,

Thank you for signing up! Please verify your email address by clicking the link below:

${url}

This link will expire in 24 hours.

If you didn't create an account, please ignore this email.

Best regards,
The Translations Team`,
		html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Verify Your Email</title>
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		.container { max-width: 600px; margin: 0 auto; padding: 20px; }
		.button { 
			display: inline-block; 
			padding: 12px 24px; 
			background-color: #28a745; 
			color: white; 
			text-decoration: none; 
			border-radius: 5px; 
			margin: 20px 0;
		}
		.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
	</style>
</head>
<body>
	<div class="container">
		<h2>Verify Your Email Address</h2>
		<p>Hello,</p>
		<p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
		<a href="${url}" class="button">Verify Email</a>
		<p>This link will expire in 24 hours.</p>
		<p>If you didn't create an account, please ignore this email.</p>
		<div class="footer">
			<p>Best regards,<br>The Translations Team</p>
		</div>
	</div>
</body>
</html>`
	}),

	welcome: (): EmailTemplate => ({
		subject: 'Welcome to Translations!',
		text: `Hello,

Welcome to Translations! Your account has been successfully created and verified.

You can now start using all the features of our platform.

If you have any questions, feel free to contact our support team.

Best regards,
The Translations Team`,
		html: `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Welcome to Translations</title>
	<style>
		body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
		.container { max-width: 600px; margin: 0 auto; padding: 20px; }
		.welcome { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
		.footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
	</style>
</head>
<body>
	<div class="container">
		<h2>Welcome to Translations!</h2>
		<div class="welcome">
			<p>Hello,</p>
			<p>Welcome to Translations! Your account has been successfully created and verified.</p>
			<p>You can now start using all the features of our platform.</p>
			<p>If you have any questions, feel free to contact our support team.</p>
		</div>
		<div class="footer">
			<p>Best regards,<br>The Translations Team</p>
		</div>
	</div>
</body>
</html>`
	})
};
