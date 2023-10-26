import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(correo: string, token: string): Promise<void> {

    const htmlMessage = `
    Gad Tumbaco, su código de recuperación de contraseña es el siguiente: ${token} No comparta su código de recuperación de contraseña ya que este es único para su cuenta.`;

    await this.mailerService.sendMail({
      to: correo,
      subject: 'Gad Tumbaco: Recuperación de contraseña',
      text: htmlMessage,
      attachments: [
        {
          filename: 'gad-tumbaco-yavirac.jpg',
          path: path.resolve(__dirname, '../../assets/gad-tumbaco-yavirac.jpg'),
          cid: 'gad-tumbaco-yavirac.jpg',
        },
      ],
    });
  }
}
