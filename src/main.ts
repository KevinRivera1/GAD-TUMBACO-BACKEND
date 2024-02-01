import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { CORS } from './constants';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log('PUERTO DEL SERVIDOR:', configService.get('PORT_SERVER'));

  app.use(morgan('dev')); //*Morgan para ver las peticiones que se hacen al servidor en consola

  app.setGlobalPrefix('/api/'); //*Este es el prefijo que se le agrega a todas las rutas

  app.enableCors(CORS); //*Configuración de CORS

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  /* http://localhost:3000/api-docs */
  const config = new DocumentBuilder()
    .setTitle('GAD-TUMBACO')
    .setDescription('Controladores de la aplicación GAD-TUMBACO')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('PORT_SERVER') || 3000);
  dotenv.config();
}
bootstrap();
