import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
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
    /* DEBAJO DE ESTE COMENTARIO INSTACIAR LOS MODULOS */
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
