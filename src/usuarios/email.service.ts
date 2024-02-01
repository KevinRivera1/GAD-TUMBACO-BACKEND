import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetEmail(correo: string, token: string): Promise<void> {
    const horaEcuador = new Date();
    const horaFechEcuador = horaEcuador.toLocaleString('es-EC', {
      timeZoneName: 'short',
    });

    const htmlMessage = `
Gad Tumbaco: Usted ha proporcionado su correo electrónico para la recuperación de su clave.
A continuación se le proporcionará un código y un enlace en el cual usted tendrá que copiar el código y pegarlo en el campo "Código", es importante que no comparta el código ni el enlace que le enviaremos ya que este es único para usted y es netamente su responsabilidad hacer buen uso del mismo.

Código: ${token}
Enlace de recuperación de contraseña: http://localhost:4200/reset-password

Mensaje enviado el ${horaFechEcuador} horas Ecuador.

GAD TUMBACO`;

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
