import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BienesModule } from "src/bienes/bienes.module";
import { BienesSolicitudController } from "./bienes-solicitud.controller";
import { BienesSolicitudService } from "./bienes-solicitud.service";
import { BienesSolicitud } from "./entities/bienes-solicitud.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BienesSolicitud]), BienesModule],
  controllers: [BienesSolicitudController],
  providers: [BienesSolicitudService],
})
export class BienesSolicitudModule {}
