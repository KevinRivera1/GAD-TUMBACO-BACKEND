import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BienesCategoriasModule } from "./bienes-categorias/bienes-categorias.module";
import { BienesSolicitudModule } from "./bienes-solicitud/bienes-solicitud.module";
import { BienesModule } from "./bienes/bienes.module";
import { DataSourceconfig } from "./config/data.source";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DataSourceconfig,
      autoLoadEntities: true,
    }),
    BienesModule,
    BienesCategoriasModule,
    BienesSolicitudModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
