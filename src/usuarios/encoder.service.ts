import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncoderService {
  async encodePassword(clave: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(clave, salt);
  }

  async checkPassword(clave: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(clave, userPassword);
  }
}
