import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});

const configService = new ConfigService();

export const DataSourceconfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('HOST_DB'),
  port: configService.get('PORT_DB'),
  username: configService.get('USERNAME_DB'),
  password: configService.get('PASSWORD_DB'),
  database: configService.get('NAME_DB'),
  synchronize: true,
};

export const AppDS = new DataSource(DataSourceconfig);
