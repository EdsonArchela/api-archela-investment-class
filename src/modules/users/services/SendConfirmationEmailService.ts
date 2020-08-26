import { inject, injectable } from 'tsyringe';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IClassRepository from '../repositories/IClassRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendConfirmationEmailService {
  constructor(
    @inject('ClassRepository')
    private classRepository: IClassRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.classRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const confirmationTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'confirmation_mail.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Archela Invest] Confirmação de Inscrição',
      templateData: {
        file: confirmationTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${123}`,
          unsubscribe: `${process.env.APP_WEB_URL}/reset-password?token=${user.id}`,
        },
      },
    });
  }
}

export default SendConfirmationEmailService;
