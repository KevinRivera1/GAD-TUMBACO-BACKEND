import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateOficiosSecretariaDto } from "./dto/oficios-secretaria.dto";
import { OficiosSecretariaService } from "./oficios-secretaria.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('oficios-secretaria')
@Controller('oficios-secretaria')
export class OficiosSecretariaController {
  constructor(private OficiosSecretariaService: OficiosSecretariaService) {}

  @Post('crearoficio')
  create(@Body() CreateOficiosSecretariaDto: CreateOficiosSecretariaDto, @Res() response) {
    this.OficiosSecretariaService
      .createOficio(CreateOficiosSecretariaDto)
      .then((oficio) => {
        response.status(HttpStatus.CREATED).json(oficio);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ oficio: 'error en la creacion del oficio' }),
      );
  }

  @Get('listaroficio')
  async getAll(@Res() response) {
    try {
      const OficiossecretariaList = await this.OficiosSecretariaService.getAll();
      response.status(HttpStatus.OK).json(OficiossecretariaList);
    } catch {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ oficio: 'error en la obtencion de los oficios' });
    }
  }

  @Get('listaroficio/:id')
  async getOne(@Res() response, @Param('id') idOficio) {
    try {
      const oficio = await this.OficiosSecretariaService.getOne(idOficio);
      response.status(HttpStatus.OK).json(oficio);
    } catch {
      return response
        .status(HttpStatus.FORBIDDEN)
        .json({ oficio: 'error en la obtencion del oficio' });
    }
  }

  @Put('actualizaroficio/:id')
  async update(
    @Body() updateOficiosSecretariaDto: CreateOficiosSecretariaDto,
    @Res() response,
    @Param('id') idOficio,
  ) {
    return this.OficiosSecretariaService
      .updateOficio(idOficio, updateOficiosSecretariaDto)
      .then((oficio) => {
        response.status(HttpStatus.OK).json(oficio);
      })
      .catch(() =>
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ oficio: 'error en la actualizacion dl oficio' }),
      );
  }

  @Delete('eliminaroficio/:id')
  async delete(@Res() response, @Param('id') idOficio) {
    {
      try {
        const res = await this.OficiosSecretariaService.deleteOficio(idOficio);
        response.status(HttpStatus.OK).json(res);
      } catch {
        return response
          .status(HttpStatus.FORBIDDEN)
          .json({ oficio: 'error en la eliminacion del oficio' });
      }
    }
  }
}
