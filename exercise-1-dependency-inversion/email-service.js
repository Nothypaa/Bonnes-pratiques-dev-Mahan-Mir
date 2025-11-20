const sendgrid = {
    async send({ to, subject, text }) {
      console.log('[sendgrid] Email envoyé à', to, 'Sujet:', subject);
      console.log(text);
    },
  };
  
  class MailProvider {
    async send({ to, subject, text }) {
      throw new Error('Method send() must be implemented');
    }
  }
  
  class SendGridMailProvider extends MailProvider {
    async send({ to, subject, text }) {
      await sendgrid.send({ to, subject, text });
    }
  }
  
  class FakeMailProvider extends MailProvider {
    constructor() {
      super();
      this.sentEmails = [];
    }
  
    async send({ to, subject, text }) {
      this.sentEmails.push({ to, subject, text });
      console.log('[FAKE] Email captured:', { to, subject });
    }
  
    getSentEmails() {
      return this.sentEmails;
    }
  }
  
  class EmailService {
    constructor(mailProvider) {
      this.mailProvider = mailProvider;
    }
  
    async sendWelcomeEmail(user) {
      const subject = 'Bienvenue sur notre plateforme';
      const text = `Bonjour ${user.firstName},
  
  Merci pour votre inscription.
  
  À bientôt !`;
  
      await this.mailProvider.send({
        to: user.email,
        subject,
        text,
      });
    }
  }
  
  const user = { firstName: 'Kenan', email: 'kenan@example.com' };
  
  const prodMailProvider = new SendGridMailProvider();
  const emailService = new EmailService(prodMailProvider);
  emailService.sendWelcomeEmail(user);
  
  const testMailProvider = new FakeMailProvider();
  const testEmailService = new EmailService(testMailProvider);
  testEmailService.sendWelcomeEmail(user);
  console.log('\nCaptured emails:', testMailProvider.getSentEmails());
  