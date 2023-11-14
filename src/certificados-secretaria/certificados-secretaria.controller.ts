import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CertificadoService } from "./certificados-secretaria.service";
import { CreateCertificadosSecretariaDto } from "./dto/certificados-secretaria.dto";


@ApiTags('certificados')
@Controller('certificados')
export class CertificadoController {
  constructor(private certificadoServices: CertificadoService) { }

  @Post('crearcertificado')
  create(@Body() createCreateCertificadosSecretariaDto: CreateCertificadosSecretariaDto, @Res() response) {
    this.certificadoServices
      .createCertificado(createCreateCertificadosSecretariaDto)
      .then((certificado) => {
        response.status(HttpStatus.CREATED).json(certificado);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ certificado: 'error en la creacion del certificado' }),
      );
  }

  @Get('listarcertificado')
  async getAll(@Res() response) {
    try {
      const certificadosList = await this.certificadoServices.getAll();
      response.status(HttpStatus.OK).json(certificadosList);
    } catch {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ certificado: 'error en la obtencion del certificado' });
    }
  }

  @Get('listarcertificado/:id')
  async getOne(@Res() response, @Param('id') idCertificado) {
    try {
      const certificado = await this.certificadoServices.getOne(idCertificado);
      response.status(HttpStatus.OK).json(certificado);
    } catch {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ certificado: 'error en la obtencion del certificado' });
    }
  }

  @Put('actualizarcertificado/:id')
  async update(
    @Body() updateCreateCertificadosSecretariaDto: CreateCertificadosSecretariaDto,
    @Res() response,
    @Param('id') idCertificado,
  ) {
    return this.certificadoServices
      .updateCertificado(idCertificado, updateCreateCertificadosSecretariaDto)
      .then((certificado) => {
        response.status(HttpStatus.OK).json(certificado);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ certificado: 'error en la actualizacion del certificado' }),
      );
  }

  @Delete('eliminarcertificado/:id')
  async delete(@Res() response, @Param('id') idCertificado) {
    {
      try {
        const res = await this.certificadoServices.deleteCertificado(idCertificado);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ certificado: 'error en la eliminacion del certificado' });
      }
    }
  }
}