import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { EstadosEntity } from 'src/estados/entities/estado.entity';
import { RolesEntity } from 'src/roles/entities/role.entity';
import { RequestResetPasswordDto } from './dto/reset-password.dto';
import { v4 } from 'uuid';
import { ResetPasswordDto } from './dto/validated-password.dto';
import { EncoderService } from './encoder.service';
import { EmailService } from './email.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(EstadosEntity) // Inyecta el repositorio de EstadosEntity
    private readonly estadosRepository: Repository<EstadosEntity>,
    @InjectRepository(RolesEntity) // Inyecta el repositorio de EstadosEntity
    private readonly rolesRepository: Repository<RolesEntity>,
    private encoderService: EncoderService,
    private emailService: EmailService,
  ) {}

  async validateUser(correo: string, clave: string, id_roles: number) {
    const user = await this.usuarioRepository.findOne({
      where: { correo },
      relations: ['rol'], // Esto carga la relación 'rol'
    });

    if (user && user.clave === clave && user.rol.id_roles === id_roles) {
      // El usuario, la contraseña y el rol son válidos
      return user;
    }

    return null; // Credenciales incorrectas
  }

  async findByEmail(correo: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { correo } });
  }

  async findById(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { id_usuarios: id } });
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    const { correo } = requestResetPasswordDto;
    const user: Usuario = await this.usuarioRepository.findOne({
      where: { correo },
    });
    user.resetPasswordToken = v4();
    this.usuarioRepository.save(user);
    await this.emailService.sendPasswordResetEmail(
      correo,
      user.resetPasswordToken,
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, clave } = resetPasswordDto;
    const user: Usuario = await this.usuarioRepository.findOne({
      where: { resetPasswordToken },
    });

    user.clave = await this.encoderService.encodePassword(clave);
    user.resetPasswordToken = null;
    this.usuarioRepository.save(user);
  }

  async findAll() {
    //return await this.bienesRepository.find({where : {disponibilidad:false}});
    return await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.estado', 'estado')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .getMany();
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { id_estado, id_roles, ...userData } = createUsuarioDto;

    const estado = await this.estadosRepository.findOne({
      where: { id_estados: id_estado }, // Asegúrate de que el nombre del campo sea correcto
    });

    const rol = await this.rolesRepository.findOne({
      where: { id_roles: id_roles }, // Asegúrate de que el nombre del campo sea correcto
    });

    if (!estado) {
      throw new Error('Estado no encontrado'); // Maneja el caso en el que el estado no se encuentra
    }
    if (!rol) {
      throw new Error('Rol no encontrado'); // Maneja el caso en el que el estado no se encuentra
    }

    const usuario = this.usuarioRepository.create({
      ...userData,
      estado,
      rol,
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.estado', 'estado')
      .leftJoinAndSelect('usuario.rol', 'rol')
      .where('usuario.id_usuarios = :id', { id })
      .getOne();

    if (!usuario) {
      throw new NotFoundException(
        'No se pudo encontrar el registro de usuarios con el ID proporcionado',
      );
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { id_estado, id_roles, ...userData } = updateUsuarioDto;

    // Busca el usuario existente por su ID
    // Busca el usuario existente por su ID
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuarios: id }, // Aquí buscamos por el ID
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Busca el estado por su ID
    const estado = await this.estadosRepository.findOne({
      where: { id_estados: id_estado }, // Asegúrate de que el nombre del campo sea correcto
    });
    const rol = await this.rolesRepository.findOne({
      where: { id_roles: id_roles }, // Asegúrate de que el nombre del campo sea correcto
    });

    if (!estado) {
      throw new Error('Estado no encontrado');
    }

    // Actualiza las propiedades del usuario con los datos proporcionados
    this.usuarioRepository.merge(usuario, {
      ...userData,
      estado,
      rol,
    });

    // Guarda los cambios en la base de datos
    return await this.usuarioRepository.save(usuario);
  }

  //* eliminacion fisica
  remove(id: number) {
    return `This action removes a #${id} biene`;
  }

  //* eliminacion logica
  async deleteSoftBien(id: number): Promise<void> {
    await this.usuarioRepository.softDelete(id);
  }

  //* restauracion logica
  async restoreBien(id: number): Promise<void> {
    await this.usuarioRepository.restore(id);
  }

  async deleteUsuario(idUsuario: number): Promise<any> {
    return await this.usuarioRepository.delete(idUsuario);
  }
}
