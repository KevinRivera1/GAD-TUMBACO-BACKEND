import { Module } from "@nestjs/common";
import { BienesSolicitudService } from "./bienes-solicitud.service";
import { BienesSolicitudController } from "./bienes-solicitud.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BienesSolicitud } from "./entities/bienes-solicitud.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BienesSolicitud])],
  controllers: [BienesSolicitudController],
  providers: [BienesSolicitudService],
})
export class BienesSolicitudModule {}
